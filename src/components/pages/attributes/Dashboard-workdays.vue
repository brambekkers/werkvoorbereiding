<template>
	<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-danger card-header-icon">
				<div class="card-icon">
					<i class="far fa-clock"></i>
				</div>
				<p class="card-category">Aantal werkdagen</p>
				<h3 class="card-title">{{aantalWerkdagen}}
					<small>dagen</small>
				</h3>
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
		name: "DashboardWorkdays",
		computed: {
			aantalWerkdagen(){
				return this.$store.state.dashboard.aantalWerkdagen
			}
		}
	};
</script>


<style scoped>

</style>