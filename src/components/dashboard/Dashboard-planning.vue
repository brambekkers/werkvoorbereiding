<template>
	<div class="col-md-12">
		<div class="card">
			<div class="card-header card-header-success">
				<div class="row">
					<div class="d-flex w-100">
						<div class="pl-3">
							<h3 class="card-title"><i class="fa fa-industry fa-lg pr-4"></i>Agenda</h3>
							<p class="card-category">Jouw planning automatisch samengesteld</p>
						</div>

						<div class="align-self-center ml-auto pr-3">
							<div class="dropdown">
								<a
									data-toggle="collapse"
									data-target="#filterPlanningCollapse"
									aria-expanded="false"
									aria-controls="filterCollapse"
								>
									<i class="fas fa-filter fa-lg pr-4"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-body">
				<!-- Planning filter options -->
				<div
					class="collapse"
					id="filterPlanningCollapse"
				>
					<div class="card card-body mt-1">
						<h4>Filter opties</h4>
						<p>
							Vink de opties aan die je zichtbaar wilt hebben in de planning. Alleen de planningsitems die aan jouw selectie voldoen
							zullen zichtbaar zijn.
						</p>
						<div
							class="mt-2"
							v-for="(subObject, key1) in filterKeys"
							:key="key1"
						>
							<h6>{{ key1 }}</h6>
							<div class="d-flex flex-wrap">
								<div
									class="form-check pl-4"
									v-for="(val, key2) in subObject"
									:key="key2"
								>
									<label class="form-check-label">
										<input
											class="form-check-input"
											type="checkbox"
											v-model="filterKeys[key1][key2]"
										/>
										{{ key2 }}
										<span class="form-check-sign">
											<span class="check"></span>
										</span>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<template v-if="stapBestaat">
					<div
						class="planningBackground"
						v-bind:key="index"
						v-for="(dag, index) in planAgenda"
					>
						<div
							class="bg-light pl-4 py-3 border-bottom"
							:class="{ 'bg-dark': darkMode }"
						>
							<h4>
								<i class="far fa-calendar mr-3"></i>
								Dag {{ index + 1 }}
							</h4>

							<h4 class="float-right mr-5">Week {{ weekNummer(index + 1) }}</h4>
						</div>
						<div class="table-responsive">
							<table
								class="table table-hover table-striped text-center table-sm mb-0"
								:class="{ 'table-dark darkHover': darkMode }"
							>
								<tbody>
									<template v-for="(dagItem, index) in dag">
										<tr
											v-if="
												allFilterOptionsOff ||
													(filterKeys['stap'][dagItem.stap.stap] ||
														filterKeys['bewerking'][dagItem.stap.bewerking] ||
														filterKeys['gereedschap'][dagItem.stap.gereedschap])
											"
											:key="index"
											class="border-bottom "
										>
											<div class="row m-0 p-2 bord ">
												<div class="col-1 pl-3 text-left font-weight-bold">{{ dagItem.tijd }} min</div>
												<div class="col-2">{{ dagItem.stap.component }}</div>
												<div class="col-2">{{ dagItem.stap.onderdeel }}</div>
												<div class="col-2">{{ dagItem.stap.stap }}</div>
												<div class="col-2">{{ dagItem.stap.bewerking }}</div>
												<div class="col-2">{{ dagItem.stap.gereedschap }}</div>

												<div
													class="col-12 pl-3 text-left"
													v-if="dagItem.stap.extraInfo"
												><span class="font-weight-bold">Extra: </span>{{dagItem.stap.extraInfo}}</div>

											</div>

										</tr>
									</template>
								</tbody>
							</table>
						</div>
					</div>
				</template>
				<template v-if="!stapBestaat">
					<p>Maak een planning aan om de agenda te vullen.</p>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardPlanning",
	props: ["werkvoorbereiding"],
	data() {
		return {
			filterKeys: {
				stap: {},
				bewerking: {},
				gereedschap: {}
			}
		};
	},
	mounted() {
		this.createFilterItems();
	},
	computed: {
		minutenDag() {
			return Number(this.getPlanningOpties.urenWerkdag) * 60;
		},
		filterStap() {
			return new Set(this.planningStappenArray.map(stap => stap.stap));
		},
		filterBewerking() {
			return new Set(
				this.planningStappenArray.map(stap => stap.bewerking)
			);
		},
		filterGereedschap() {
			return new Set(
				this.planningStappenArray.map(stap => stap.gereedschap)
			);
		},
		dagenWeek() {
			return Number(this.getPlanningOpties.dagenWeek);
		},
		ineffectieveTijd() {
			return Number(this.getPlanningOpties.ineffectieveTijd);
		},
		getPlanning() {
			if (this.werkvoorbereiding) {
				if (this.werkvoorbereiding.planning)
					return this.werkvoorbereiding.planning;
			}
			return false;
		},
		getPlanningOpties() {
			if (this.werkvoorbereiding) {
				if (this.werkvoorbereiding.planningOpties)
					return this.werkvoorbereiding.planningOpties;
			}
			return false;
		},
		stapBestaat() {
			if (this.getPlanning) {
				if (this.planningStappenArray) return true;
				return false;
			}
			return false;
		},
		planningStappenArray() {
			let array = [];
			if (this.getPlanning) {
				for (const planning of this.getPlanning) {
					if (planning.stappen) {
						for (const stap of planning.stappen) {
							array.push({
								...stap,
								component: planning.component,
								onderdeel: planning.onderdeel
							});
						}
					}
				}
			}
			return array;
		},
		planAgenda() {
			if (this.planningStappenArray) {
				let array = [[]];
				let beschikbaretijd = this.minutenDag;

				for (const substap of this.planningStappenArray) {
					let staptijd = this.staptijd(substap);

					while (staptijd > 0) {
						let berekenTijd = this.berekenStappenPerDag(
							beschikbaretijd,
							staptijd
						);

						if (berekenTijd.resttijd === 0) {
							beschikbaretijd = berekenTijd.beschikbaretijd;

							let num = array.length - 1;
							array[num].push({
								stap: substap,
								tijd: Number(staptijd.toFixed(0))
							});

							staptijd = 0;
						} else if (berekenTijd.resttijd > 0) {
							let num = array.length - 1;
							array[num].push({
								stap: substap,
								tijd: Number(beschikbaretijd.toFixed(0))
							});

							staptijd = berekenTijd.resttijd;
							array.push([]);
							beschikbaretijd = this.minutenDag;
						}
					}
				}
				return array;
			}
			return false;
		},
		allFilterOptionsOff() {
			let allOff = true;
			for (let [key, value] of Object.entries(this.filterKeys)) {
				for (let [key, value] of Object.entries(value)) {
					if (value) {
						allOff = false;
					}
				}
			}
			return allOff;
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === "licht"
				? false
				: true;
		}
	},
	methods: {
		staptijd(stap) {
			let tijd =
				Number(stap.insteltijd) +
				Number(stap.bewerkingstijd) * Number(stap.aantal);
			return tijd + (tijd / 100) * this.ineffectieveTijd;
		},
		berekenStappenPerDag(beschikbaretijd, staptijd) {
			// Stap is korter dan beschikbare tijd
			if (staptijd <= beschikbaretijd) {
				beschikbaretijd -= staptijd;
				return {
					resttijd: 0,
					beschikbaretijd: beschikbaretijd
				};
			}
			// Staptijd
			else {
				let resttijd = (staptijd -= beschikbaretijd);
				return {
					resttijd: resttijd,
					beschikbaretijd: 0
				};
			}
		},
		weekNummer(nummer) {
			let num = nummer;
			let week = 1;
			while (num > 0) {
				num -= this.dagenWeek;
				if (num > 0) {
					week++;
				}
			}
			return week;
		},
		createFilterItems() {
			for (const stap of this.filterStap) {
				this.$set(this.filterKeys.stap, stap, false);
			}
			for (const bewerking of this.filterBewerking) {
				this.$set(this.filterKeys.bewerking, bewerking, false);
			}
			for (const gereedschap of this.filterGereedschap) {
				this.$set(this.filterKeys.gereedschap, gereedschap, false);
			}
		}
	}
};
</script>

<style scoped lang="scss">
.darkHover tr:hover {
	background-color: rgba(36, 36, 36, 0.75) !important;
}

.planningBackground {
	margin: 10px 0px;
	border: solid 1px #d6d6d6;
	border-radius: 0.2rem;
}

.planningBackground div h4 {
	display: inline-block;
	margin-bottom: 0;
	font-weight: 700;
}

#filterList {
	display: flex;

	.filterItem {
		margin: 0 10px;
	}
}
</style>
