<template>
	<div class="col-md-6">
		<div class="card card-chart">
			<div class="card-header card-header-warning">
				<i class="material-icons fas fa-cog options" v-if="wvbActive" @click.prevent="$store.state.appData.page = -2"></i>
				<Chart :height="150" :materialen="materiaalNamen" :kosten="materiaalKostenGebundeld"/>
			</div>
			<div class="card-body">
				<hr>
				<div class="d-flex">
					<p class="d-inline mr-auto">Materiaalkosten: </p>
					<p class="d-inline ml-auto">€ {{totaleMateriaalKosten}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Opslagpercentage: </p>
					<p class="d-inline ml-auto">€ {{totaleOpslagPercentage}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Indirecte kosten: </p>
					<p class="d-inline ml-auto">€ {{indirecteKosten}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Loonkosten: </p>
					<p class="d-inline ml-auto">€ {{loonKosten}}</p>
				</div>
				<hr class="mt-2">
				<div class="d-flex">
					<p class="d-inline mr-auto">Totale kosten: </p>
					<p class="d-inline ml-auto">€ {{totaleKosten}}</p>
				</div>
				<div class="d-flex">
					<p class="d-inline mr-auto">Winstopslag: </p>
					<p class="d-inline ml-auto">€ {{winstopslag}}</p>
				</div>
				<hr>
				<div class="d-flex">
					<p class="d-inline mr-auto">Verkoopprijs incl BTW: </p>
					<p class="d-inline ml-auto">€ {{verkoopPrijsInclBtw}}</p>
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
	import Chart from './Chart-materialcost'

	export default {
		name: "DashboardMaterialCost",
		components:{
			Chart
		},
		data(){
			return{
			}
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
			planningOpties()			{ return this.$store.state.werkvoorbereiding.planningOpties },
			materiaalOpties()			{ return this.$store.state.werkvoorbereiding.materiaalOpties },
			opslagpercentageMassief()	{ return Number(this.materiaalOpties.opslagpercentageMassief) },
			opslagpercentagePlaat()		{ return Number(this.materiaalOpties.opslagpercentagePlaat) },
			overlengteZijde()			{ return Number(this.materiaalOpties.overlengteZijdes) },
			overlengteKops()			{ return Number(this.materiaalOpties.overlengteKops) },
			overlengteLangs()			{ return Number(this.materiaalOpties.overlengteLangs) },
			maten(){
				if(this.$store.state.werkvoorbereiding.maten){
					return this.$store.state.werkvoorbereiding.maten
				}
			},
			materialenMassief(){
				if(this.$store.state.werkvoorbereiding.materialen){
					if(this.$store.state.werkvoorbereiding.materialen.massief != undefined){
						return this.$store.state.werkvoorbereiding.materialen.massief
					}
				}
				return []

			},
			materialenPlaat(){
				if(this.$store.state.werkvoorbereiding.materialen){
					if(this.$store.state.werkvoorbereiding.materialen.plaatmateriaal  != undefined){
						return this.$store.state.werkvoorbereiding.materialen.plaatmateriaal
					}
				}
				return []
			},
			materialenFineer(){
				if(this.$store.state.werkvoorbereiding.materialen){
					if(this.$store.state.werkvoorbereiding.materialen.fineer != undefined){
						return this.$store.state.werkvoorbereiding.materialen.fineer
					}
				}
				return []
			},
			materialenOverig(){
				if(this.$store.state.werkvoorbereiding.overigematerialen){
					return this.$store.state.werkvoorbereiding.overigematerialen
				}else{
					return false
				}
			},
			OverigeMaterialenKosten(){
				if(this.materialenOverig){
					let prijs = 0
					for (const materiaal of this.materialenOverig) {
						prijs += Number(materiaal.prijs) * Number(materiaal.aantal)
					}
					return prijs
				}else{
					return 0
				}
			},
			materiaalNamen(){
				let alleMaterialen = []
				for (const materiaal of this.materialenMassief) {
					alleMaterialen.push(materiaal.naam)
				}
				for (const materiaal of this.materialenPlaat) {
					alleMaterialen.push(materiaal.naam)
				}
				for (const materiaal of this.materialenFineer) {
					alleMaterialen.push(materiaal.naam)
				}
				if(this.materialenOverig){
					alleMaterialen.push('Overige materialen')
				}
				return alleMaterialen
			},
			materiaalKostenMassief(){
				let kosten = []
				// Massief
				if(this.maten && this.materialenMassief){
					for (const materiaal of this.materialenMassief) {
						let prijsMassief = 0
						for (const maat of this.maten) {
							if(materiaal.naam === maat.materiaal){
								let lengte = Number(maat.lengte) + this.overlengteKops
								let breedte = Number(maat.breedte) + this.overlengteLangs
								let dikte = Number(maat.dikte)
								let inhoud = lengte * breedte * dikte / 1000000000 
								prijsMassief += inhoud * Number(materiaal.prijs) * Number(maat.aantal)
							}
						}
						kosten.push(Number(prijsMassief.toFixed(2)))
					}
				}
				return kosten
			},
			materiaalKostenPlaat(){
				let kosten = []
				// Plaatmateriaal
				if(this.maten && this.materialenPlaat){
					for (const materiaal of this.materialenPlaat) {
						let prijsPlaat = 0
						for (const maat of this.maten) {
							if(materiaal.naam === maat.materiaal){
								let lengte = Number(maat.lengte) + this.overlengteZijde
								let breedte = Number(maat.breedte) + this.overlengteZijde
								let oppervlakte = lengte * breedte / 1000000 
								prijsPlaat += oppervlakte * Number(materiaal.prijs) * Number(maat.aantal)
							}
						}
						kosten.push(Number(prijsPlaat.toFixed(2)))
					}
				}
				return kosten
			},
			materiaalKostenFineer(){
				let kosten = []
				// Fineer
				if(this.maten && this.materialenFineer){
					for (const materiaal of this.materialenFineer) {
						let prijsFineer = 0
						for (const maat of this.maten) {
							if(materiaal.naam === maat.materiaal){
								let lengte = Number(maat.lengte) + this.overlengteZijde
								let breedte = Number(maat.breedte) + this.overlengteZijde
								let oppervlakte = lengte * breedte / 1000000 
								prijsFineer += oppervlakte * Number(materiaal.prijs) * Number(maat.aantal)
							}
						}
						kosten.push(prijsFineer)
					}
				}
				return kosten
			},
			materiaalKostenGebundeld(){
				let alleMaterialen = []		
				return alleMaterialen.concat(this.materiaalKostenMassief, this.materiaalKostenPlaat, this.materiaalKostenFineer, this.OverigeMaterialenKosten)
			},
			totaleMateriaalKosten(){
				if(this.materiaalKostenGebundeld){
					return Number(this.materiaalKostenGebundeld.reduce((a, b) => a + b, 0).toFixed(2));
				}else{
					return 0
				}
			},
			totaleOpslagPercentage(){
				let opslagpercentage = 0

				// Massief
				for (const kosten of this.materiaalKostenMassief) {
					opslagpercentage += kosten/100*this.opslagpercentageMassief
				}
				// plaat
				for (const kosten of this.materiaalKostenPlaat) {
					opslagpercentage += kosten/100*this.opslagpercentagePlaat
				}

				return Number(opslagpercentage.toFixed(2));
			},
			indirecteKosten(){
				if(this.planningOpties){
					return Number(this.planningOpties.indirecteKosten)
				}else{
					return 0
				}
			},
			loonKosten(){
				if(this.planningOpties){
					return Number((this.$store.state.dashboard.aantalUren * Number(this.planningOpties.uurtarief)).toFixed(2));
				}else{
					return 0
				}
			},
			totaleKosten(){
				if(this.planningOpties){
					return Number((this.totaleMateriaalKosten + this.totaleOpslagPercentage + this.indirecteKosten + this.loonKosten).toFixed(2));
				}else{
					return 0
				}
			},
			winstopslag(){
				if(this.planningOpties){
					return Number((this.totaleKosten / 100 * Number(this.planningOpties.winstOpslag)).toFixed(2))
				}else{
					return 0
				}
			},
			verkoopPrijsExclBtw(){
				return this.totaleKosten + this.winstopslag
			},
			verkoopPrijsInclBtw(){
				if(this.planningOpties){
					let verkoopPrijsInclBtw = Number((this.verkoopPrijsExclBtw + (this.verkoopPrijsExclBtw / 100 * Number(this.planningOpties.btwTarief))).toFixed(2))
					this.$store.state.dashboard.verkoopPrijsInclBtw = verkoopPrijsInclBtw
					return verkoopPrijsInclBtw
				}else{
					return 0
				}
			},
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