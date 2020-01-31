<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-12">
						<div class="card">
							<CardHeader
								:text="{
									title: 'Planning',
									subtitle: 'Wanneer ga je het maken?'
								}"
							/>
							<div class="card-body">
								<draggable v-model="planning" handle=".handle">
									<div
										v-bind:key="'Planning' + planningIndex"
										v-for="(planning, planningIndex) in planning"
										class="planning shadow-sm"
									>
										<div class="row">
											<!-- Component -->
											<div class="col-5 col-md-3 col-xl-3">
												<div class="input-group mb-2">
													<div class="input-group-prepend">
														<span id="basic-addon1" class="input-group-text">
															<i class="fas fa-list-ul grabbing handle"></i>
														</span>
													</div>
													<select
														data-toggle="tooltip"
														data-placement="top"
														title=""
														required="required"
														class="form-control"
														data-original-title="Voor welk component wil je een planning maken?"
														v-model="planning.component"
													>
														<option value="" hidden disabled selected
															>Kies component</option
														>
														<option value="Gehele project"
															>Gehele project</option
														>
														<option
															v-bind:key="index"
															v-for="(component, index) in getComponenten"
															>{{ component.naam }}</option
														>
													</select>
												</div>
											</div>
											<!-- Onderdeel -->
											<div class="col-4 col-md-3 col-xl-3">
												<div class="input-group mb-2">
													<select
														data-toggle="tooltip"
														data-placement="top"
														title=""
														required="required"
														class="form-control"
														data-original-title="Voor welk onderdeel?"
														v-model="planning.onderdeel"
													>
														<option
															value=""
															hidden
															disabled
															selected
															v-if="!planning.component"
															>Kies eerst een component</option
														>
														<option
															value=""
															hidden
															disabled
															selected
															v-if="planning.component"
															>Kies een onderdeel</option
														>
														<option
															value="Alle onderdelen"
															v-if="planning.component"
															>Alle onderdelen</option
														>
														<option
															v-bind:key="index"
															v-for="(component, index) in onderdelen(
																planningIndex
															)"
															>{{ component.naam }}</option
														>
													</select>
												</div>
											</div>
											<div class="col">
												<div class="row">
													<AddButtonInline
														@add="newStap(planningIndex)"
														class="mr-1"
													/>
													<DeleteButton
														@delete="removePlanning(planningIndex)"
													/>
												</div>
											</div>
										</div>
										<!-- //////////////////////////////////////////////// -->
										<!-- //////////////////// SUBSTAP /////////////////// -->
										<!-- //////////////////////////////////////////////// -->
										<draggable
											handle=".handle"
											:list="planning.stappen"
											group="substap"
										>
											<div
												class="row stap shadow-sm ml-2 p-0"
												v-bind:key="index"
												v-for="(stap, index) in planning.stappen"
											>
												<!-- Stap -->
												<div class="col-6 col-sm-4 col-xl-3">
													<div class="input-group mb-2">
														<div class="input-group-prepend">
															<span id="basic-addon1" class="input-group-text">
																<i
																	class="far fa-hand-point-right grabbing handle"
																></i>
															</span>
														</div>
														<select
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															class="form-control"
															data-original-title="Welke stap ga je doen?"
															v-model="stap.stap"
														>
															<optgroup label="Stap">
																<option value="" hidden selected disabled
																	>Kies..</option
																>
																<option
																	v-bind:key="index"
																	v-for="(stap, index) in onderdeelStappen"
																	>{{ stap }}</option
																>
															</optgroup>
														</select>
													</div>
												</div>
												<!-- Werkzaamheid -->
												<div class="col-6 col-sm-4 col-xl-2">
													<div class="input-group mb-2">
														<select
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															class="form-control"
															data-original-title="Voor welke werkzaamheid?"
															v-model="stap.werkzaamheid"
														>
															<optgroup label="Werkzaamheid">
																<option value="" hidden selected disabled
																	>Kies..</option
																>
																<option
																	v-bind:key="index"
																	v-for="(werkzaamheid,
																	index) in onderdeelWerkzaamheid(stap.stap)"
																	>{{ werkzaamheid }}</option
																>
															</optgroup>
														</select>
													</div>
												</div>
												<!-- Bewerking -->
												<div class="col-6 col-sm-4 col-xl-2">
													<div class="input-group mb-2">
														<select
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															class="form-control"
															data-original-title="Welke bewerking ga je uitvoeren?"
															v-model="stap.bewerking"
														>
															<optgroup label="Bewerking">
																<option value="" hidden selected disabled
																	>Kies..</option
																>
																<option
																	v-bind:key="index"
																	v-for="(werkzaamheid,
																	index) in onderdeelBewerking(
																		stap.stap,
																		stap.werkzaamheid
																	)"
																	>{{ werkzaamheid }}</option
																>
															</optgroup>
														</select>
													</div>
												</div>
												<!-- Gereedschap -->
												<div class="col-6 col-sm-4 col-xl-1">
													<div class="input-group mb-2">
														<select
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															class="form-control"
															data-original-title="Heb je een gereedschap nodig?"
															v-model="stap.gereedschap"
														>
															<option value="" hidden selected disabled
																>Selecteer gereedschap</option
															>
															<optgroup
																label="Gereedschap"
																v-if="gereedschappen.length"
															>
																<option
																	:value="gereedschap"
																	:key="index"
																	v-for="(gereedschap, index) in gereedschappen"
																	>{{ gereedschap }}</option
																>
															</optgroup>
															<optgroup label="Machines" v-if="machines.length">
																<option
																	:value="gereedschap"
																	:key="index"
																	v-for="(gereedschap, index) in machines"
																	>{{ gereedschap }}</option
																>
															</optgroup>
															<optgroup
																label="Zelf toegevoegd"
																v-if="userMade.length"
															>
																<option
																	:value="gereedschap"
																	:key="index"
																	v-for="(gereedschap, index) in userMade"
																	>{{ gereedschap }}</option
																>
															</optgroup>
															<optgroup label="Overig">
																<option value="Overig">Overig</option>
																<option value="Meerdere machines"
																	>Meerdere machines</option
																>
																<option value="Handgereedschap"
																	>Handgereedschap</option
																>
																<option value="Geen gereedschap"
																	>Geen gereedschap</option
																>
															</optgroup>
														</select>
													</div>
												</div>
												<!-- Insteltijd -->
												<div class="col">
													<div class="input-group mb-2">
														<input
															type="number"
															placeholder="Insteltijd"
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															min="0"
															class="form-control"
															data-original-title="Hoeveel minuten ben je bezig met instellen?"
															v-model.number="stap.insteltijd"
														/>
													</div>
												</div>
												<!-- Bewerkingstijd -->
												<div class="col">
													<div class="input-group mb-2">
														<input
															type="number"
															placeholder="Bewerkingstijd"
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															min="1"
															class="form-control"
															data-original-title="Hoeveel minuten ben je bezig met één bewerking?"
															v-model.number="stap.bewerkingstijd"
														/>
													</div>
												</div>
												<!-- Aantal -->
												<div class="col">
													<div class="input-group mb-2 pr-0">
														<input
															type="number"
															placeholder="Aantal"
															data-toggle="tooltip"
															data-placement="top"
															required="required"
															min="1"
															class="form-control"
															data-original-title="Hoe vaak ga je dezelfde handeling uitvoeren?"
															v-model.number="stap.aantal"
														/>
													</div>
												</div>
												<!-- Knoppen -->
												<div class="col d-flex justify-content-center">
														<b-dropdown
															size="sm"
															text="Small"
															variant="link"
															toggle-class="text-decoration-none bg-white p-0 "
															class="optionsDropdown"
															no-caret
														>
															<template v-slot:button-content>
																<button class="btn btn-sm btn-fab">
																	<i class="material-icons fas fa-caret-down"></i>
																</button>
															</template>
															<div class="d-flex mt-1">
																<!-- Info button -->
																<InfoButton
																	:firstIndex="planningIndex"
																	:secondIndex="index"
																	class="mr-1"
																/>
																<!-- Copy button -->
																<div class="mr-1 col-2 col-md-1 col-lg-2 col-xl-1">
																	<div class="input-group mb-2">
																		<button
																			type="button"
																			class="btn btn-sm btn-fab btn-block"
																			@click="newStap(planningIndex, stap)"
																		>
																			<i class="material-icons fas fa-copy fa-xs"></i>
																		</button>
																	</div>
																</div>
																<!-- Delete Button -->
																<DeleteButton
																	@delete="removeStap(planningIndex, index)"
																/>
															</div>
															
														</b-dropdown>
												</div>
												<div
													class="collapse col-12 p-0"
													:id="`extraInfo_${planningIndex}_${index}`"
													v-bind:class="{ show: stap.extraInfo }"
												>
													<div class="card card-body my-0 pt-0">
														<div class="input-group px-2">
															<input
																type="text"
																placeholder="Optioneel: Geef extra informatie over deze handeling."
																data-toggle="tooltip"
																data-placement="top"
																class="form-control"
																data-original-title="Indien noodzakelijk kan hier extra informatie worden opgegeven"
																v-model="stap.extraInfo"
															/>
														</div>
													</div>
												</div>
											</div>
										</draggable>
									</div>
								</draggable>
								<div class="d-flex justify-content-between flex-wrap">
									<AddButton
										@add="newOnderdeel"
										:text="'Voeg nieuw onderdeel toe'"
									/>
									<router-link
										to="/planningOpties"
										tag="button"
										type="button"
										class="btn"
									>
										<i aria-hidden="true" class="fas fa-edit mr-3"></i>
										Planning en kosten instellingen
									</router-link>
								</div>
							</div>
						</div>
						<PreviousNextButton :previous="'gereedschap'" />
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import newWvb from "@/assets/config/newWvb.js";
import draggable from "vuedraggable";
import planningGegevens from "@/assets/config/planningGegevens.js";
import CardHeader from "@/components/Card-header.vue";
import AddButton from "@/components/Add-button.vue";
import AddButtonInline from "@/components/Add-button-inline.vue";
import DeleteButton from "@/components/Delete-button.vue";
import InfoButton from "@/components/Info-button.vue";
import PreviousNextButton from "@/components/Previous-next-button.vue";

