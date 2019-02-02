<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-8">
						<div class="card">
							<CardHeader :text="{title: 'Over', subtitle: 'Wat, wie en hoe' }"/>
							<div class="card-body">
								<div class="row">
									<div class="col-12">
										<h4>deWerkvoorbereider</h4>
										<p>De deWerkvoorbereider.nl is een online rekenprogramma ten behoeve van de werkvoorbereiding.</p>

										<table class="table table-borderless">
											<thead>
												<tr>
													<th style="width: 25%">Algemene informatie</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th>Maker: </th>
													<td>Bram Bekkers</td>
												</tr>
												<tr>
													<th>Contact: </th>
													<td>info@deWerkvoorbereider.nl</td>
												</tr>

											</tbody>
										</table>

										<table class="table table-borderless">
											<thead>
												<tr>
													<th style="width: 25%">Technische informatie</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<th>Versie: </th>
													<td>2.0.1</td>
												</tr>
												<tr>
													<th>Laatst bijgewerkt: </th>
													<td>30-01-2019</td>
												</tr>
												<tr>
													<th>Gebouwd met: </th>
													<td><strong>Javascript:</strong> VueJs <br>
														<strong>CSS:</strong> Bootstrap (Creative-Tim)<br>
														<strong>Database:</strong> Google Firebase
													</td>
												</tr>
											</tbody>
										</table>
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
		name: "Over",
		components: { CardHeader },
		computed: {}
	};
</script>


<style scoped>
</style>