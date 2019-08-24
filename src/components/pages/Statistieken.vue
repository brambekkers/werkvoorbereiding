<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-xl-7 col-xxl-6 col-xxxl-4">
					<div class="card">
						<CardHeader :text="{title: 'Statistieken', subtitle: 'Alle informatie over jouw account' }" />
						<hr class="my-0">
						<div class="card-body">
							<h6 class="title"><strong>Werkvoorbereiding</strong>
								<hr class="my-0">
							</h6>
							<div class="row mb-4">
								<div class="col-6">
									<p class="col-form-label">Aantal projecten</p>
								</div>
								<div class="col-6">
									<input
										type="text"
										readonly="readonly"
										class="form-control-plaintext form-control-sm text-right"
										v-model="amountWvb"
									>
								</div>
								<div class="col-6">
									<p class="col-form-label">Huidig project</p>
								</div>
								<div class="col-6">
									<input
										type="text"
										readonly="readonly"
										class="form-control-plaintext form-control-sm text-right"
										v-model="huidigeProjectNaam"
									>
								</div>
							</div>
							<h6 class="title col-form-label"><strong>Profiel</strong>
								<hr class="my-0">
							</h6>
							<div class="row mb-4">
								<div class="col-6">
									<p class="col-form-label">ID</p>
								</div>
								<div class="col-6">
									<input
										type="text"
										readonly="readonly"
										class="form-control-plaintext form-control-sm text-right"
										v-if="currentUser"
										v-model="currentUser.uid"
									>
								</div>
								<div class="col-6">
									<p class="col-form-label">Lid sinds</p>
								</div>
								<div class="col-6">
									<input
										type="text"
										readonly="readonly"
										class="form-control-plaintext form-control-sm text-right"
										v-if="currentUser"
										v-model="currentUser.metadata.creationTime"
									>
								</div>
								<div class="col-6">
									<p class="col-form-label">Laatst aangemeld</p>
								</div>
								<div class="col-6">
									<input
										type="text"
										readonly="readonly"
										class="form-control-plaintext form-control-sm text-right"
										v-if="currentUser"
										v-model="currentUser.metadata.lastSignInTime"
									>
								</div>
							</div>
							<div class="row mb-0"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from "./attributes/Card-header.vue";
export default {
	name: "Statistieken",
	components: { CardHeader },
	computed: {
		amountWvb() {
			if (this.alleWerkvoorbereidingen)
				return Object.keys(this.alleWerkvoorbereidingen).length;

			return 0;
		},
		huidigeProjectNaam() {
			if (this.werkvoorbereiding) {
				return this.werkvoorbereiding.basisgegevens.project;
			}
		},
		alleWerkvoorbereidingen() {
			return this.$store.getters.alleWerkvoorbereidingen;
		},
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		currentUser() {
			return this.$store.getters.user;
		}
	}
};
</script>


<style scoped>
</style>