<template>
	<div class="col-xl-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-info card-header-icon">
				<div class="card-icon">
					<i class="fas fa-euro-sign"></i>
				</div>
				<p class="card-category">Verkoopprijs</p>
				<h4 class="card-title">{{verkoopprijs}}
					<small>euro</small>
				</h4>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="far fa-clock material-icons mr-2"></i>
					<a><strong>Geüpdatet:</strong> {{laatsteWijziging}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DashboardPrice",
		computed: {
			verkoopprijs(){
				return this.$store.state.dashboard.verkoopPrijsInclBtw
			},
			laatsteWijziging(){
				if(this.$store.state.werkvoorbereiding.laatsteBewerking){
					let string = this.$store.state.werkvoorbereiding.laatsteBewerking.split(" ");
					return this.$store.state.werkvoorbereiding.laatsteBewerking
				}else{
					return false
				}

			}
		}
	};
</script>


<style scoped>
</style>