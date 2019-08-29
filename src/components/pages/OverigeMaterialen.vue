<template>
	<div class="content">
		<div class="container-fluid">
			<form
				role="form"
				@submit.prevent="previous()"
			>
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4 ">
						<div class="card">
							<CardHeader :text="{title: 'Overige materialen', subtitle: 'Alles wat geen hout is' }" />
							<div class="card-body">
								<div
									class="row"
									v-bind:key="index"
									v-for="(materiaal, index) in overigeMaterialen"
								>
									<div class="col-md-6">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span class="input-group-text"><i class="fa fa-tag fa-fw"></i></span>
											</div>
											<input
												type="text"
												placeholder="Materiaal naam"
												data-toggle="tooltip"
												data-placement="top"
												title=""
												required="required"
												class="form-control"
												data-original-title="Wat is de naam van dit onderdeel?"
												v-model="materiaal.naam"
											>
										</div>
									</div>
									<div class="col-6 col-md-2">
										<div class="input-group mb-2">
											<money
												placeholder="Prijs"
												data-toggle="tooltip"
												data-placement="top"
												min="1"
												required="required"
												class="form-control"
												data-original-title="Wat kost één onderdeel van dit product?"
												v-model="materiaal.prijs"
												v-bind="money"
											>
											</money>
										</div>
									</div>
									<div class="col-3 col-md-2">
										<div class="input-group mb-2">
											<input
												type="number"
												placeholder="Aantal"
												data-toggle="tooltip"
												data-placement="top"
												min="1"
												required="required"
												class="form-control"
												data-original-title="Hoe vaak komt dit materiaal voor in het project?"
												v-model="materiaal.aantal"
											>
										</div>
									</div>
									<div class="col-2 col-md-2">
										<div class="input-group mb-2"><button
												type="button"
												class="btn btn-sm btn-danger"
												@click="removeMateriaal(index)"
											><i class="fa fa-trash"></i></button></div>
									</div>
									<div class="col-12 d-block d-md-none">
										<hr>
									</div>
								</div>
								<hr>
								<button
									type="button"
									class="btn"
									@click="newMateriaal()"
								><i class="fa fa-plus mr-3"></i>Nieuw materiaal
								</button>
							</div>
						</div>
						<div class="row">
							<div class="col-md-12">
								<button
									type="submit"
									class="btn btn-lg btn-block btn-danger"
								>
									Terug
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
import newWvb from "@/assets/config/newWvb.js";
import { Money } from "v-money";
import CardHeader from "./attributes/Card-header.vue";

export default {
	name: "OverigeMaterialen",
	components: { Money, CardHeader },
	data() {
		return {
			overigeMaterialen: newWvb.overigeMaterialen,
			money: {
				decimal: ".",
				thousands: ",",
				prefix: `€ `,
				suffix: "",
				precision: 2,
				masked: false
			}
		};
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getOverigeMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject(
				"overigeMaterialen"
			);
		},
		valuta() {
			return this.$store.getters.valuta;
		}
	},
	watch: {
		overigeMaterialen: {
			handler() {
				this.setData();
			},
			deep: true
		}
	},
	methods: {
		updateGegevens() {
			if (this.getOverigeMaterialen)
				this.overigeMaterialen = this.getOverigeMaterialen;
			if (this.valuta) this.money.prefix = `${this.valuta} `;
		},
		newMateriaal() {
			this.overigeMaterialen.push({
				aantal: "",
				naam: "",
				prijs: ""
			});
		},
		removeMateriaal(i) {
			this.overigeMaterialen.splice(i, 1);
		},
		previous() {
			this.setData();
			this.$router.go(-1);
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				overigeMaterialen: this.overigeMaterialen
			});
			this.$store.dispatch("dataToFirebase", {
				path: `alleWVB/${this.werkvoorbereiding.id}`,
				data: this.werkvoorbereiding
			})
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


<style scoped>
</style>