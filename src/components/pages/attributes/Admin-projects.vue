<template>
	<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-warning card-header-icon">
				<div class="card-icon">
					<i class="fas fa-copy"></i>
				</div>
				<p class="card-category">Aantal WVB's</p>
				<h3 class="card-title">{{aantalWVBs}}
				</h3>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons text-danger">warning</i>
					<a href="#pablo">Get More Space...</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "AdminProjects",
		props: ['aantal'],
		computed: {
			aantalWVBs(){
				return this.aantal
			},
		}
	};
</script>


<style scoped>
</style>