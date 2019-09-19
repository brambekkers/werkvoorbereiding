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
								<a data-toggle="collapse" data-target="#filterPlanningCollapse" aria-expanded="false" aria-controls="filterCollapse">
									<i class="fas fa-filter fa-lg pr-4"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-body">
				<div class="collapse" id="filterPlanningCollapse">
					<div class="card card-body  mt-1">
						<h4>Filter opties</h4>
						<h6>Category</h6>
						<div id="filterList">
							<div class="form-check pl-4" v-for="stap of filterStap" :key="stap">
								<label class="form-check-label">
									<input class="form-check-input" type="checkbox" />
									{{ stap }}
									<span class="form-check-sign">
										<span class="check"></span>
									</span>
								</label>
							</div>
						</div>

						<h6>Handeling</h6>
						<div class="d-flex flex-wrap">
							<div class="form-check pl-4" v-for="bewerking of filterBewerking" :key="bewerking">
								<label class="form-check-label">
									<input class="form-check-input" type="checkbox" />
									{{ bewerking }}
									<span class="form-check-sign">
										<span class="check"></span>
									</span>
								</label>
							</div>
						</div>

						<h6>Machine</h6>
						<div class="d-flex">
							<div class="form-check pl-4" v-for="gereedschap of filterGereedschap" :key="gereedschap">
								<label class="form-check-label">
									<input class="form-check-input" type="checkbox" />
									{{ gereedschap }}
									<span class="form-check-sign">
										<span class="check"></span>
									</span>
								</label>
							</div>
						</div>

						<div id="filterList"></div>
					</div>
				</div>
				<template v-if="stapBestaat">
					<div class="planningBackground" v-bind:key="index" v-for="(dag, index) in planAgenda">
						<div class="planningTitle pl-4 py-3">
							<h4>
								<i class="far fa-calendar mr-3"></i>
								Dag {{ index + 1 }}
							</h4>

							<h4 class="float-right mr-5">Week {{ weekNummer(index + 1) }}</h4>
						</div>
						<div class="table-responsive">
							<table class="table table-hover table-striped text-center table-sm">
								<tbody>
									<tr v-bind:key="index" v-for="(stap, index) in dag">
										<th class="pl-3 text-left">{{ stap.tijd }} min</th>
										<td>{{ stap.stap.component }}</td>
										<td>{{ stap.stap.onderdeel }}</td>
										<td>{{ stap.stap.stap }}</td>
										<td>{{ stap.stap.bewerking }}</td>
										<td>{{ stap.stap.gereedschap }}</td>
									</tr>
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
	name: 'DashboardPlanning',
	data() {
		return {};
	},
	computed: {
		minutenDag() {
			return Number(this.getPlanningOpties.urenWerkdag) * 60;
		},
		filterStap() {
			return new Set(this.planningStappenArray.map(stap => stap.stap));
		},
		filterBewerking() {
			return new Set(this.planningStappenArray.map(stap => stap.bewerking));
		},
		filterGereedschap() {
			return new Set(this.planningStappenArray.map(stap => stap.gereedschap));
		},
		dagenWeek() {
			return Number(this.getPlanningOpties.dagenWeek);
		},
		ineffectieveTijd() {
			return Number(this.getPlanningOpties.ineffectieveTijd);
		},
		getPlanning() {
			return this.$store.getters.werkvoorbereidingsObject('planning');
		},
		getPlanningOpties() {
			return this.$store.getters.werkvoorbereidingsObject('planningOpties');
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
			for (const planning of this.getPlanning) {
				if (planning.stappen) {
					for (const stap of planning.stappen) {
						array.push({ ...stap, component: planning.component, onderdeel: planning.onderdeel });
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
						let berekenTijd = this.berekenStappenPerDag(beschikbaretijd, staptijd);

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
		}
	},
	methods: {
		staptijd(stap) {
			let tijd = Number(stap.insteltijd) + Number(stap.bewerkingstijd) * Number(stap.aantal);
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
		}
	}
};
</script>

<style scoped lang="scss">
.planningBackground {
	background: #f7f7f7;
	margin: 10px 0px;
	border-radius: 0.2rem;
}

.planningTitle {
	background: #dddddd;
}

.planningTitle h4 {
	display: inline-block;
	margin-bottom: 0;
	font-weight: 700;
}

.nacalculatie {
	background-color: hsla(0, 0%, 100%, 0.2);
	transition: background-color 0.3s 0.2s;
}
.nacalculatie:hover {
	background-color: hsla(0, 0%, 100%, 0.4);
	transition: background-color 0.3s 0.2s;
}

#filterList {
	display: flex;

	.filterItem {
		margin: 0 10px;
	}
}
</style>
