<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center" allewvb="">
				<div class="col-md-12">
					<div class="card">
						<CardHeader :text="{title: 'Projecten', subtitle: 'Kies een project waarmee je verder wilt gaan.' }"/>
						<div class="row mt-3 mx-3 justify-content-center">
							<div class="col-md-4 text-center"><button class="btn btn-fill btn-block" @click="newWvb()">Nieuw project</button></div>
							<div class="col-4 text-center"></div>
							<div class="col-md-4 text-center"><button class="btn btn-fill btn-danger btn-block" @click="deleteWvb()">Verwijder
									project</button></div>
						</div>
						<hr class="mb-0">
						<div class="card-body table-responsive">
							<table class="table table-hover table-striped" v-if="projecten">
								<thead>
									<tr>
										<th style="width: 5%;">#</th>
										<th style="width: 30%;">Project naam</th>
										<th style="width: 15%;">Aantal componenten</th>
										<th style="width: 15%;">Aantal onderdelen</th>
										<th style="width: 15%;">Aantal handelingen</th>
										<th style="width: 30%;">Laatste wijziging</th>
									</tr>
								</thead>
								<tbody>
									<tr v-bind:key="index" v-for="(project, index) in projecten" @click="selectWvb(index)" :class="selectedColor(index)">
										<td>{{index+1}}</td>
										<td>{{project.basisgegevens.project}}</td>
										<td>{{aantalComponenten(index)}}</td>
										<td>{{aantalOnderdelen(index)}}</td>
										<td>{{aantalHandelingen(index)}}</td>
										<td>{{project.laatsteBewerking}}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CardHeader from "./attributes/Card-header.vue";
	import Swal from 'sweetalert2'

	export default {
		name: "Projecten",
		components: { CardHeader },
		data() {
			return {
				selectedWvb: null,
			}
		},
		computed: {
			projecten() {
				if (this.$store.state.userData.alleWVB) {
					return Object.values(this.$store.state.userData.alleWVB)	
				}else{
					return false
				}
			},
			werkvoorbereiding() {
				return this.$store.state.werkvoorbereiding
			},
			wvbId() {
				if (this.werkvoorbereiding) {
					return this.$store.state.werkvoorbereiding.id
				}
			},
			instellingen() 	{ return this.$store.state.appData.instellingen },
			userColor()		{ 
				if(this.instellingen.kleur){
					return this.$store.state.appData.instellingen.kleur
				}else{
					return 'groen'
				}
			},
		},
		methods: {
			selectWvb(i) {
				this.selectedWvb = i
				this.$store.state.werkvoorbereiding = this.projecten[i]
			},
			lastWvbSelect() {
				if (this.wvbId) {
					for (let i = 0; i < this.projecten.length; i++) {
						if (this.projecten[i].id === this.wvbId) {
							this.selectedWvb = i
						}
					}
				} else {
					if (this.selectedWvb === null && this.projecten.length) {
						let i = this.projecten.length - 1
						this.selectWvb(i)
					}
				}
			},
			aantalComponenten(i) {
				if (this.projecten[i].componenten) {
					return this.projecten[i].componenten.length
				} else {
					return 0
				}
			},
			aantalOnderdelen(i) {
				if (this.projecten[i].maten) {
					return this.projecten[i].maten.length
				} else {
					return 0
				}
			},
			aantalHandelingen(i) {
				let count = 0
				if (this.projecten[i].planning) {
					for (const plan of this.projecten[i].planning) {
						if (plan.stappen) {
							for (const iterator of plan.stappen) {
								count++
							}
						}
					}
				}
				return count
			},
			deleteWvb() {
				if(this.werkvoorbereiding){
					Swal.fire({
						title: "Weet je het zeker?",
						text: "Wanneer je deze werkvoorbereiding verwijderd kun je het niet meer terughalen!",
						confirmButtonColor: '#F33527',
						confirmButtonText: 'Ik weet het zeker!',
						showCancelButton: true,
						type: "warning",
					})
					.then((result) => {
						if (result.value) {
							Swal.fire({
								text: "Poof! Je werkvoorbereiding is verwijderd!", 
								type: "success",
							});
							let fb = this.$store.state.appData.firebase
							let userId = fb.auth().currentUser.uid;
							let userDatabase = fb.database().ref(`users/${userId}/`);

							// remove wvb
							fb.database().ref(`users/${userId}/alleWVB/${this.wvbId}`).remove();
							this.$store.state.werkvoorbereiding = null

							this.selectedWvb = null
						}
					});

				}else{
					Swal.fire({
						text: "Er is geen werkvoorbereiding geselecteerd!", 
						type: "warning",
					});
				}
				
			},
			newWvb() {
				this.$store.state.werkvoorbereiding = null
				this.selectedWvb = null
				this.$store.state.appData.page = 1
			},
			selectedColor(index){
				if(index === this.selectedWvb){ 
					return this.userColor
				} 
			}
		},
		mounted() {
			this.lastWvbSelect();
		}

	};
</script>


<style scoped>
	.table thead tr th {
		font-size: 1em;
		font-weight: 400;
	}

	.table tbody tr {
		cursor: pointer;
	}

	.selected {
		background: linear-gradient(60deg, #66bb6a, #43a047);
	}

	.roze{
		background-color: #e91e63;
		background: linear-gradient(60deg, #d65a84, #e91e63);
		webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(233, 30, 99, 0.4);
	}

	.rood{
		background: linear-gradient(60deg, #ef5350, #e53935);
		webkit-box-shadow:  0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(244, 67, 54, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(244, 67, 54, 0.4);
	}

	.geel{
		background: linear-gradient(60deg, #ffa726, #fb8c00);
		webkit-box-shadow:  0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(255, 152, 0, 0.4);
	}

	.groen{
		background: linear-gradient(60deg, #66bb6a, #43a047);
		webkit-box-shadow:  0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(76, 175, 80, 0.4);
	}

	.blauw{
		background: linear-gradient(60deg, #26c6da, #00acc1);
		webkit-box-shadow:  0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 188, 212, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 188, 212, 0.4);
	}

	.paars{
		background: linear-gradient(60deg, #ab47bc, #8e24aa);
		webkit-box-shadow:  0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(156, 39, 176, 0.4);
	}

	.grijs{
		background: linear-gradient(60deg, #858585, #575757);
		webkit-box-shadow:  0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(163, 163, 163, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(163, 163, 163, 0.4);
	}
</style>