export default {
	name: "Planning",
	components: {
		draggable,
		CardHeader,
		AddButton,
		AddButtonInline,
		DeleteButton,
		InfoButton,
		PreviousNextButton
	},
	data() {
		return {
			planning: newWvb.planning
		};
	},
	watch: {
		planning: {
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
		getPlanning() {
			return this.$store.getters.werkvoorbereidingsObject("planning");
		},
		getComponenten() {
			return this.$store.getters.werkvoorbereidingsObject("componenten");
		},
		getGereedschap() {
			return this.$store.getters.werkvoorbereidingsObject("gereedschap");
		},
		getMaten() {
			return this.$store.getters.werkvoorbereidingsObject("maten");
		},
		gereedschappen() {
			if (this.getGereedschap) {
				const keys = Object.keys(this.getGereedschap.gereedschap);
				if (keys) {
					return keys.filter(key => this.getGereedschap.gereedschap[key]);
				}
			}
			return [];
		},
		machines() {
			if (this.getGereedschap) {
				const keys = Object.keys(this.getGereedschap.machines);
				if (keys) {
					return keys.filter(key => this.getGereedschap.machines[key]);
				}
			}
			return [];
		},
		userMade() {
			if (this.getGereedschap) {
				if (!this.getGereedschap.userMade) return [];
				const keys = Object.keys(this.getGereedschap.userMade);
				if (keys) {
					return keys.filter(key => this.getGereedschap.userMade[key]);
				}
			}
			return [];
		},
		onderdeelStappen() {
			return Object.keys(planningGegevens);
		}
	},
	methods: {
		updateGegevens() {
			if (this.getPlanning) this.$set(this, "planning", this.getPlanning);
			else this.$set(this, "planning", newWvb.planning);
		},
		onderdelen(i) {
			if (this.getMaten && this.getPlanning) {
				let onderdelen = this.getMaten.filter(maten => {
					if (maten.component === this.getPlanning[i].component) {
						return maten.naam;
					}
				});
				return onderdelen;
			}
		},
		onderdeelWerkzaamheid(i) {
			if (i) {
				return Object.keys(planningGegevens[i]);
			}
		},
		onderdeelBewerking(i, j) {
			if (i && j) {
				return planningGegevens[i][j];
			}
		},
		newOnderdeel() {
			this.planning.push({
				component: "",
				onderdeel: "",
				stappen: []
			});
			this.$forceUpdate();
		},
		newStap(i, copy) {
			if (!this.planning[i]) {
				this.$set(this.planning[i], "stappen", []);
			}
			const empty = {
				aantal: "",
				bewerking: "",
				bewerkingstijd: "",
				gereedschap: "",
				insteltijd: "",
				stap: "",
				werkzaamheid: ""
			}
			this.planning[i].stappen.push(copy ? {...copy} : empty);
			this.$forceUpdate();
		},
		removePlanning(i) {
			this.planning.splice(i, 1);
		},
		removeStap(planning, i) {
			this.planning[planning].stappen.splice(i, 1);
		},
		previousStep() {
			this.$router.push("/gereedschap");
		},
		nextStep() {
			this.setData();
			this.$store.commit("verhoogStap", 7);
			this.$router.push("/dashboard");
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				planning: this.planning
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

<style lang="scss">
.planning {
	background: rgba(0, 0, 0, 0.05);
	margin: 10px 0px;
	padding: 0 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.2rem;
	border-radius: 0.2rem;
	border: solid 1px #d6d6d6;
}

.stap {
	background: rgba(255, 255, 255, 1);
	padding: 0 1rem;
	margin: 10px 0px;
	padding-top: 0.3rem;
	border-radius: 0.2rem;
	border: solid 1px #e8e5e5;
}

.grabbing {
	cursor: move;
	/* fallback if grab cursor is unsupported */
	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.grabbing:active {
	cursor: grabbing;
	cursor: -moz-grabbing;
	cursor: -webkit-grabbing;
}

.optionsDropdown{
	.dropdown-menu{
		min-width: 125px !important;
		width: 125px !important;
	}
}
</style>
