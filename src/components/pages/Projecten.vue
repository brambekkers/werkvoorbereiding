<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center" allewvb="">
				<div class="col-md-12">
					<div class="card">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Projecten</h3>
							<p class="card-category">Kies een project waarmee je verder wilt gaan.</p>
						</div>
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
									<tr v-bind:key="index" v-for="(project, index) in projecten" @click="selectWvb(index)" :class="{ selected: (index === selectedWvb) }">
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
	export default {
		name: "Projecten",
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
			}
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
					swal({
						title: "Weet je het zeker?",
						text: "Wanneer je deze werkvoorbereiding verwijderd kun je het niet meer terughalen!",
						icon: "warning",
						buttons: true,
						dangerMode: true,
					})
					.then((willDelete) => {
						if (willDelete) {
							swal("Poof! Je werkvoorbereiding is verwijderd!", {
								icon: "success",
							});
							let fb = this.$store.state.appData.firebase
							let userId = fb.auth().currentUser.uid;
							let userDatabase = fb.database().ref(`users/${userId}/`);

							// remove wvb
							fb.database().ref(`users/${userId}/alleWVB/${this.wvbId}`).remove();
							this.$store.state.werkvoorbereiding = null

							this.selectedWvb = null
						} else {
							swal("Je werkvoorbereiding is niet verwijderd!");
						}
					});

				}else{
					swal("Er is geen werkvoorbereiding geselecteerd!");
				}
				
			},
			newWvb() {
				this.$store.state.werkvoorbereiding = null
				this.selectedWvb = null
				this.$store.state.appData.page = 1
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
</style>