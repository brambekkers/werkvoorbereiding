<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<form
						role="form"
						@submit.prevent="nextStep()"
					>
						<div class="card">
							<CardHeader :text="{title: 'Basisgegevens', subtitle: 'De eerste stap...' }" />
							<div class="card-body">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-tag fa-fw"></i></span></div>
									<input
										type="text"
										placeholder="Project"
										data-toggle="tooltip"
										data-placement="right"
										required="required"
										class="form-control"
										data-original-title="Wat is de naam van je project?"
										v-model="basisgegevens.project"
									>
								</div>
								<hr>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-user fa-fw"></i></span></div>
									<input
										type="text"
										placeholder="Voor en achternaam"
										data-toggle="tooltip"
										data-placement="right"
										required="required"
										class="form-control"
										data-original-title="Vul hier jouw eigen naam in"
										v-model="basisgegevens.naam"
									>
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-graduation-cap fa-fw"></i></span></div>
									<input
										type="text"
										placeholder="Klas"
										data-toggle="tooltip"
										data-placement="right"
										required="required"
										class="form-control"
										data-original-title="In welke klas zit je?"
										v-model="basisgegevens.klas"
									>
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-university fa-fw"></i></span></div>
									<input
										type="text"
										placeholder="Docent"
										data-toggle="tooltip"
										data-placement="right"
										required="required"
										class="form-control"
										data-original-title="Van wie krijg je les?"
										v-model="basisgegevens.docent"
									>
								</div>
							</div>
						</div>
						<button
							tag="button"
							type="submit"
							class="btn btn-lg btn-block"
						>Start de werkvoorbereiding</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import $ from "jquery";
import newWvb from "@/assets/config/newWvb.js";
import CardHeader from "./attributes/Card-header.vue";

export default {
	name: "Gegevens",
	components: { CardHeader },
	data() {
		return {
			basisgegevens: newWvb.basisgegevens
		};
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getBasisgegevens() {
			return this.$store.getters.werkvoorbereidingsObject(
				"basisgegevens"
			);
		}
	},
	methods: {
		updateGegevens() {
			if (this.getBasisgegevens) {
				this.basisgegevens = this.getBasisgegevens;
			}
		},
		nextStep() {
			this.setData();
			this.$store.commit("verhoogStap");
			this.$router.push("/componenten");
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				basisgegevens: this.basisgegevens
			});
			this.$store.dispatch("dataToFirebase", {
				path: `alleWVB/${this.werkvoorbereiding.id}`,
				data: this.werkvoorbereiding
			});
		}
	},
	created() {
		$(function() {
			$('[data-toggle="tooltip"]').tooltip({
				delay: { show: 500, hide: 0 }
			});
		});
		this.updateGegevens();
	}
};
</script>


<style scoped>
</style>