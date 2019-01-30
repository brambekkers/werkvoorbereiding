<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Materialen</h3>
								<p class="card-category">Waar ga je het van maken</p>
							</div>
							<div class="card-body">


								<!-- Massief hout -->
								<h6 class="title mb-2"><strong>Massief hout</strong></h6>
								<div class="row" v-bind:key="'massief'+index" v-for="(massief, index) in materialen.massief">
									<div class="col-md-7">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span id="basic-addon1" class="input-group-text">
													<i class="fa fa-leaf fa-fw"></i>
												</span>
											</div>
											<input type="text" placeholder="Massief houtsoort" data-toggle="tooltip" data-placement="top" title=""
											required="required" class="form-control" 
											data-original-title="Wat is de naam van de houtsoort?" 
											v-model="massief.naam">
										</div>
									</div>
									<div class="col-10 col-md-3">
										<div class="input-group mb-2">
											<input type="number" placeholder="Prijs m3" data-toggle="tooltip"
											 data-placement="top" title="" required="required" class="form-control" 
											 data-original-title="Hoeveel kost deze houtsoort per m3? Bijv. 1800 euro"
											 v-model="massief.prijs">
										</div>
									</div>
									<div class="col-2 col-md-2">
										<div class="input-group mb-2">
											<button type="button" class="btn btn-danger btn-sm" @click="removeComponent('massief', index)">
												<i class="fa fa-trash"></i>
											</button>
										</div>
									</div>
									<div class="col-12 d-block d-md-none">
										<hr>
									</div>
								</div> <button type="button" class="btn" @click="newMaterial('massief')">
									<i class="fa fa-plus mr-3"></i>Nieuw massief
								</button>
								<hr>


								<!-- Plaatmateriaal -->
								<h6 class="title mb-2"><strong>Plaatmateriaal</strong></h6>
								<div class="row" v-bind:key="'plaatmateriaal'+index" v-for="(plaatmateriaal, index) in materialen.plaatmateriaal">
									<div class="col-md-7">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span id="basic-addon1" class="input-group-text">
													<i class="fa fa-square fa-fw"></i>
												</span>
											</div>
											<input type="text" placeholder="Plaatmateriaal naam" data-toggle="tooltip" data-placement="top" title=""
											required="required" class="form-control" 
											data-original-title="Naam van het plaatmateriaal incl de dikte? Bijv. MDF 12mm"
											v-model="plaatmateriaal.naam">
										</div>
									</div>
									<div class="col-10 col-md-3">
										<div class="input-group mb-2">
											<input type="number" placeholder="Prijs m2" data-toggle="tooltip"
											data-placement="top" title="" required="required" class="form-control" 
											data-original-title="Hoeveel kost dit plaatmateriaal per m2?"
											v-model="plaatmateriaal.prijs">
										</div>
									</div>
									<div class="col-2 col-md-2">
										<div class="input-group mb-2">
											<button type="button" class="btn btn-danger btn-sm" @click="removeComponent('plaatmateriaal', index)">
												<i class="fa fa-trash"></i>
											</button>
										</div>
									</div>
									<div class="col-12 d-block d-md-none">
										<hr>
									</div>
								</div> 
								<button type="button" class="btn" @click="newMaterial('plaatmateriaal')">
									<i class="fa fa-plus mr-3"></i>Nieuw plaatmateriaal
								</button>
								<hr>


								<!-- Fineer -->
								<h6 class="title"><strong>Fineer</strong></h6>
								<div class="row" v-bind:key="'fineer'+index" v-for="(fineer, index) in materialen.fineer">
									<div class="col-md-7">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span id="basic-addon1" class="input-group-text">
													<i class="fa fa-tag fa-fw"></i>
												</span>
											</div>
											<input type="text" placeholder="Fineer soort" data-toggle="tooltip" data-placement="top" 
											title="" required="required" class="form-control" 
											 data-original-title="Wat voor fineer is het?"
											 v-model="fineer.naam">
										</div>
									</div>
									<div class="col-10 col-md-3">
										<div class="input-group mb-2"><input type="number" placeholder="Prijs m2" 
										data-toggle="tooltip" data-placement="top" required="required" class="form-control" 
										data-original-title="Hoeveel euro kost dit fineer per m2?"
										v-model="fineer.prijs">
									</div>
									</div>
									<div class="col-2 col-md-2">
										<div class="input-group mb-2">
											<button type="button" class="btn btn-danger btn-sm"  @click="removeComponent('fineer', index)">
												<i class="fa fa-trash"></i>
											</button>
										</div>
									</div>
									<div class="col-12 d-block d-md-none">
										<hr>
									</div>
								</div>
								<button type="button" class="btn" @click="newMaterial('fineer')">
									<i class="fa fa-plus mr-3"></i>Nieuw fineer
								</button>
								<hr>



								<div class="row">
									<div class="col-6"><button type="button" class="btn btn-bg-teal float-left"><i aria-hidden="true" class="far fa-clipboard mr-2"></i>
											Overige materialen </button></div>
									<div class="col-6"><button type="button" class="btn btn-fill float-right" @click.prevent="$store.state.appData.page = -2"><i aria-hidden="true" class="fas fa-edit mr-2"></i>
											Materiaal opties </button></div>
								</div>
							</div>
						</div>


						<div class="row">
							<div class="col-md-6">
								<button type="button" class="btn btn-lg btn-block btn-danger btn-fill" @click="previousStep()">
									<div class="row">
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-left"></i></div>
										<div class="col-10">Vorige stap</div>
									</div>
								</button></div>
							<div class="col-md-6">
								<button type="submit" class="btn btn-lg btn-block btn-bg-teal">
									<div class="row">
										<div class="col-10">Volgende stap</div>
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-right"></i></div>
									</div>
								</button></div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	export default {
		name: "Materialen",
		computed: {
			materialen() {
				return this.$store.state.werkvoorbereiding.materialen
			}
		},
		methods: {
			newMaterial(naam) {
				if(!this.materialen[naam]){
					this.$set(this.$store.state.werkvoorbereiding.materialen, naam, [])
				}

				this.$store.state.werkvoorbereiding.materialen[naam].push({
					naam: "",
					prijs: ""
				})
			},
			removeComponent(naam, i) {
				this.$store.state.werkvoorbereiding.materialen[naam].splice(i, 1)
			},
			previousStep() {
				this.$store.state.appData.page--
			},
			nextStep() {
				this.$store.state.appData.page++
				if(this.$store.state.appData.page > this.$store.state.werkvoorbereiding.stap){
					this.$store.state.werkvoorbereiding.stap = this.$store.state.appData.page
				}
			}
		},
		created() {
			$(function () {
				$('[data-toggle="tooltip"]').tooltip()
			})
		}
	};
</script>


<style scoped>

</style>