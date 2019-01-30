<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-xl-7 col-xxl-6 col-xxxl-4">
					<div class="card">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Statistieken</h3>
							<p class="card-category">Alle informatie over jouw account</p>
						</div>
						<hr class="my-0">
						<div class="card-body">
							<h6 class="title"><strong>Werkvoorbereiding</strong>
								<hr class="my-0">
							</h6>
							<div class="row mb-4">
								<div class="col-6">
									<p class="col-form-label">Aantal projecten</p>
								</div>
								<div class="col-6">
									<input type="text" readonly="readonly" class="form-control-plaintext form-control-sm text-right" v-model="amountWvb">
								</div>
								<div class="col-6">
									<p class="col-form-label">Huidig project</p>
								</div>
								<div class="col-6">
									<input type="text" readonly="readonly" class="form-control-plaintext form-control-sm text-right" v-model="currentWerkvoorbereiding">
								</div>
							</div>
							<h6 class="title col-form-label"><strong>Profiel</strong>
								<hr class="my-0">
							</h6>
							<div class="row mb-4">
								<div class="col-6">
									<p class="col-form-label">ID</p>
								</div>
								<div class="col-6">
									<input type="text" readonly="readonly" class="form-control-plaintext form-control-sm text-right" v-if="currentUser" v-model="currentUser.uid">
								</div>
								<div class="col-6">
									<p class="col-form-label">Lid sinds</p>
								</div>
								<div class="col-6">
									<input type="text" readonly="readonly" class="form-control-plaintext form-control-sm text-right" v-if="currentUser" v-model="currentUser.metadata.creationTime">
								</div>
								<div class="col-6">
									<p class="col-form-label">Laatst aangemeld</p>
								</div>
								<div class="col-6">
									<input type="text" readonly="readonly" class="form-control-plaintext form-control-sm text-right" v-if="currentUser" v-model="currentUser.metadata.lastSignInTime">
								</div>
							</div>
							<div class="row mb-0"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Statistieken",
		computed: {
			userData(){
				return this.$store.state.userData
			},
			amountWvb(){
				if(this.userData){
					return Object.values(this.userData.alleWVB).length
				}else{
					return 0
				}
			},
			wvbActive(){
				if(this.werkvoorbereiding){
					if(Object.keys(this.werkvoorbereiding).length > 0){
						return true
					}
				}
				return false
			},
			currentWerkvoorbereiding(){
				if(this.wvbActive){
					return this.$store.state.werkvoorbereiding.basisgegevens.project
				}
			},
			currentUser(){
				let currentUser = this.$store.state.appData.firebase.auth().currentUser
				return currentUser
			}

		}

	};
</script>


<style scoped>


</style>