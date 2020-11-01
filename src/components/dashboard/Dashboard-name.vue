<template>
	<div class="col-xl-6 col-md-12">
		<div class="card card-stats">
			<div class="card-header">
				<h4 class="mb-0 font-weight-bold">
					Project: {{ werkvoorbereiding.basisgegevens.project }}
				</h4>
				<hr class="my-0" />
				<template v-for="(value, key) in werkvoorbereiding.basisgegevens">
					<div
						class="d-flex justify-content-between mt-2"
						:key="key"
						v-if="value && key != 'project'"
					>
						<p class="mb-0 capital">{{ key }}:</p>
						<p class="mb-0 capital">{{ value }}</p>
					</div>
				</template>
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
.capital {
	text-transform: capitalize;
}
</style>
