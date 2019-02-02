<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-8">
						<div class="card">
							<CardHeader :text="{title: 'Licentie', subtitle: 'Hoe ga je om met de inhoud...' }"/>
							<div class="card-body">
								<div class="row">
									<div class="col-12">
										<h4>Copyright {{jaar}} ©</h4>
										<p>Alle rechten zijn voorbehouden.</p> 
										<p>Buiten de uitkomsten van een individuele werkvoorbereiding (het exporteren van persoonlijke uitkomsten) mag niets op deze website gepubliceerde gegevens worden verveelvoudigd, opgeslagen in een geautomatiseerd gegevensbestand en/of openbaar worden gemaakt, in enige vorm of op enige wijze, hetzij elektronisch, mechanisch, door fotokopieën, opnamen of enige andere manier, zonder uitdrukkelijke voorafgaande schriftelijke toestemming van deWerkvoorbereider. Ook het gebruik van merk- en productnamen van deWerkvoorbereider in op zoekmachines gerichte teksten is niet toegestaan.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import CardHeader from "./attributes/Card-header.vue";
	export default {
		name: "Licence",
		components: { CardHeader },
		computed:{
			jaar(){
				return new Date().getFullYear()
			}
		}
	};
</script>


<style scoped>
</style>