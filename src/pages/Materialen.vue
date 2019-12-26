<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4">
						<div class="card">
							<CardHeader
								:text="{
									title: 'Materialen',
									subtitle: 'Waar ga je het van maken'
								}"
							/>

							<div class="card-body">
								<!-- Massief hout -->
								<h6 class="title col-form-label text-left border-bottom my-1">
									<strong>Massief hout</strong>
								</h6>

								<div
									class="row "
									v-bind:key="'massief' + i"
									v-for="(massief, i) in materialen.massief"
								>
									<div class="col">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span id="basic-addon1" class="input-group-text pl-0">
													<i class="fa fa-leaf fa-fw"></i>
												</span>
											</div>
											<input
												type="text"
												placeholder="Massief houtsoort"
												data-toggle="tooltip"
												data-placement="top"
												title=""
												required="required"
												class="form-control"
												data-original-title="Wat is de naam van de houtsoort?"
												v-model="massief.naam"
											/>
										</div>
									</div>
									<div class="col-3">
										<div class="input-group mb-2">
											<money
												placeholder="Prijs m3"
												data-toggle="tooltip"
												data-placement="top"
												min="1"
												required="required"
												class="form-control"
												data-original-title="Hoeveel kost deze houtsoort per m3? Bijv. 1800 euro"
												v-model="massief.prijs"
												v-bind="moneyMassief"
											>
											</money>
										</div>
									</div>

									<DeleteButton @delete="removeComponent(i, 'massief')" />
								</div>
								<AddButton
									@add="newMaterial('massief')"
									:text="'Voeg massief hout toe'"
								/>

								<!-- Plaatmateriaal -->
								<h6 class="title col-form-label text-left border-bottom mb-1">
									<strong>Plaatmateriaal</strong>
								</h6>
								<div
									class="row"
									v-bind:key="'plaatmateriaal' + i"
									v-for="(plaatmateriaal, i) in materialen.plaatmateriaal"
								>
									<div class="col">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span id="basic-addon1" class="input-group-text pl-0">
													<i class="fa fa-square fa-fw"></i>
												</span>
											</div>
											<input
												type="text"
												placeholder="Plaatmateriaal naam"
												data-toggle="tooltip"
												data-placement="top"
												title=""
												required="required"
												class="form-control"
												data-original-title="Naam van het plaatmateriaal incl de dikte? Bijv. MDF 12mm"
												v-model="plaatmateriaal.naam"
											/>
										</div>
									</div>
									<div class="col-3">
										<div class="input-group mb-2">
											<money
												placeholder="Prijs m2"
												data-toggle="tooltip"
												data-placement="top"
												min="1"
												required="required"
												class="form-control"
												data-original-title="Hoeveel kost dit plaatmateriaal per m2?"
												v-model="plaatmateriaal.prijs"
												v-bind="moneyPlaat"
											>
											</money>
										</div>
									</div>
									<DeleteButton
										@delete="removeComponent(i, 'plaatmateriaal')"
									/>
								</div>
								<AddButton
									@add="newMaterial('plaatmateriaal')"
									:text="'Voeg plaatmateriaal toe'"
								/>

								<!-- Fineer -->
								<h6 class="title col-form-label text-left border-bottom mb-1">
									<strong>Fineer</strong>
								</h6>
								<div
									class="row"
									v-bind:key="'fineer' + i"
									v-for="(fineer, i) in materialen.fineer"
								>
									<div class="col">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span id="basic-addon1" class="input-group-text pl-0">
													<i class="fa fa-tag fa-fw"></i>
												</span>
											</div>
											<input
												type="text"
												placeholder="Fineer soort"
												data-toggle="tooltip"
												data-placement="top"
												title=""
												required="required"
												class="form-control"
												data-original-title="Wat voor fineer is het?"
												v-model="fineer.naam"
											/>
										</div>
									</div>
									<div class="col-3">
										<div class="input-group mb-2">
											<money
												placeholder="Prijs m2"
												data-toggle="tooltip"
												data-placement="top"
												min="1"
												required="required"
												class="form-control"
												data-original-title="Hoeveel euro kost dit fineer per m2?"
												v-model="fineer.prijs"
												v-bind="moneyPlaat"
											>
											</money>
										</div>
									</div>

									<DeleteButton @delete="removeComponent(i, 'fineer')" />
								</div>
								<AddButton
									@add="newMaterial('fineer')"
									:text="'Voeg fineer toe'"
								/>

								<div
									class="d-flex justify-content-between border-top mt-5 flex-wrap"
								>
									<router-link tag="button" class="btn" to="/overigeMaterialen">
										<i aria-hidden="true" class="far fa-clipboard mr-2"></i>
										Overige materialen
									</router-link>
									<router-link tag="button" class="btn" to="/materiaalOpties">
										<i aria-hidden="true" class="fas fa-edit mr-2"></i>
										Materiaal opties
									</router-link>
								</div>
							</div>
						</div>
						<PreviousNextButton :previous="'componenten'" />
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { Money } from "v-money";
import newWvb from "@/assets/config/newWvb.js";
import CardHeader from "@/components/Card-header.vue";
import AddButton from "@/components/Add-button.vue";
import DeleteButton from "@/components/Delete-button.vue";
import PreviousNextButton from "@/components/Previous-next-button.vue";

export default {
	name: "Materialen",
	components: {
		Money,
		CardHeader,
		AddButton,
		DeleteButton,
		PreviousNextButton
	},
	data() {
		return {
			materialen: newWvb.materialen,
			moneyMassief: {
				decimal: ",",
				thousands: "",
				prefix: `€ `,
				suffix: "",
				precision: 0,
				masked: false
			},
			moneyPlaat: {
				decimal: ",",
				thousands: "",
				prefix: `€ `,
				suffix: "",
				precision: 2,
				masked: false
			}
		};
	},
	watch: {
		materialen: {
			handler() {
				this.setData();
			},
			deep: true
		},
		werkvoorbereiding: {
			handler() {
				this.updateGegevens();
			},
			deep: true
		}
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject("materialen");
		},
		valuta() {
			return this.$store.getters.valuta;
		}
	},
	methods: {
		updateGegevens() {
			if (this.getMaterialen) this.$set(this, "materialen", this.getMaterialen);
			else this.$set(this, "materialen", newWvb.materialen);

			if (this.valuta) {
				this.moneyMassief.prefix = `${this.valuta} `;
				this.moneyPlaat.prefix = `${this.valuta} `;
			}
		},
		newMaterial(naam) {
			if (!this.materialen[naam]) this.$set(this.materialen, naam, []);

			this.materialen[naam].push({
				naam: "",
				prijs: ""
			});
		},
		removeComponent(i, naam) {
			this.materialen[naam].splice(i, 1);
		},
		nextStep() {
			this.setData();
			this.$store.commit("verhoogStap", 4);
			this.$router.push("/maten");
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				materialen: this.materialen
			});
			this.$store.dispatch("wvbToFirebase");
		}
	},
	mounted() {
		window.$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 500, hide: 0 }
		});
		this.updateGegevens();
	}
};
</script>

<style scoped></style>
