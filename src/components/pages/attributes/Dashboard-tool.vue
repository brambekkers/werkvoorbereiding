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
		data() {
			return {}
		},
		computed: {
			planning(){
				return this.$store.state.werkvoorbereiding.planning
			},
			countTools(){
				if(this.planning){
					let count = {}

					for (const planning of this.planning) {
						if(planning.stappen){
							for (const stap of planning.stappen) {
								if(count[stap.gereedschap] === undefined){
									count[stap.gereedschap] = 1
								}else{
									count[stap.gereedschap]++
								}
							}
						}
					}

					return count
				}
			},
			aantalTools(){
				if(this.planning){
					return Object.keys(this.countTools).length
				}
				else{
					return 0
				}
				
			},
			mostUsedTool(){
				if(this.planning){
					return Object.keys(this.countTools).reduce((a, b) => this.countTools[a] > this.countTools[b] ? a : b);
				}else{
					return 'niets'
				}
			}
		}
	};
</script>


<style scoped>
</style>