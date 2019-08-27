<template>
	<div class="col-xl-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-danger card-header-icon">
				<div class="card-icon">
					<i class="far fa-clock"></i>
				</div>
				<p class="card-category">Werkdagen</p>
				<h4 class="card-title">{{dashboard.aantalWerkdagen}}
					<small>dagen</small>
				</h4>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons far fa-calendar-alt mr-2"></i>
					<a><strong>Berekend over: </strong> {{aantalPlanningen}} stappen</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardWorkdays",
	computed: {
		dashboard() {
			return this.$store.getters.dashboard;
		},
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		planningStappenArray() {
			let array = [];
			for (const planning of this.werkvoorbereiding.planning) {
				if (planning.stap) {
					for (const stap of planning.stappen) {
						array.push(stap);
					}
				}
			}
			return array;
		},
		aantalPlanningen() {
			if (this.werkvoorbereiding.planning) {
				return this.planningStappenArray.length;
			} else {
				return 0;
			}
		}
	}
};
</script>


<style scoped>
</style>