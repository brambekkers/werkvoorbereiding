<script>
	import {HorizontalBar} from 'vue-chartjs'

	export default {
		extends: HorizontalBar,
		props: ["uren"],
		data(){
			return {
				chartData: {
					labels: ['Voorbereiding', 'Machinale', 'Werkplaats', 'Plaatsen', 'Administratie'],
					datasets: [{
						label: 'Werktijd',
						backgroundColor: ['#FD9A14','#4CAF50','#E91E63','#d0e81e','#555555'],
						data: this.uren
					}]
				},
				options: {
					legend: {
						display: false,
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