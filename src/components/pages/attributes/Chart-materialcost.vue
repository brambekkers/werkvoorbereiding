<script>
	// Load complete module with all charts
	import {
		Doughnut
	} from 'vue-chartjs'

	export default {
		extends: Doughnut,
		props: ["materialen", "kosten"],
		data(){
			return {
				chartData: {
					labels: this.materialen,
					datasets: [{
						label: 'Materiaalkosten',
						backgroundColor: ['#00BCD4','#9C27B0','#4CAF50','#E91E63','#1ee8a8','#d0e81e','#555555','#F44399','#88a0c9',],
						data: this.kosten,
					}],
				},
				options: {
					legend: {
						position: 'left',
					}
				}
			}
		},
		mounted() {
			// Overwriting base render method with actual data.
			this.renderChart(this.chartData, this.options)
		}
	}
</script>


<style scoped>

</style>