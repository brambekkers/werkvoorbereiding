<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<form
						role="form"
						@submit.prevent="nextStep()"
					>
						<div class="card">
							<CardHeader :text="{
									title: 'Basisgegevens',
									subtitle: 'De eerste stap...'
								}" />
							<div class="card-body">
								<template v-for="input of inputs">
									<div
										class="input-group mb-2"
										:key="input.model"
										v-if="input.active"
									>
										<div class="input-group-prepend">
											<span class="input-group-text"><i :class="input.icon"></i></span>
										</div>
										<input
											type="text"
											:id="input.model"
											:placeholder="input.placeholder"
											data-toggle="tooltip"
											data-placement="right"
											required="required"
											class="form-control"
											v-model.trim="basisgegevens[input.model]"
										/>
										<b-tooltip
											:target="input.model"
											triggers="hover"
											placement="right"
										>
											{{ input.tooltip }}
										</b-tooltip>
									</div>
								</template>
								<!-- Filter -->
								<b-dropdown
									size="sm"
									variant="link"
									toggle-class="text-decoration-none bg-white p-0 pl-2"
									no-caret
								>
									<template v-slot:button-content>
										<button class="btn btn-sm btn-fab pulse-button">
											<i class="material-icons fas fa-plus "></i>
										</button>
									</template>

									<div
										:key="input.model"
										v-for="input of inputs"
										class="mx-3"
									>
										<div
											class="material-switch mr-1"
											v-if="!input.fixed"
											@click="changeInput(input)"
										>
											<input
												type="checkbox"
												v-model="input.active"
											/>
											<label
												:for="'label' + input.model"
												class="small"
												:style="{ 'background-color': hexColor }"
											></label>
										</div>
										<small v-if="!input.fixed">{{ input.placeholder }}</small>
									</div>
								</b-dropdown>
								<div
									class="dropdown-menu dropdown-menu-inputs px-3 pt-3"
									ref="uniqueName"
								></div>
							</div>
						</div>
						<button
							tag="button"
							type="submit"
							class="btn btn-lg btn-block"
						>
							Start de werkvoorbereiding
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import newWvb from "@/assets/config/newWvb.js";
import CardHeader from "@/components/Card-header.vue";

export default {
	name: "Gegevens",
	components: { CardHeader },
	data() {
		return {
			basisgegevens: newWvb.basisgegevens,
			inputs: {
				project: {
					active: true,
					fixed: true,
					model: "project",
					icon: "fa fa-tag fa-fw",
					placeholder: "Project",
					tooltip: "Wat is de naam van je project?"
				},
				naam: {
					active: true,
					fixed: true,
					model: "naam",
					icon: "fa fa-user fa-fw",
					placeholder: "Voor en achternaam",
					tooltip: "Vul hier jouw eigen naam in."
				},
				klas: {
					active: false,
					model: "klas",
					icon: "fa fa-graduation-cap fa-fw",
					placeholder: "Klas",
					tooltip: "In welke klas zit je?"
				},
				docent: {
					active: false,
					model: "docent",
					icon: "fa fa-university fa-fw",
					placeholder: "Docent",
					tooltip: "Van wie krijg je les?"
				},

				klant: {
					active: false,
					model: "klant",
					icon: "fa fa-user-tie fa-fw",
					placeholder: "Klant",
					tooltip: "Wie is de klant van het project?"
				},
				orderNummer: {
					active: false,
					model: "orderNummer",
					icon: "fa fa-file-excel fa-fw",
					placeholder: "Ordernummer",
					tooltip: "Wat is het ordernummer van de opdracht?"
				},
				bedrijf: {
					active: false,
					model: "bedrijf",
					icon: "fa fa-building fa-fw",
					placeholder: "Bedrijf",
					tooltip: "Wat is de bedrijfsnaam?"
				}
			}
		};
	},
	watch: {
		basisgegevens: {
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
		getBasisgegevens() {
			return this.$store.getters.werkvoorbereidingsObject(
				"basisgegevens"
			);
		},
		hexColor() {
			return this.$store.getters.hexColor;
		}
	},
	methods: {
		updateGegevens() {
			const bg = this.getBasisgegevens;
			if (bg) {
				this.$set(this, "basisgegevens", this.getBasisgegevens);
				const i = this.inputs;
				i.klas.active = bg.klas ? true : false;
				i.docent.active = bg.docent ? true : false;
				i.bedrijf.active = bg.bedrijf ? true : false;
				i.klant.active = bg.klant ? true : false;
			} else this.$set(this, "basisgegevens", newWvb.basisgegevens);
		},
		nextStep() {
			this.setData();
			this.$store.dispatch("verhoogStap", 2);
			this.$router.push("/componenten");
		},
		setData() {
			this.$store.dispatch("werkvoorbereiding", {
				...this.werkvoorbereiding,
				basisgegevens: this.basisgegevens
			});
			this.$store.dispatch("wvbToFirebase");
		},
		changeInput(input) {
			input.active = !input.active;
		}
	},
	mounted() {
		this.updateGegevens();
		window.$("#dd-inputs").on("hide.bs.dropdown", e => {
			if (e.clickEvent) {
				e.preventDefault();
			}
		});
	}
};
</script>

<style scoped lang="scss">
	.pulse-button {
		-webkit-animation: pulse 1.5s infinite;
		&:hover {
			-webkit-animation: none;
		}

		@-webkit-keyframes pulse {
			70% {
				box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
			}
			100% {
				box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
			}
		}
	}
</style>
