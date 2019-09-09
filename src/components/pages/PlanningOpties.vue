<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader :text="{ title: 'Optie: planning en kosten', subtitle: 'Extra informatie over tijd en geld' }" />
							<div class="card-body">
								<h6 class="title"><strong>Planning</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Werkdagen</p>
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
										<p class="col-form-label">Uren per werkdag</p>
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
										<p class="col-form-label">Ineffectieve tijd</p>
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
								<hr />
								<h6 class="title"><strong>Kosten</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Uurtarief</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.uurtarief"
										/>
										<div class="input-group-append">{{ $store.state.appData.instellingen.valuta }}</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Indirecte kosten</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											v-model="planningOpties.indirecteKosten"
										/>
										<div class="input-group-append">{{ $store.state.appData.instellingen.valuta }}</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Winstopslag</p>
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
										<p class="col-form-label">BTW-Tarief</p>
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
								<button type="button" class="btn btn-lg btn-block btn-danger btn-fill" @click.prevent="previous()">
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
import CardHeader from './attributes/Card-header.vue';
import newWvb from '@/assets/config/newWvb.js';

export default {
	name: 'PlanningOpties',
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
			return this.$store.getters.werkvoorbereidingsObject('planningOpties');
		}
	},
	methods: {
		updateGegevens() {
			if (this.getPlanningOpties) this.planningOpties = this.getPlanningOpties;
			else this.planningOpties = newWvb.planningOpties;
		},
		setData() {
			this.$store.commit('werkvoorbereiding', {
				...this.werkvoorbereiding,
				planningOpties: this.planningOpties
			});
			this.$store.dispatch('wvbToFirebase');
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
