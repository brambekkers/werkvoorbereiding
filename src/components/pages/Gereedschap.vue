<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-5 col-xxxl-4">
					<div class="card">
						<CardHeader :text="{title: 'Gereedschap', subtitle: 'Welke tools heb je tot je beschikking' }" />
						<div class="card-body">
							<div class="row">
								<div class="col-md-6 border-right">
									<h5 class="title text-center"><strong>Electrisch gereedschap</strong></h5>
									<hr class="mt-0">
									<GereedschapItem
										v-for="(value, key) in gereedschap.gereedschap"
										:key="key"
										@toggleTool="toggleTool"
										:value.sync="value"
										:toolKey="key"
										:category="'gereedschap'"
									/>
								</div>
								<div class="col-md-6">
									<h5 class="title text-center"><strong>Machines</strong></h5>
									<hr class="mt-0">
									<GereedschapItem
										v-for="(value, key) in gereedschap.machines"
										:key="key"
										@toggleTool="toggleTool"
										:value.sync="value"
										:toolKey="key"
										:category="'machines'"
									/>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-6">
							<button
								type="button"
								class="btn btn-lg btn-block btn-danger btn-fill"
								@click="previousStep()"
							>
								<div class="row">
									<div class="col-2"><i
											aria-hidden="true"
											class="fa fa-chevron-left"
										></i></div>
									<div class="col-10">Vorige stap</div>
								</div>
							</button></div>
						<div class="col-md-6">
							<button
								class="btn btn-lg btn-block"
								@click="nextStep()"
							>
								<div class="row">
									<div class="col-10">Volgende stap</div>
									<div class="col-2"><i
											aria-hidden="true"
											class="fa fa-chevron-right"
										></i></div>
								</div>
							</button></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import newWvb from "@/assets/config/newWvb.js";
import GereedschapItem from "./attributes/GereedschapItem";
import CardHeader from "./attributes/Card-header.vue";

export default {
	name: "Gereedschap",
	data() {
		return {
			gereedschap: newWvb.gereedschap
		};
	},
	components: {
		GereedschapItem,
		CardHeader
	},
	watch: {
		gereedschap: {
			handler() {
				this.setData();
			},
			deep: true
		}
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getGereedschap() {
			return this.$store.getters.werkvoorbereidingsObject("gereedschap");
		}
	},
	methods: {
		updateGegevens() {
			if (this.getGereedschap) {
				this.gereedschap = this.getGereedschap;
			}
		},
		toggleTool(toolData) {
			this.gereedschap[toolData.category][toolData.toolKey] = !this
				.gereedschap[toolData.category][toolData.toolKey];
		},
		previousStep() {
			this.$router.push("/maten");
		},
		nextStep() {
			this.setData();
			this.$store.commit("verhoogStap", 6);
			this.$router.push("/planning");
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				gereedschap: this.gereedschap
			});
			this.$store.dispatch("dataToFirebase", {
				path: `alleWVB/${this.werkvoorbereiding.id}/gereedschap`,
				data: this.gereedschap
			});
		}
	},
	created() {
		this.updateGegevens();
	}
};
</script>


<style scoped>
</style>