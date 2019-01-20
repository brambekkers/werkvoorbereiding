<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5 col-xxl-4 col-xxxl-3">
					<form role="form" @submit.prevent="nextStep()">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Basisgegevens</h3>
								<p class="card-category">De eerste stap...</p>
							</div>
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

	export default {
		name: "Gegevens",
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
			werkvoorbereiding(){
				return this.$store.state.werkvoorbereiding
			}	
		},
		methods: {
			updateGegevens(){
				if(this.werkvoorbereiding.id){
					this.basisgegevens = this.werkvoorbereiding.basisgegevens
				}
			},
			nextStep(){
				if(this.werkvoorbereiding.id){
					
				}else{
					this.createNewWVB()
				}
				this.$store.state.appData.page++
			},
			createNewWVB(){
				let d = new Date()
				let date = `${d.getDay()}-${d.getMonth()}-${d.getYear()} ${d.getHours()}.${d.getMinutes()}`

				this.newWVB.basisgegevens = this.basisgegevens
				this.newWVB.id = `WVB_${uniqid()}`
				this.newWVB.aangemaaktOp = date


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