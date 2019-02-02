<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<form role="form" @submit.prevent="nextStep()">
						<div class="card">
							<CardHeader :text="{title: 'Basisgegevens', subtitle: 'De eerste stap...' }"/>
							<div class="card-body">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-tag fa-fw"></i></span></div>
									<input type="text" placeholder="Project" data-toggle="tooltip" data-placement="right" required="required"
									 class="form-control" data-original-title="Wat is de naam van je project?" v-model="basisgegevens.project">
								</div>
								<hr>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-user fa-fw"></i></span></div>
									<input type="text" placeholder="Voor en achternaam" data-toggle="tooltip" data-placement="right" required="required"
									 class="form-control" data-original-title="Vul hier jouw eigen naam in" v-model="basisgegevens.naam">
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-graduation-cap fa-fw"></i></span></div>
									<input type="text" placeholder="Klas" data-toggle="tooltip" data-placement="right" required="required" class="form-control"
									 data-original-title="In welke klas zit je?" v-model="basisgegevens.klas">
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-university fa-fw"></i></span></div>
									<input type="text" placeholder="Docent" data-toggle="tooltip" data-placement="right" required="required" class="form-control"
									 data-original-title="Van wie krijg je les?" v-model="basisgegevens.docent">
								</div>
							</div>
						</div>
						<button type="submit" class="btn btn-lg btn-block">Start de werkvoorbereiding</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import WVB from "../../assets/config/emptyWVB.js"
	import uniqid from 'uniqid';
	import CardHeader from "./attributes/Card-header.vue";

	export default {
		name: "Gegevens",
		components: { CardHeader },
		data() {
			return {
				basisgegevens: {
					docent: "",
					klas: "",
					naam: "",
					project: ""
				},
				newWVB: WVB
			}
		},
		computed: {
			wvbActive(){
				if(this.werkvoorbereiding){
					if(Object.keys(this.werkvoorbereiding).length > 0){
						return true
					}
				}
				return false
			},
			werkvoorbereiding(){
				return this.$store.state.werkvoorbereiding
			}	
		},
		methods: {
			updateGegevens(){
				if(this.wvbActive){
					this.basisgegevens = this.werkvoorbereiding.basisgegevens
				}
			},
			nextStep(){
				if(this.wvbActive){
					
				}else{
					this.createNewWVB()
				}
				this.$store.state.appData.page++
			},
			createNewWVB(){
				let d = new Date()
				let date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`

				this.newWVB.basisgegevens = this.basisgegevens
				this.newWVB.id = `WVB_${uniqid()}`
				this.newWVB.aangemaaktOp = date
				this.newWVB.stap = 2


				this.$store.state.werkvoorbereiding = this.newWVB
			}
		},
		created() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			})
			this.updateGegevens()
		}
	};
</script>


<style scoped>

</style>