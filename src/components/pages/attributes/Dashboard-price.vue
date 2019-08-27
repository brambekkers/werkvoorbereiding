<template>
	<div class="col-xl-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-info card-header-icon">
				<div class="card-icon">
					<i class="fas fa-euro-sign"></i>
				</div>
				<p class="card-category">Verkoopprijs</p>
				<h4 class="card-title">
					<small>{{valuta}}</small>
					{{verkoopprijs}}
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
		valuta() {
			return this.$store.getters.valuta;
		},
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		dashboard() {
			return this.$store.getters.dashboard;
		},
		verkoopprijs() {
			return this.dashboard.verkoopPrijsInclBtw;
		},
		laatsteWijziging() {
			if (this.werkvoorbereiding)
				return this.werkvoorbereiding.laatsteBewerking.split(" ")[0];
		}
	}
};
</script>


<style scoped>
</style>