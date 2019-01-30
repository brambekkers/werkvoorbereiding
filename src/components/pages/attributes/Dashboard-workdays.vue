<template>
	<div class="col-xl-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-danger card-header-icon">
				<div class="card-icon">
					<i class="far fa-clock"></i>
				</div>
				<p class="card-category">Werkdagen</p>
				<h4 class="card-title">{{aantalWerkdagen}}
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
			aantalWerkdagen(){
				return this.$store.state.dashboard.aantalWerkdagen
			},
			planningStappenArray(){
				if(this.$store.state.werkvoorbereiding.planning){
					let array = []
					for (const planning of this.$store.state.werkvoorbereiding.planning) {
						for (const stap of planning.stappen) {
							array.push(stap)
						}
					}
					return array
				}else{
					return false
				}

			},
			aantalPlanningen(){
				if(this.$store.state.werkvoorbereiding.planning){
					return this.planningStappenArray.length
				}else{
					return 0
				}
			}
		}
	};
</script>


<style scoped>
</style>