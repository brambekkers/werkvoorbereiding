<template>
	<div class="content">
		<div class="container-fluid">
			<form
				role="form"
				@submit.prevent="nextStep()"
			>
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4">
						<div class="card">
							<CardHeader :text="{
									title: 'Materialen',
									subtitle: 'Waar ga je het van maken'
								}" />

							<div class="card-body">
								<div
									class="mb-3"
									:key="key"
									v-for="(input, key) in inputs"
								>
									<!-- Massief hout -->
									<h6 class="title col-form-label text-left border-bottom my-1">
										<strong>{{ input.title }}</strong>
									</h6>

									<div
										class="row "
										v-bind:key="'massief' + i"
										v-for="(materiaal, i) in materialen[key]"
									>
										<div class="col">
											<div class="input-group mb-2">
												<div class="input-group-prepend">
													<span
														id="basic-addon1"
														class="input-group-text pl-0"
													>
														<i :class="input.icon"></i>
													</span>
												</div>
												<input
													type="text"
													:placeholder="input.placeholder_naam"
													:id="`${key}_naam_${i}`"
													required="required"
													class="form-control"
													v-model.trim="materiaal.naam"
												/>
												<b-tooltip
													:target="`${key}_naam_${i}`"
													triggers="hover"
													placement="top"
												>
													{{ input.tooltip_naam }}
												</b-tooltip>
											</div>
										</div>
										<div class="col-3">
											<div class="input-group mb-2">
												<money
													:placeholder="input.placeholder_prijs"
													:id="`${key}_prijs_${i}`"
													min="1"
													required="required"
													class="form-control"
													v-model.number="materiaal.prijs"
													v-bind="key === 'massief' ? moneyMassief : moneyPlaat"
												>
												</money>
												<b-tooltip
													:target="`${key}_prijs_${i}`"
													triggers="hover"
													placement="top"
												>
													{{ input.tooltip_prijs }}
												</b-tooltip>
											</div>
										</div>

										<DeleteButton @delete="removeComponent(i, key)" />
									</div>
									<AddButton
										@add="newMaterial(key)"
										:text="`Voeg ${input.title} toe`"
									/>
								</div>

								<div class="d-flex justify-content-between border-top mt-4 flex-wrap">
									<router-link
										tag="button"
										class="btn"
										to="/overigeMaterialen"
									>
										<i
											aria-hidden="true"
											class="far fa-clipboard mr-2"
										></i>
										Overige materialen
									</router-link>
									<router-link
										tag="button"
										class="btn"
										to="/materiaalOpties"
									>
										<i
											aria-hidden="true"
											class="fas fa-edit mr-2"
										></i>
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
		PreviousNextButton,
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
				masked: false,
			},
			moneyPlaat: {
				decimal: ",",
				thousands: "",
				prefix: `€ `,
				suffix: "",
				precision: 2,
				masked: false,
			},
			inputs: {
				massief: {
					title: "Massief hout",
					icon: "fa fa-leaf fa-fw",
					placeholder_naam: "Massief houtsoort",
					placeholder_prijs: "Prijs m3",
					tooltip_naam: "Wat is de naam van de houtsoort?",
					tooltip_prijs: "Hoeveel kost deze houtsoort per m3? Bijv. 1800 euro",
				},
				plaatmateriaal: {
					title: "Plaatmateriaal",
					icon: "fa fa-square fa-fw",
					placeholder_naam: "Plaatmateriaal naam",
					placeholder_prijs: "Prijs m2",
					tooltip_naam:
						"Naam van het plaatmateriaal incl de dikte? Bijv. MDF 12mm",
					tooltip_prijs: "Hoeveel kost dit plaatmateriaal per m2?",
				},
				fineer: {
					title: "Fineer",
					icon: "fa fa-tag fa-fw",
					placeholder_naam: "Fineer soort",
					placeholder_prijs: "Prijs m2",
					tooltip_naam: "Wat voor fineer is het?",
					tooltip_prijs: "Hoeveel euro kost dit fineer per m2?",
				},
			},
		};
	},
	watch: {
		materialen: {
			handler() {
				this.setData();
			},
			deep: true,
		},
		werkvoorbereiding: {
			handler() {
				this.updateGegevens();
			},
			deep: true,
		},
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
		},
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
				prijs: "",
			});
		},
		removeComponent(i, naam) {
			this.materialen[naam].splice(i, 1);
		},
		nextStep() {
			this.setData();
			this.$store.dispatch("verhoogStap", 4);
			this.$router.push("/maten");
		},
		setData() {
			this.$store.dispatch("werkvoorbereiding", {
				...this.werkvoorbereiding,
				materialen: this.materialen,
			});
			this.$store.dispatch("wvbToFirebase");
		},
	},
	mounted() {
		window.$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 500, hide: 0 },
		});
		this.updateGegevens();
	},
};
</script>

<style scoped></style>
