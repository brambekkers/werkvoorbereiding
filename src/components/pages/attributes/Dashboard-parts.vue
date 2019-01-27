<template>
	<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-success card-header-icon">
				<div class="card-icon">
					<i class="fas fa-th"></i>
				</div>
				<p class="card-category">Aantal onderdelen</p>
				<h3 class="card-title">{{onderdelen}}</h3>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons text-danger">warning</i>
					<a href="#pablo">Get More Space...</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DashboardParts",
		data() {
			return {}
		},
		computed: {
			onderdelen(){
				if(this.$store.state.werkvoorbereiding.maten){
					return this.$store.state.werkvoorbereiding.maten.length
				}else{
					return 0
				}
			}
		}
	};
</script>


<style scoped>

</style>