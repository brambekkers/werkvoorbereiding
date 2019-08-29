<template>
	<div class="col-xl-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-warning card-header-icon">
				<div class="card-icon">
					<i class="fas fa-wrench"></i>
				</div>
				<p class="card-category">Fav. gereedschap</p>
				<h4 class="card-title">{{mostUsedTool}}</h4>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons fas fa-tools mr-2"></i>
					<a><strong>Aantal gereedschappen: </strong> {{aantalTools}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardTool",
	computed: {
		getPlanning() {
			return this.$store.getters.werkvoorbereidingsObject("planning");
		},
		countTools() {
			if (this.getPlanning) {
				let count = {};
				for (const planning of this.getPlanning) {
					if (planning.stappen) {
						for (const stap of planning.stappen) {
							if (count[stap.gereedschap] === undefined) {
								count[stap.gereedschap] = 1;
							} else {
								count[stap.gereedschap]++;
							}
						}
					}
				}
				return Object.keys(count).length ? count : false;
			}
			return false;
		},
		aantalTools() {
			if (this.getPlanning) return Object.keys(this.countTools).length;
			return 0;
		},
		mostUsedTool() {
			if (this.countTools) {
				return Object.keys(this.countTools).reduce((a, b) =>
					this.countTools[a] > this.countTools[b] ? a : b
				);
			}
			return "Nog niets";
		}
	}
};
</script>


<style scoped>
</style>