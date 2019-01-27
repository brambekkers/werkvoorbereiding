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
						backgroundColor: '#555555',
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