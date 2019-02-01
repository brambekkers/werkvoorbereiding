<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-8">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Licentie</h3>
								<p class="card-category">Hoe ga je om met de inhoud...</p>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-12">
										<h4>Copyright {{jaar}} ©</h4>
										<p>Alle rechten zijn voorbehouden. Buiten de uitkomsten van een individuele werkvoorbereiding (het exporteren van persoonlijke uitkomsten) mag niets op deze website gepubliceerde gegevens worden verveelvoudigd, opgeslagen in een geautomatiseerd gegevensbestand en/of openbaar worden gemaakt, in enige vorm of op enige wijze, hetzij elektronisch, mechanisch, door fotokopieën, opnamen of enige andere manier, zonder uitdrukkelijke voorafgaande schriftelijke toestemming van deWerkvoorbereider. Ook het gebruik van merk- en productnamen van deWerkvoorbereider in op zoekmachines gerichte teksten is niet toegestaan.</p>
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
	export default {
		name: "Licence",
		computed:{
			jaar(){
				return new Date().getFullYear()
			}
		}
	};
</script>


<style scoped>
</style>