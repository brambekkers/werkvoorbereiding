<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Optie: materialen</h3>
								<p class="card-category">Extra informatie over de materialen</p>
							</div>
							<div class="card-body">
								<h6 class="title"><strong>Massief hout</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Maximale dikte duims hout</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="materiaalOpties.maximaleDikteDuims">
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Overlengte kopse kanten</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="materiaalOpties.overlengteKops">
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Overlengte Langse kanten</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="materiaalOpties.overlengteLangs">
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-8">
										<p class="col-form-label">Opslagpercentage</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="materiaalOpties.opslagpercentageMassief">
										<div class="input-group-append"> %</div>
									</div>
								</div>
								<hr>
								<h6 class="title"><strong>Plaatmateriaal</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Overlengte zijdes</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="materiaalOpties.overlengteZijdes">
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-8">
										<p class="col-form-label">Opslagpercentage</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="materiaalOpties.opslagpercentagePlaat">
										<div class="input-group-append"> %</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button type="button" class="btn btn-lg btn-block btn-danger btn-fill" @click.prevent="$store.state.appData.page = 3">
									terug
								</button>
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
		name: "MateriaalOpties",
		computed: {
			materiaalOpties() {
				return this.$store.state.werkvoorbereiding.materiaalOpties
			}
		},
	};
</script>


<style scoped>

</style>