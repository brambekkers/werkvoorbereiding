<script>
	import {HorizontalBar} from 'vue-chartjs'

	export default {
		extends: HorizontalBar,
		props: ["uren"],
		mounted() {
			// Overwriting base render method with actual data.
			this.renderChart({
				labels: ['Voorbereiding', 'Machinale', 'Werkplaats', 'Plaatsen', 'Administratie'],
				datasets: [{
					label: 'Werktijd',
					backgroundColor: '#555555',
					data: this.uren
				}],
				
			})
		}
	}
</script>


<style scoped>

</style>