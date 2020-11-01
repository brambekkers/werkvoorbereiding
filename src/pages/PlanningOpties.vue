<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader :text="{
									title: 'Optie: planning en kosten',
									subtitle: 'Extra informatie over tijd en geld'
								}" />
							<div class="card-body">
								<h6 class="title col-form-label border-bottom my-1">
									<strong>Planning</strong>
								</h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Werkdagen</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.dagenWeek"
										/>
										<div class="input-group-append">p.w</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Uren per werkdag</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.urenWerkdag"
										/>
										<div class="input-group-append">uur</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Ineffectieve tijd</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.ineffectieveTijd"
										/>
										<div class="input-group-append">%</div>
									</div>
								</div>
								<h6 class="title col-form-label border-bottom mb-1">
									<strong>Kosten</strong>
								</h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Uurtarief</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.uurtarief"
										/>
										<div class="input-group-append">
											{{ $store.state.appData.instellingen.valuta }}
										</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Indirecte kosten</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.indirecteKosten"
										/>
										<div class="input-group-append">
											{{ $store.state.appData.instellingen.valuta }}
										</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Winstopslag</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.winstOpslag"
										/>
										<div class="input-group-append">%</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">BTW-Tarief</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.btwTarief"
										/>
										<div class="input-group-append">%</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button
									type="button"
									class="btn btn-lg btn-block btn-danger btn-fill"
									@click.prevent="previous()"
								>
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
import CardHeader from "@/components/Card-header.vue";
import newWvb from "@/assets/config/newWvb.js";

export default {
	name: "PlanningOpties",
	components: { CardHeader },
	data() {
		return {
			planningOpties: newWvb.planningOpties
		};
	},
	watch: {
		planningOpties: {
			handler() {
				this.setData();
			},
			deep: true
		},
		werkvoorbereiding: {
			handler() {
				this.updateGegevens();
			},
			deep: true
		}
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getPlanningOpties() {
			return this.$store.getters.werkvoorbereidingsObject(
				"planningOpties"
			);
		}
	},
	methods: {
		updateGegevens() {
			if (this.getPlanningOpties)
				this.$set(this, "planningOpties", this.getPlanningOpties);
			else this.$set(this, "planningOpties", newWvb.planningOpties);
		},
		setData() {
			this.$store.dispatch("werkvoorbereiding", {
				...this.werkvoorbereiding,
				planningOpties: this.planningOpties
			});
			this.$store.dispatch("wvbToFirebase");
		},
		previous() {
			this.setData();
			this.$router.go(-1);
		}
	},
	created() {
		this.updateGegevens();
	}
};
</script>

<style scoped></style>
