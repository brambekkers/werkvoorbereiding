<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i> Optie: planning en kosten</h3>
								<p class="card-category">Extra informatie over tijd en geld</p>
							</div>
							<div class="card-body">
								<h6 class="title"><strong>Planning</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Werkdagen</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.dagenWeek">
										<div class="input-group-append">p.w</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Uren per werkdag</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.urenWerkdag">
										<div class="input-group-append">uur</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Ineffectieve tijd</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.ineffectieveTijd">
										<div class="input-group-append">%</div>
									</div>
								</div>
								<hr>
								<h6 class="title"><strong>Kosten</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Uurtarief</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.uurtarief">
										<div class="input-group-append">€</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Indirecte kosten</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.indirecteKosten">
										<div class="input-group-append">€</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Winstopslag</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.winstOpslag">
										<div class="input-group-append">%</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">BTW-Tarief</p>
									</div>
									<div class="col-md-4 input-group">
										<input type="number" required="required" class="form-control form-control-sm" v-model="planningOpties.btwTarief">
										<div class="input-group-append">%</div>
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
		name: "PlanningOpties",
		computed: {
			planningOpties() {
				return this.$store.state.werkvoorbereiding.planningOpties
			}
		},
	};
</script>


<style scoped>

</style>