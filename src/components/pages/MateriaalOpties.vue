<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader :text="{title: 'Optie: materialen', subtitle: 'Extra informatie over de materialen' }"/>
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
	import CardHeader from "./attributes/Card-header.vue";

	export default {
		name: "MateriaalOpties",
		components: { CardHeader },
		computed: {
			materiaalOpties() {
				return this.$store.state.werkvoorbereiding.materiaalOpties
			}
		},
	};
</script>


<style scoped>

</style>