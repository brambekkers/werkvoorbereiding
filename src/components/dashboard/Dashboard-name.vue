<template>
	<div class="col-xl-6 col-md-12">
		<div class="card card-stats">
			<div class="card-header">
				<h4 class="mb-0 font-weight-bold">Project: {{werkvoorbereiding.basisgegevens.project}}</h4>
				<hr class="my-0">
				<div class="d-flex justify-content-between mt-2">
					<p class="mb-0">Naam: </p>
					<p class="mb-0"> {{werkvoorbereiding.basisgegevens.naam}}</p>
				</div>
				<div class="d-flex justify-content-between mt-2">
					<p class="mb-0">Klas: </p>
					<p class="mb-0"> {{werkvoorbereiding.basisgegevens.klas}}</p>
				</div>
				<div class="d-flex justify-content-between mt-2">
					<p class="mb-0">Docent: </p>
					<p class="mb-0"> {{werkvoorbereiding.basisgegevens.docent}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardPrice",
	props: ["werkvoorbereiding"]
};
</script>


<style scoped>
</style>