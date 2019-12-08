<template>
	<div class="col-12">
		<div class="card">
			<div class="card-header card-header-rose">
				<div class="row">
					<div class="d-flex w-100">
						<div class="pl-3">
							<h3 class="card-title">
								<i class="fa fa-cut fa-lg pr-4"></i>Zaagoptimalisatie
							</h3>
							<p class="card-category">
								Haal zo effectief mogelijk het materiaal uit jouw platen!
							</p>
						</div>
						<router-link
							to="optimalisatie"
							class=" align-self-center ml-auto mr-3"
						>
							<i class="fas fa-cog fa-lg pr-4 text-white"></i>
						</router-link>
					</div>
				</div>
			</div>
			<div class="card-body">
				<div v-if="sheets.length">
					<div :key="`sheet${index}`" v-for="(sheet, index) in sheets">
						<div
							class="row"
							:key="`panel${panelIndex}`"
							v-for="(panel, panelIndex) in sheet.panels"
						>
							<div class="col-12">
								<h6
									data-v-bbba6534=""
									class="title col-form-label border-bottom mt-0"
								>
									<strong data-v-bbba6534="">{{ sheet.material.naam }} </strong>
									- {{ sheet.material.lengte }}x{{ sheet.material.breedte }}
								</h6>
							</div>
							<div class="col-8">
								<canvas
									:id="`sheet${index}_${panelIndex}`"
									class="sheetCanvas"
									:width="sheet.material.lengte"
									:height="sheet.material.breedte"
									:style="{
										width: `${sheet.material.lengte / (getMaxLength / 100)}%`
									}"
								></canvas>
							</div>
							<div class="col-4">
								<table class="table table-striped table-sm">
									<tbody>
										<tr
											:key="`part${partIndex}`"
											v-for="(part, partIndex) in panel"
										>
											<td>{{ partIndex + 1 }}</td>
											<td>{{ part.name }}</td>
											<td>{{ part.w }} x {{ part.h }}</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
				<div v-if="!sheets.length">
					Om de plaatoptimalisatie te gebruiken
					<router-link to="/materialen" class="font-weight-bold"
						>voeg je plaatmateriaal toe </router-link
					>aan dit project. Vervolgens
					<router-link to="/maten" class="font-weight-bold"
						>maak je onderdelen aan </router-link
					>en wijs je het plaatmateriaal toe.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ZaagoptimalistiePartList from "@/components/zaagoptimalisatie/Zaagoptimalisatie-partlist.vue";
import ZaagoptimalistieSheetList from "@/components/zaagoptimalisatie/Zaagoptimalisatie-sheetlist.vue";
import Optimalisatie from "@/components/zaagoptimalisatie/Optimalisatie.js";

