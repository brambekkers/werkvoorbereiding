<template>
	<div class="content">
		<div class="container-fluid">
			<form
				role="form"
				@submit.prevent="nextStep()"
			>
				<div class="row justify-content-center">
					<div class="col-xl-8">
						<div class="card">
							<CardHeader :text="{title: 'Over', subtitle: 'Wat, wie en hoe' }" />
							<div class="card-body">
								<div class="row">
									<div class="col-12">
										<h4>De werkvoorbereider</h4>
										<p>De werkvoorbereider.nl is een online rekenprogramma ten behoeve van de werkvoorbereiding. Met deze tool kun je gemakkelijk de tijd en kosten bereken voor het maken van een product. Je krijgt grafisch een mooi inzicht in de kosten en tijd per onderwerp. Dit alles is gemakkelijk te exporteren en te printen.</p>
										<p>Het programma is zo opgezet dat het de gebruiker leert om in stappen na te denken over de werkvoorbereiding. Het idee achter het programma is om inzicht en kennis te vergaren over het opzetten van een prijsberekening en planning.</p>
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
													<td>2.8.4</td>
												</tr>
												<tr>
													<th>Laatst bijgewerkt: </th>
													<td>30-08-2019</td>
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
import CardHeader from "@/components/Card-header.vue";

export default {
	name: "Over",
	components: { CardHeader },
	computed: {}
};
</script>


<style scoped>
</style>