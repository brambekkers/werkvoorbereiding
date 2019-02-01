<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4 ">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Overige materialen</h3>
								<p class="card-category">Alles wat geen hout is</p>
							</div>
							<div class="card-body">
								<div class="row" v-bind:key="index" v-for="(materiaal, index) in overigeMaterialen">
									<div class="col-md-6">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span class="input-group-text"><i class="fa fa-tag fa-fw"></i></span>
											</div>
											<input type="text" placeholder="Materiaal naam" data-toggle="tooltip" data-placement="top" title="" required="required"
											 class="form-control" data-original-title="Wat is de naam van het component?" 
											 v-model="materiaal.naam">
										</div>
									</div>
									<div class="col-6 col-md-2">
										<div class="input-group mb-2">
											<money 	placeholder="Prijs" 
													data-toggle="tooltip" 
													data-placement="top" 
													min="1" 
													required="required" 
													class="form-control" 
													data-original-title="Wat kost één onderdeel van dit product?"
											 		v-model="materiaal.prijs" 
													v-bind="money">
											</money>
										</div>
									</div>
									<div class="col-3 col-md-2">
										<div class="input-group mb-2">
											<input 	type="number" 
													placeholder="Aantal" 
													data-toggle="tooltip" 	
													data-placement="top" 
													min="1"											 
													required="required" 	
													class="form-control" 
													data-original-title="Hoe vaak komt dit materiaal voor in het project?"
											 		v-model="materiaal.aantal">
										</div>
									</div>
									<div class="col-2 col-md-2">
										<div class="input-group mb-2"><button type="button" class="btn btn-sm btn-danger" @click="removeMateriaal(index)"><i
												 class="fa fa-trash"></i></button></div>
									</div>
									<div class="col-12 d-block d-md-none">
										<hr>
									</div>
								</div>
								<hr>
								<button type="button" class="btn" @click="newMateriaal()"><i class="fa fa-plus mr-3"></i>Nieuw materiaal
								</button>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-lg btn-block btn-danger">
									Terug
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import $ from "jquery";
	import {Money} from 'v-money'

	export default {
		name: "OverigeMaterialen",
		components: {Money},
		data(){
			return{
				money: {
					decimal: '.',
					thousands: ',',
					prefix: '€ ',
					suffix: '',
					precision: 2,
					masked: false
				}
			}
		},
		computed: {
			overigeMaterialen() {
				return this.$store.state.werkvoorbereiding.overigematerialen
			}
		},
		methods: {
			newMateriaal() {
				if (!this.$store.state.werkvoorbereiding.componenten) {
					this.$set(this.$store.state.werkvoorbereiding, 'overigematerialen', [])
				}

				this.$store.state.werkvoorbereiding.overigematerialen.push({
					aantal: "",
					naam: "",
					prijs: ""
				})
			},
			removeMateriaal(i) {
				this.$store.state.werkvoorbereiding.overigematerialen.splice(i, 1)
			},
			nextStep() {
				this.$store.state.appData.page = 3
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