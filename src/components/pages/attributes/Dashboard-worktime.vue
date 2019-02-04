<template>
	<div class="col-md-6">
		<div class="card card-chart">
			<div class="card-header card-header-info">
				<i class="material-icons fas fa-cog options" v-if="wvbActive" @click.prevent="$store.state.appData.page = -5"></i>
				<Chart :height="150" :uren="tijdPerOnderwerp"/>
			</div>
			<div class="card-body">
				<hr>
				<div class="d-flex">
					<p class="d-inline mr-auto">Insteltijd: </p>
					<p class="d-inline ml-auto">{{insteltijd}} uur</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Bewerkingstijd: </p>
					<p class="d-inline ml-auto">{{bewerkingstijd}} uur</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Ineffectieve tijd: </p>
					<p class="d-inline ml-auto">{{ineffectieveTijd}} uur</p>
				</div>
				<br><br>
				<hr class="mt-0">
				<div class="d-flex">
					<p class="d-inline mr-auto">Totaal aantal uren: </p>
					<p class="d-inline ml-auto">{{totaletijdNetto}} uur</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Totaal aantal werkdagen: </p>
					<p class="d-inline ml-auto">{{totaletijdNettoWerkdagen}} dagen</p>
				</div>
				<br><br><br>

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
	import Chart from './Chart-worktime'

	export default {
		name: "DashboardWorktime",
		components: {
			Chart
		},
		computed: {
			wvbActive(){
				if(this.$store.state.werkvoorbereiding){
					if(Object.keys(this.$store.state.werkvoorbereiding).length > 0){
						return true
					}
				}
				return false
			},
			planning(){
				if(this.$store.state.werkvoorbereiding.planning){
					return this.$store.state.werkvoorbereiding.planning
				}else{
					return false
				}
			},
			planningOpties(){
				return this.$store.state.werkvoorbereiding.planningOpties
			},
			planningStappenArray(){
				let array = []
				if(this.planning){
					for (const planning of this.planning) {
						if(planning.stappen){
							for (const stap of planning.stappen) {
								array.push(stap)
							}
						}
					}
				}
				return array
			},
			insteltijd(){
				let tijd = 0
				for (const stap of this.planningStappenArray) {
					tijd += Number(stap.insteltijd)
				}
				return Number((tijd / 60).toFixed(1));
			},
			bewerkingstijd(){
				let tijd = 0
				for (const stap of this.planningStappenArray) {
					tijd += Number(stap.bewerkingstijd) *  Number(stap.aantal)
				}
				return Number((tijd / 60).toFixed(1));
			},
			tijdPerOnderwerp(){
				let category = ['Voorbereiding', 'Machinale', 'Werkplaats', 'Plaatsen', 'Administratie']
				let timeArray = []
				
				for (const cat of category) {
					let tijd = 0
					for (const stap of this.planningStappenArray) {
						if(cat === stap.stap){
							tijd += Number(stap.insteltijd)
							tijd += Number(stap.bewerkingstijd) *  Number(stap.aantal)
						}	
					}
					timeArray.push( (tijd / 60).toFixed(1) )
				}
	
				return timeArray
			},
			totaletijdBrutto(){
				return this.insteltijd + this.bewerkingstijd
			},
			totaletijdNetto(){
				let aantalUren = Number((this.insteltijd + this.bewerkingstijd + this.ineffectieveTijd).toFixed(1))
				this.$store.state.dashboard.aantalUren = aantalUren
				return aantalUren
			},
			totaletijdNettoWerkdagen(){
				if(this.planning){
					let aantalWerkdagen = Number(((this.insteltijd + this.bewerkingstijd + this.ineffectieveTijd) / Number(this.planningOpties.urenWerkdag)).toFixed(1));
					this.$store.state.dashboard.aantalWerkdagen = aantalWerkdagen
					return aantalWerkdagen
				}else{
					return 0
				}
			},
			ineffectieveTijd(){
				if(this.planning){
					return Number((this.totaletijdBrutto / 100 * Number(this.planningOpties.ineffectieveTijd)).toFixed(1));
				}else{
					return 0
				}
			}
		}
	};
</script>


<style scoped>
	.stats{
		width: 100%;
	}
	.options{
		position: absolute;
		left: 90%;
		cursor: pointer;
	}
</style>