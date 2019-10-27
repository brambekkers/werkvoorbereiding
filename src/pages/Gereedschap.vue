<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div :class="{
						'col-xl-10 col-xxl-8 col-xxxl-6': gereedschap.userMade,
						'col-lg-10 col-xl-8 col-xxl-6 col-xxxl-4': !gereedschap.userMade
					}">
					<div class="card">
						<CardHeader :text="{ title: 'Gereedschap', subtitle: 'Welke tools heb je tot je beschikking' }" />
						<div class="card-body">
							<div class="row">
								<!-- Gereedschap -->
								<div
									class="border-right"
									:class="{ 'col-md-4 col-sm-6': gereedschap.userMade, 'col-sm-6': !gereedschap.userMade }"
								>
									<h5 class="title text-center"><strong>Electrisch gereedschap</strong></h5>
									<hr class="mt-0" />
									<GereedschapItem
										v-for="(value, key) in gereedschap.gereedschap"
										:value="{ data: value }"
										@changetool="changeTool"
										:key="key"
										:toolKey="key"
										:category="'gereedschap'"
									/>
								</div>
								<!-- machines -->
								<div :class="{ 'col-md-4 col-sm-6 border-right': gereedschap.userMade, 'col-sm-6': !gereedschap.userMade }">
									<h5 class="title text-center"><strong>Machines</strong></h5>
									<hr class="mt-0" />
									<GereedschapItem
										v-for="(value, key) in gereedschap.machines"
										:key="key"
										:value="{ data: value }"
										@changetool="changeTool"
										:toolKey="key"
										:category="'machines'"
									/>
								</div>
								<!-- userMade -->
								<div
									class="col-md-4"
									v-if="gereedschap.userMade"
								>
									<h5 class="title text-center"><strong>Zelf toegevoegd</strong></h5>
									<hr class="mt-0" />
									<template v-for="(value, key) in gereedschap.userMade">
										<GereedschapItem
											:key="key"
											:value="{ data: value }"
											@changetool="changeTool"
											:toolKey="key"
											:category="'userMade'"
										/>
										<button
											:key="`close_${key}`"
											type="button"
											class="close userMadeCloseButton"
											aria-label="Close"
											@click="removeUserTool(key)"
										>
											<span aria-hidden="true">&times;</span>
										</button>
									</template>
								</div>
							</div>
							<hr />
							<div class="d-flex justify-content-between">
								<button
									class="btn"
									@click="addUserTool"
								>
									<i
										aria-hidden="true"
										class="fas fa-plus mr-2"
									></i>
									Gereedschap toevoegen
								</button>
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
							</button>
						</div>
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
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import newWvb from "@/assets/config/newWvb.js";
import GereedschapItem from "@/components/GereedschapItem";
import CardHeader from "@/components/Card-header.vue";

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
		getGereedschap() {
			return this.$store.getters.werkvoorbereidingsObject("gereedschap");
		},
		hexColor() {
			return this.$store.getters.hexColor;
		}
	},
	methods: {
		updateGegevens() {
			if (this.getGereedschap)
				this.$set(this, "gereedschap", this.getGereedschap);
			else this.$set(this, "gereedschap", newWvb.gereedschap);
		},
		changeTool(data) {
			this.gereedschap[data.category][data.toolKey] = !this.gereedschap[
				data.category
			][data.toolKey];
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
			this.$store.dispatch("wvbToFirebase");
		},
		addUserTool() {
			Swal.fire({
				title: "Voeg gereedschap toe",
				input: "text",
				inputAttributes: {
					autocapitalize: "off"
				},
				showCancelButton: true,
				confirmButtonText: "Voeg toe",
				confirmButtonColor: this.hexColor
			}).then(result => {
				if (!this.gereedschap["userMade"])
					this.$set(this.gereedschap, "userMade", {});
				if (result.value)
					this.$set(this.gereedschap.userMade, result.value, true);
			});
		},
		removeUserTool(key) {
			this.$delete(this.gereedschap.userMade, key);

			if (!Object.keys(this.gereedschap.userMade).length) {
				this.$delete(this.gereedschap, "userMade");
			}
		}
	},
	created() {
		this.updateGegevens();
	}
};
</script>

<style scoped lang="scss">
.userMadeCloseButton {
	transform: translateY(-175%);
}
</style>
