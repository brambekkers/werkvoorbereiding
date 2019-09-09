<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="previous()">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader :text="{ title: 'Optie: materialen', subtitle: 'Extra informatie over de materialen' }" />
							<div class="card-body">
								<h6 class="title"><strong>Massief hout</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Maximale dikte duims hout</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											data-original-title="Hoeveel millimeter is één duims dik hout?"
											v-model="materiaalOpties.maximaleDikteDuims"
										/>
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Overlengte kopse kanten</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											data-original-title="Hoeveel millimeter extra hout reken je voor de kopse kanten?"
											v-model="materiaalOpties.overlengteKops"
										/>
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Overlengte Langse kanten</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											data-original-title="Hoeveel millimeter extra hout reken je voor de langs kanten?"
											v-model="materiaalOpties.overlengteLangs"
										/>
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-8">
										<p class="col-form-label">Opslagpercentage</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											data-original-title="Wat is het percentage wat je extra rekent bij het gebruik van massief hout?"
											v-model="materiaalOpties.opslagpercentageMassief"
										/>
										<div class="input-group-append">%</div>
									</div>
								</div>
								<hr />
								<h6 class="title"><strong>Plaatmateriaal</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Overlengte zijdes</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											data-original-title="Hoeveel millimeter extra materiaal reken je voor de zijdes van het plaatmateriaal?"
											v-model="materiaalOpties.overlengteZijdes"
										/>
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-8">
										<p class="col-form-label">Opslagpercentage</p>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											data-original-title="Wat is het percentage wat je extra rekent bij het gebruik van plaatmateriaal?"
											v-model="materiaalOpties.opslagpercentagePlaat"
										/>
										<div class="input-group-append">%</div>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button type="submit" class="btn btn-lg btn-block btn-danger btn-fill">
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
	name: 'MateriaalOpties',
	components: { CardHeader },
	data() {
		return {
			materiaalOpties: newWvb.materiaalOpties
		};
	},
	watch: {
		materiaalOpties: {
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
		getMateriaalOpties() {
			return this.$store.getters.werkvoorbereidingsObject('materiaalOpties');
		}
	},
	methods: {
		updateGegevens() {
			if (this.getMateriaalOpties) this.materiaalOpties = this.getMateriaalOpties;
			else this.materiaalOpties = newWvb.materiaalOpties;
		},
		previous() {
			this.setData();
			this.$router.go(-1);
		},
		setData() {
			this.$store.commit('werkvoorbereiding', {
				...this.werkvoorbereiding,
				materiaalOpties: this.materiaalOpties
			});
			this.$store.dispatch('wvbToFirebase', {
				path: `alleWVB/${this.werkvoorbereiding.id}`,
				data: this.werkvoorbereiding
			});
		}
	},
	mounted() {
		window.$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 500, hide: 0 }
		});
		this.updateGegevens();
	}
};
</script>

<style scoped></style>
