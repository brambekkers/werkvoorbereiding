<template>
	<div class="col-md-12">
		<div class="card">
			<div class="card-header card-header-success">
				<div class="row">
					<div class="col-sm-7 col-lg-8 col-xl-9">
						<h3 class="card-title">
							<i class="fa fa-industry fa-lg pr-4"></i>Agenda</h3>
						<p class="card-category">Jouw planning automatisch samengesteld</p>
					</div>
					<div class="col-sm-5 col-lg-4 col-xl-3 text-center">
						<a class="nacalculatie btn btn-block btn-lg" @click="$store.state.appData.page = 8">
							<i class="material-icons mr-1">assignment</i>
								Nacalculatie
						</a>
					</div>
				</div>
			</div>
			<div class="card-body">
				<template v-if="stapBestaat">
					<div class="planningBackground" v-bind:key="index" v-for="(dag, index) in planAgenda">
						<div class="planningTitle pl-4 py-3">
							<h4>
								<i class="far fa-calendar mr-3"></i>
								Dag {{index+1}}
							</h4>

							<h4 class="float-right mr-5">
								Week {{weekNummer(index+1)}}
							</h4>
						</div>
						<div class="table-responsive">
							<table class="table table-hover table-striped text-center table-sm">
								<tbody>
									<tr v-bind:key="index" v-for="(stap, index) in dag">
										<th class="pl-3 text-left">{{stap.tijd}} min</th>
										<td>{{stap.stap.stap}}</td>
										<td>{{stap.stap.bewerking}}</td>
										<td>{{stap.stap.gereedschap}}</td>
									</tr>
								</tbody>
							</table>
						</div>

					</div>
				</template>
				<template v-if="!stapBestaat">
					<p> Maak een planning aan om de agenda te vullen. </p>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DashboardPlanning",
		data() {
			return {

			}
		},
		computed: {
			minutenDag() {
				return Number(this.$store.state.werkvoorbereiding.planningOpties.urenWerkdag) * 60
			},
			dagenWeek() {
				return Number(this.$store.state.werkvoorbereiding.planningOpties.dagenWeek)
			},
			ineffectieveTijd() {
				return Number(this.$store.state.werkvoorbereiding.planningOpties.ineffectieveTijd)
			},
			planning() {
				return this.$store.state.werkvoorbereiding.planning
			},
			stapBestaat() {
				if (this.planning) {
					if (this.planningStappenArray) {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			planningStappenArray() {
				let array = []
				for (const planning of this.planning) {
					if (planning.stappen) {
						for (const stap of planning.stappen) {
							array.push(stap)
						}
					}
				}
				return array
			},
			planAgenda() {
				if (this.planningStappenArray) {
					let array = [
						[]
					]
					let beschikbaretijd = this.minutenDag

					for (const substap of this.planningStappenArray) {
						let staptijd = this.staptijd(substap)

						while (staptijd > 0) {
							let berekenTijd = this.berekenStappenPerDag(beschikbaretijd, staptijd)

							if (berekenTijd.resttijd === 0) {
								beschikbaretijd = berekenTijd.beschikbaretijd

								let num = array.length - 1
								array[num].push({
									stap: substap,
									tijd: Number(staptijd.toFixed(0))
								})

								staptijd = 0
							} else if (berekenTijd.resttijd > 0) {
								let num = array.length - 1
								array[num].push({
									stap: substap,
									tijd: Number(beschikbaretijd.toFixed(0))
								})

								staptijd = berekenTijd.resttijd
								array.push([])
								beschikbaretijd = this.minutenDag
							}
						}
					}
					return array
				}
			}
		},
		methods: {
			staptijd(stap) {
				let tijd = Number(stap.insteltijd) + (Number(stap.bewerkingstijd) * Number(stap.aantal))
				return tijd + (tijd / 100 * this.ineffectieveTijd)
			},
			berekenStappenPerDag(beschikbaretijd, staptijd) {
				// Stap is korter dan beschikbare tijd
				if (staptijd <= beschikbaretijd) {
					beschikbaretijd -= staptijd
					return {
						resttijd: 0,
						beschikbaretijd: beschikbaretijd
					}
				}
				// Staptijd
				else {
					let resttijd = staptijd -= beschikbaretijd
					return {
						resttijd: resttijd,
						beschikbaretijd: 0
					}
				}
			},
			weekNummer(nummer) {
				let num = nummer
				let week = 1
				while (num > 0) {
					num -= this.dagenWeek
					if (num > 0) {
						week++
					}
				}
				return week
			}
		},
	};
</script>


<style scoped>
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

	.nacalculatie{
		background-color: hsla(0,0%,100%,.2);
		transition: background-color .3s .2s;
	}
	.nacalculatie:hover{
		background-color: hsla(0,0%,100%,.4);
		transition: background-color .3s .2s;
	}
</style>