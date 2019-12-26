<template>
	<div class="col-md-6">
		<div class="card card-chart">
			<div
				class="card-header card-header-info"
				:data-header-animation="optionsOn"
			>
				<Chart
					v-if="getPlanning"
					:height="150"
					:uren="tijdPerOnderwerp"
					:styles="{
						width: '100%',
						position: 'relative',
						'z-index': 0
					}"
				/>
				<p v-if="!getPlanning">
					Voer op de <strong>'plannings'</strong> pagina de gegevens in van je
					project. Pas dan kunnen we de tijd (en daarmee kosten) berekenen.
				</p>
			</div>
			<div class="card-body">
				<div class="card-actions">
					<router-link
						tag="button"
						class="btn btn-default btn-link"
						data-placement="bottom"
						data-original-title="Planningsopties"
						to="/planningOpties"
					>
						<i class="material-icons">edit</i> Planning opties
					</router-link>
				</div>
				<hr />
				<div class="d-flex">
					<p class="d-inline mr-auto">Insteltijd:</p>
					<p class="d-inline ml-auto">{{ insteltijd }} uur</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Bewerkingstijd:</p>
					<p class="d-inline ml-auto">{{ bewerkingstijd }} uur</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Ineffectieve tijd:</p>
					<p class="d-inline ml-auto">{{ ineffectieveTijd }} uur</p>
				</div>
				<br /><br />
				<hr class="mt-0" />
				<div class="d-flex">
					<p class="d-inline mr-auto">Totaal aantal uren:</p>
					<p class="d-inline ml-auto">{{ totaletijdNetto }} uur</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Totaal aantal werkdagen:</p>
					<p class="d-inline ml-auto">{{ totaletijdNettoWerkdagen }} dagen</p>
				</div>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons">access_time</i> updated 4 minutes ago
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Chart from "@/components/chart/Chart-worktime";

export default {
	name: "DashboardWorktime",
	props: ["werkvoorbereiding", "optionsOn"],
	components: {
		Chart
	},
	computed: {
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
		dashboard() {
			return this.$store.getters.dashboard;
		},
		planningStappenArray() {
			let array = [];
			if (this.getPlanning) {
				for (const planning of this.getPlanning) {
					if (planning.stappen) array = [...array, ...planning.stappen];
				}
			}
			return array;
		},
		insteltijd() {
			const min = this.planningStappenArray.reduce(
				(a, b) => a + Number(b.insteltijd),
				0
			);
			return Number((min / 60).toFixed(1));
		},
		bewerkingstijd() {
			const min = this.planningStappenArray.reduce(
				(a, b) => a + Number(b.bewerkingstijd) * Number(b.aantal),
				0
			);
			return Number((min / 60).toFixed(1));
		},
		tijdPerOnderwerp() {
			let category = [
				"Voorbereiding",
				"Machinale",
				"Werkplaats",
				"Plaatsen",
				"Administratie"
			];
			let timeArray = [];

			for (const cat of category) {
				let tijd = 0;
				for (const stap of this.planningStappenArray) {
					if (cat === stap.stap) {
						tijd += Number(stap.insteltijd);
						tijd += Number(stap.bewerkingstijd) * Number(stap.aantal);
					}
				}
				timeArray.push((tijd / 60).toFixed(1));
			}

			return timeArray;
		},
		totaletijdBrutto() {
			return this.insteltijd + this.bewerkingstijd;
		},
		totaletijdNetto() {
			let aantalUren = Number(
				(this.insteltijd + this.bewerkingstijd + this.ineffectieveTijd).toFixed(
					1
				)
			);

			// Check if dashboard data is up-to-date and change if needed
			if (this.dashboard.aantalUren != aantalUren) {
				this.$store.commit("setDashboard", {
					path: "aantalUren",
					value: aantalUren
				});
			}
			return aantalUren;
		},
		totaletijdNettoWerkdagen() {
			if (this.getPlanning) {
				let aantalWerkdagen = Number(
					(
						(this.insteltijd + this.bewerkingstijd + this.ineffectieveTijd) /
						Number(this.getPlanningOpties.urenWerkdag)
					).toFixed(1)
				);

				// Check if dashboard data is up-to-date and change if needed
				if (this.dashboard.aantalWerkdagen != aantalWerkdagen) {
					this.$store.commit("setDashboard", {
						path: "aantalWerkdagen",
						value: aantalWerkdagen
					});
				}

				return aantalWerkdagen;
			} else {
				return 0;
			}
		},
		ineffectieveTijd() {
			if (this.getPlanning) {
				return Number(
					(
						(this.totaletijdBrutto / 100) *
						Number(this.getPlanningOpties.ineffectieveTijd)
					).toFixed(1)
				);
			} else {
				return 0;
			}
		}
	}
};
</script>

<style scoped lang="scss">
.card {
	height: calc(100% - 60px);
}

.card-header {
	min-height: 100px;
	display: flex;
	align-items: center;

	p {
		margin-bottom: 0;
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
	z-index: 10;
}
</style>
