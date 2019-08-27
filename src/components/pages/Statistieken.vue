<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-xl-7 col-xxl-6 col-xxxl-4">
					<div class="card">
						<CardHeader :text="{title: 'Statistieken', subtitle: 'Alle informatie over jouw account' }" />
						<hr class="my-0">
						<div class="card-body">
							<h6 class="title col-form-label"><strong>Werkvoorbereiding</strong>
								<hr class="my-0">
							</h6>
							<div class="row mb-4">
								<!-- aantal projecten -->
								<div class="col-12 d-flex justify-content-between">
									<p>Aantal projecten</p>
									<p class="font-weight-bold">{{amountWvb}}</p>
								</div>
								<!-- huidige project -->
								<div class="col-12 d-flex justify-content-between">
									<p>Huidig project</p>
									<p class="font-weight-bold">{{huidigeProjectNaam}}</p>
								</div>
								<!-- huidige project id -->
								<div class="col-12 d-flex justify-content-between">
									<p>Huidig project ID</p>
									<p class="font-weight-bold">{{huidigeProjectId}}</p>
								</div>
							</div>

							<div v-if="currentUser">
								<h6 class="title col-form-label"><strong>Profiel</strong>
									<hr class="my-0">
								</h6>
								<div class="row mb-4">
									<!-- firebase id -->
									<div class="col-12 d-flex justify-content-between">
										<p>ID</p>
										<p class="font-weight-bold">{{currentUser.uid}}</p>
									</div>
									<!-- Lid sinds -->
									<div class="col-12 d-flex justify-content-between">
										<p>Lid sinds</p>
										<p class="font-weight-bold">{{currentUser.metadata.creationTime}}</p>
									</div>
									<!-- Lid sinds -->
									<div class="col-12 d-flex justify-content-between">
										<p>Laatste keer aangemeld</p>
										<p class="font-weight-bold">{{currentUser.metadata.lastSignInTime}}</p>
									</div>
								</div>
							</div>
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
		huidigeProjectId() {
			if (this.werkvoorbereiding) {
				return this.werkvoorbereiding.id;
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