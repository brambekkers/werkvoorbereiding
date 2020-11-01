<template>
	<div class="content">
		<div class="container-fluid">
			<form
				role="form"
				@submit.prevent="previous()"
			>
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader :text="{
									title: 'Optie: materialen',
									subtitle: 'Extra informatie over de materialen'
								}" />
							<div class="card-body">
								<h6 class="title col-form-label border-bottom my-1">
									<strong>Massief hout</strong>
								</h6>
								<div class="row">
									<div class="col-md-8">
										<label class="col-form-label text-left">Maximale dikte duims hout</label>
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
								<div class="row">
									<div class="col-md-8">
										<label class="col-form-label text-left">Overlengte kopse kanten</label>
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
								<div class="row">
									<div class="col-md-8">
										<label class="col-form-label text-left">Overlengte Langse kanten</label>
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
										<label class="col-form-label text-left">Opslagpercentage</label>
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
								<h6 class="title col-form-label border-bottom mb-1">
									<strong>Plaatmateriaal</strong>
								</h6>
								<div class="row">
									<div class="col-md-8">
										<label class="col-form-label text-left">Overlengte zijdes</label>
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
										<label class="col-form-label text-left">Dikte zaagsnede</label>
									</div>
									<div class="col-md-4 input-group">
										<input
											type="number"
											required="required"
											class="form-control form-control-sm"
											data-toggle="tooltip"
											data-placement="top"
											min="0"
											data-original-title="Hoe dik is de zaagsnede die je gebruikt bij plaatmateriaal?"
											v-model="materiaalOpties.dikteZaagsnede"
										/>
										<div class="input-group-append">mm</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-8">
										<label class="col-form-label text-left">Opslagpercentage</label>
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
								<button
									type="submit"
									class="btn btn-lg btn-block btn-danger btn-fill"
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
	name: "MateriaalOpties",
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
			return this.$store.getters.werkvoorbereidingsObject(
				"materiaalOpties"
			);
		}
	},
	methods: {
		updateGegevens() {
			if (this.getMateriaalOpties)
				this.$set(this, "materiaalOpties", this.getMateriaalOpties);
			else this.$set(this, "materiaalOpties", newWvb.materiaalOpties);
		},
		previous() {
			this.setData();
			this.$router.go(-1);
		},
		setData() {
			this.$store.dispatch("werkvoorbereiding", {
				...this.werkvoorbereiding,
				materiaalOpties: this.materiaalOpties
			});
			this.$store.dispatch("wvbToFirebase", {
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