export default {
	name: "Zaagoptimalisatie",
	components: { ZaagoptimalistiePartList, ZaagoptimalistieSheetList },
	props: ["werkvoorbereiding"],
	data() {
		return {
			sheets: []
		};
	},
	mounted() {
		if (this.plaatmateriaal) {
			this.plaatmateriaal.map(plaat => {
				plaat.lengte = !plaat.lengte ? 2440 : plaat.lengte;
				plaat.breedte = !plaat.breedte ? 1220 : plaat.breedte;
			});
			this.calculateSheets();
		}
	},
	watch: {
		materialAndParts: {
			handler() {
				this.calculateSheets();
			},
			deep: true
		}
	},
	computed: {
		materialen() {
			return this.werkvoorbereiding.materialen
				? this.werkvoorbereiding.materialen
				: [];
		},
		maten() {
			return this.werkvoorbereiding.maten ? this.werkvoorbereiding.maten : [];
		},
		plaatmateriaal() {
			return this.materialen.plaatmateriaal;
		},
		getMaxLength() {
			let maxLength = 0;
			if (this.plaatmateriaal)
				this.plaatmateriaal.map(plaat => {
					maxLength = plaat.lengte > maxLength ? plaat.lengte : maxLength;
				});
			return Number(maxLength);
		},
		plaatmateriaalParts() {
			if (this.maten) {
				const pm = this.plaatmateriaal;
				return this.maten.filter(m => {
					if (pm) return pm.filter(gm => gm.naam === m.materiaal).length;
				});
			}
		},
		materialAndParts() {
			return this.plaatmateriaal.map(material => {
				let partlist = this.plaatmateriaalParts.filter(part => {
					return (
						part.materiaal === material.naam &&
						Number(part.lengte) < Number(material.lengte) &&
						Number(part.breedte) < Number(material.breedte)
					);
				});
				material.parts = partlist;
				return material;
			});
		}
	},
	methods: {
		// Dit is de start van de plaatoptimalisatie
		async calculateSheets() {
			this.sheets = [];
			for (const material of this.materialAndParts) {
				const sheets = await this.cutSheet(material);
				this.sheets.push(sheets);
			}
			// Wacht een seconde omdat vue eerst de divs moet laden
			await this.waitASec(500);
			this.drawOnCanvas();
		},

		cutSheet(material) {
			return new Promise(async (resolve, reject) => {
				const partArray = await this.addToPartArray(material.parts);
				const panels = await this.optimize(partArray, [], material);

				// await this.deduplicatePanels(panels);
				resolve({
					material: material,
					panels: panels
				});
			});
		},

		// builds an array of parts
		addToPartArray(parts) {
			return new Promise(async (resolve, reject) => {
				const array = [];
				for (const part of parts) {
					for (let i = 0; i < Number(part.aantal); i++) {
						array.push({
							name: part.naam,
							w: Number(part.lengte),
							h: Number(part.breedte)
						});
					}
				}
				// sort parts by comparing height - smallest
				// sort parts by comparing  width to height - largest
				array.sort((a, b) => {
					return b.h < a.h;
				});
				array.sort((a, b) => {
					return a.w > b.h;
				});
				resolve(array);
			});
		},

		// recursively processes the provided array of parts
		// fits parts into panel dimensions
		optimize(partArray, panels, material) {
			return new Promise(async (resolve, reject) => {
				let removeBlockArray = [];
				let blockArray = [];

				// create a bin packing panel
				// fit the parts in the array into the panel
				let packer = new Optimalisatie(material.lengte, material.breedte, 3);
				packer.fit(partArray);

				// decide if the part fits the panel
				// add to appropriate array
				for (var i = 0; i < partArray.length; i++) {
					var block = partArray[i];
					if (block.fit) {
						removeBlockArray.push(i);
						blockArray.push({
							name: block.name,
							fitX: block.fit.x,
							fitY: block.fit.y,
							w: block.w,
							h: block.h
						});
					}
				}

				// add this panel of parts to the array of panels
				if (blockArray.length) panels.push(blockArray);

				// remove the fitted parts from the pool of parts to be fit
				for (var i = removeBlockArray.length - 1; i >= 0; i--) {
					partArray.splice(removeBlockArray[i], 1);
				}

				// if parts are still to be fit
				// call this optimize function again
				if (partArray.length > 0) {
					this.optimize(partArray, panels, material);
				}

				resolve(panels.length ? panels : null);
			});
		},

		// find duplicate panels
		compareBlocks(array1, array2) {
			if (array1.length != array2.length) return false;

			for (let i = array1.length - 1; i >= 0; i--) {
				if (array1[i].h != array2[i].h) return false;
				if (array1[i].w != array2[i].w) return false;
				if (array1[i].fitW != array2[i].fitW) return false;
				if (array1[i].fitY != array2[i].fitY) return false;
			}
			return true;
		},

		deduplicatePanels(panels) {
			for (let i = 0; i < panels.length - 1; i++) {
				let panelQuantity = 1;
				for (let t = i + 1; t < panels.length; t++) {
					if (this.compareBlocks(panels[i], panels[t])) {
						panelQuantity = panelQuantity + 1;
						panels[i][panels[i].length - 1] = panelQuantity;
					}
				}
				panels.splice(i + 1, panelQuantity - 1);
			}
		},
		drawOnCanvas() {
			for (const [index, sheet] of this.sheets.entries()) {
				if (sheet.panels) {
					for (const [panelIndex, panel] of sheet.panels.entries()) {
						const c = document.querySelector(`#sheet${index}_${panelIndex}`);
						if (c) {
							const ctx = c.getContext("2d");
							for (const [partIndex, part] of panel.entries()) {
								this.drawBox(ctx, part);
								this.drawText(ctx, part, partIndex + 1);
							}
						}
					}
				}
			}
		},
		drawBox(ctx, part) {
			ctx.beginPath();
			ctx.lineWidth = 1;
			ctx.rect(part.fitX, part.fitY, part.w, part.h);
			ctx.stroke();
		},
		drawText(ctx, part, num) {
			ctx.font = "30px Arial";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText(
				`${num} - ${part.w} x ${part.h}`,
				part.fitX + part.w / 2,
				part.fitY + part.h / 2
			);
		},
		waitASec(sec) {
			return new Promise(res => setTimeout(() => res(), sec));
		}
	}
};
</script>

<style scoped lang="scss">
table {
	box-shadow: none;
}

.sheetCanvas {
	border: solid black 2px;
}
</style>
