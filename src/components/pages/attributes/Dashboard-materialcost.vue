<template>
	<div class="col-md-6">
		<div class="card card-chart">
			<div class="card-header card-header-warning">
				<router-link
					tag="i"
					class="material-icons fas fa-cog options"
					to="/materiaalOpties"
				></router-link>
				<Chart
					v-if="getMaten"
					:height="150"
					:materialen="materiaalNamen"
					:kosten="materiaalKostenGebundeld"
				/>
				<p v-if="!getMaten">Voer op de <strong>'maten'</strong> pagina de gegevens in van je project. Pas dan kunnen we de materiaalkosten berekenen. </p>
			</div>
			<div class="card-body">
				<hr>
				<div class="d-flex">
					<p class="d-inline mr-auto">Materiaalkosten: </p>
					<p class="d-inline ml-auto">{{valuta}} {{totaleMateriaalKosten}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Opslagpercentage: </p>
					<p class="d-inline ml-auto">{{valuta}} {{totaleOpslagPercentage}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Indirecte kosten: </p>
					<p class="d-inline ml-auto">{{valuta}} {{indirecteKosten}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Loonkosten: </p>
					<p class="d-inline ml-auto">{{valuta}} {{loonKosten}}</p>
				</div>
				<hr class="mt-2">
				<div class="d-flex">
					<p class="d-inline mr-auto">Totale kosten: </p>
					<p class="d-inline ml-auto">{{valuta}} {{totaleKosten}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Winstopslag: </p>
					<p class="d-inline ml-auto">{{valuta}} {{winstopslag}}</p>
				</div>
				<hr>
				<div class="d-flex">
					<p class="d-inline mr-auto">Verkoopprijs incl BTW: </p>
					<p class="d-inline ml-auto">{{valuta}} {{verkoopPrijsInclBtw}}</p>
				</div>

			</div>
			<div class="card-footer">
				<div class="stats">
					<div class="col-6">
						<i class="material-icons">access_time</i> updated 4 minutes ago
					</div>
					<div class="col-6 text-right">

					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
// import Chart from "chart.js"
// import { Bar } from 'vue-chartjs'
import Chart from "./Chart-materialcost";

export default {
	name: "DashboardMaterialCost",
	components: {
		Chart
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		dashboard() {
			return this.$store.getters.dashboard;
		},
		getMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject("materialen");
		},
		getOverigeMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject(
				"overigeMaterialen"
			);
		},
		getMaten() {
			return this.$store.getters.werkvoorbereidingsObject("maten");
		},
		getPlanningOpties() {
			return this.$store.getters.werkvoorbereidingsObject(
				"planningOpties"
			);
		},
		getMateriaalOpties() {
			return this.$store.getters.werkvoorbereidingsObject(
				"materiaalOpties"
			);
		},
		opslagpercentageMassief() {
			return this.getMateriaalOpties
				? Number(this.getMateriaalOpties.opslagpercentageMassief)
				: 0;
		},
		opslagpercentagePlaat() {
			return this.getMateriaalOpties
				? Number(this.getMateriaalOpties.opslagpercentagePlaat)
				: 0;
		},
		overlengteZijde() {
			return this.getMateriaalOpties
				? Number(this.getMateriaalOpties.overlengteZijdes)
				: 0;
		},
		overlengteKops() {
			return this.getMateriaalOpties
				? Number(this.getMateriaalOpties.overlengteKops)
				: 0;
		},
		overlengteLangs() {
			return this.getMateriaalOpties
				? Number(this.getMateriaalOpties.overlengteLangs)
				: 0;
		},
		valuta() {
			return this.$store.getters.valuta;
		},
		materialenMassief() {
			return this.getMaterialen.massief ? this.getMaterialen.massief : [];
		},
		materialenPlaat() {
			return this.getMaterialen.plaatmateriaal
				? this.getMaterialen.plaatmateriaal
				: [];
		},
		materialenFineer() {
			return this.getMaterialen.fineer ? this.getMaterialen.fineer : [];
		},
		materialenOverig() {
			return this.getOverigeMaterialen ? this.getOverigeMaterialen : [];
		},
		OverigeMaterialenKosten() {
			if (this.materialenOverig) {
				let prijs = 0;
				for (const materiaal of this.materialenOverig) {
					prijs += Number(materiaal.prijs) * Number(materiaal.aantal);
				}
				return prijs;
			} else {
				return 0;
			}
		},
		materiaalNamen() {
			return [
				...this.materialenMassief.map(m => m.naam),
				...this.materialenPlaat.map(m => m.naam),
				...this.materialenFineer.map(m => m.naam),
				...new Set(
					this.materialenOverig.map(() => "Overige materialen")
				)
			];
		},
		materiaalKostenMassief() {
			let kosten = [];
			// Massief
			if (this.getMaten && this.materialenMassief) {
				for (const materiaal of this.materialenMassief) {
					let prijsMassief = 0;
					for (const maat of this.getMaten) {
						if (materiaal.naam === maat.materiaal) {
							let lengte =
								Number(maat.lengte) + this.overlengteKops;
							let breedte =
								Number(maat.breedte) + this.overlengteLangs;
							let dikte = Number(maat.dikte);
							let inhoud =
								(lengte * breedte * dikte) / 1000000000;
							prijsMassief +=
								inhoud *
								Number(materiaal.prijs) *
								Number(maat.aantal);
						}
					}
					kosten.push(Number(prijsMassief.toFixed(2)));
				}
			}
			return kosten;
		},
		materiaalKostenPlaat() {
			let kosten = [];
			// Plaatmateriaal
			if (this.getMaten && this.materialenPlaat) {
				for (const materiaal of this.materialenPlaat) {
					let prijsPlaat = 0;
					for (const maat of this.getMaten) {
						if (materiaal.naam === maat.materiaal) {
							let lengte =
								Number(maat.lengte) + this.overlengteZijde;
							let breedte =
								Number(maat.breedte) + this.overlengteZijde;
							let oppervlakte = (lengte * breedte) / 1000000;
							prijsPlaat +=
								oppervlakte *
								Number(materiaal.prijs) *
								Number(maat.aantal);
						}
					}
					kosten.push(Number(prijsPlaat.toFixed(2)));
				}
			}
			return kosten;
		},
		materiaalKostenFineer() {
			let kosten = [];
			// Fineer
			if (this.getMaten && this.materialenFineer) {
				for (const materiaal of this.materialenFineer) {
					let prijsFineer = 0;
					for (const maat of this.getMaten) {
						if (materiaal.naam === maat.materiaal) {
							let lengte =
								Number(maat.lengte) + this.overlengteZijde;
							let breedte =
								Number(maat.breedte) + this.overlengteZijde;
							let oppervlakte = (lengte * breedte) / 1000000;
							prijsFineer +=
								oppervlakte *
								Number(materiaal.prijs) *
								Number(maat.aantal);
						}
					}
					kosten.push(prijsFineer);
				}
			}
			return kosten;
		},
		materiaalKostenGebundeld() {
			let alleMaterialen = [];
			return alleMaterialen.concat(
				this.materiaalKostenMassief,
				this.materiaalKostenPlaat,
				this.materiaalKostenFineer,
				this.OverigeMaterialenKosten
			);
		},
		totaleMateriaalKosten() {
			if (this.materiaalKostenGebundeld) {
				return Number(
					this.materiaalKostenGebundeld
						.reduce((a, b) => a + b, 0)
						.toFixed(2)
				);
			} else {
				return 0;
			}
		},
		totaleOpslagPercentage() {
			// Massief
			const m = this.materiaalKostenMassief.reduce(
				(a, b) => a + (b / 100) * this.opslagpercentageMassief,
				0
			);
			// Plaat
			const p = this.materiaalKostenPlaat.reduce(
				(a, b) => a + (b / 100) * this.opslagpercentagePlaat,
				0
			);
			return Number((m + p).toFixed(2));
		},
		indirecteKosten() {
			if (this.getPlanningOpties)
				return Number(this.getPlanningOpties.indirecteKosten);
			return 0;
		},
		loonKosten() {
			if (this.getPlanningOpties) {
				return Number(
					(
						this.dashboard.aantalUren *
						Number(this.getPlanningOpties.uurtarief)
					).toFixed(2)
				);
			}
			return 0;
		},
		totaleKosten() {
			if (this.getPlanningOpties) {
				return Number(
					(
						this.totaleMateriaalKosten +
						this.totaleOpslagPercentage +
						this.indirecteKosten +
						this.loonKosten
					).toFixed(2)
				);
			}
			return 0;
		},
		winstopslag() {
			if (this.getPlanningOpties) {
				return Number(
					(
						(this.totaleKosten / 100) *
						Number(this.getPlanningOpties.winstOpslag)
					).toFixed(2)
				);
			}
			return 0;
		},
		verkoopPrijsExclBtw() {
			return this.totaleKosten + this.winstopslag;
		},
		verkoopPrijsInclBtw() {
			if (this.getPlanningOpties) {
				let verkoopPrijsInclBtw = Number(
					(
						this.verkoopPrijsExclBtw +
						(this.verkoopPrijsExclBtw / 100) *
							Number(this.getPlanningOpties.btwTarief)
					).toFixed(2)
				);
				this.$store.commit("setDashboard", {
					path: "verkoopPrijsInclBtw",
					value: verkoopPrijsInclBtw
				});
				return verkoopPrijsInclBtw;
			}
			return 0;
		}
	}
};
</script>


<style scoped lang="scss">
.card-header {
	min-height: 55px;
	display: flex;
	align-items: center;

	p {
		margin-bottom: 0;
		width: 90%;
	}

	i {
		align-self: start;
	}
}

.stats {
	width: 100%;
}
.options {
	position: absolute;
	left: 93%;
	cursor: pointer;
}
</style>