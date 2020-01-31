<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-12">
					<div class="card">
						<CardHeader
							:text="{
								title: 'Projecten',
								subtitle: 'Kies een project waarmee je verder wilt gaan.'
							}"
						/>
						<div class="row mt-3 mx-3 justify-content-center">
							<div class="col-md-4 text-center">
								<button class="btn btn-fill btn-block" @click="newWvb()">
									Nieuw project
								</button>
							</div>
							<div class="col-4 text-center"></div>
							<div class="col-md-4 text-center">
								<button
									class="btn btn-fill btn-danger btn-block"
									@click="deleteWvb()"
								>
									Verwijder project
								</button>
							</div>
						</div>
						<hr class="mb-0" />
						<div class="card-body">
							<div class="table-responsive">
								<table
									class="table table-hover table-striped mb-0"
									v-if="projecten"
									:class="{ 'table-dark': darkMode }"
								>
									<thead class="bg-light" :class="{ 'bg-dark': darkMode }">
										<tr>
											<th style="width: 5%;">#</th>
											<th style="width: 30%;">Project naam</th>
											<th style="width: 15%;">Aantal componenten</th>
											<th style="width: 15%;">Aantal onderdelen</th>
											<th style="width: 15%;">Aantal handelingen</th>
											<th style="width: 30%;">Laatste wijziging</th>
										</tr>
									</thead>
									<tbody>
										<tr
											v-bind:key="index"
											v-for="(project, id, index) in projecten"
											@click="selectWvb(id)"
											:class="selectedColor(id)"
										>
											<template v-if="id != 'undefined'">
												<td>{{ index + 1 }}</td>
												<td>
													<span v-if="project.basisgegevens">{{
														project.basisgegevens.project
													}}</span>
												</td>
												<td>{{ aantalComponenten(id) }}</td>
												<td>{{ aantalOnderdelen(id) }}</td>
												<td>{{ aantalHandelingen(id) }}</td>
												<td>{{ project.laatsteBewerking }}</td>
											</template>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from "@/components/Card-header.vue";

export default {
	name: "Projecten",
	components: { CardHeader },
	computed: {
		user() {
			return this.$store.getters.user;
		},
		projecten() {
			return this.$store.getters.alleWerkvoorbereidingen;
		},
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		wvbId() {
			return this.werkvoorbereiding ? this.werkvoorbereiding.id : false;
		},
		instellingen() {
			return this.$store.state.appData.instellingen;
		},
		userColor() {
			if (this.instellingen.kleur) {
				return this.$store.state.appData.instellingen.kleur;
			} else {
				return "groen";
			}
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === "licht" ? false : true;
		}
	},
	methods: {
		selectWvb(id) {
			this.$store.commit("werkvoorbereiding", this.projecten[id]);
		},
		stringToDate(string) {
			let str1 = string.replace(/-/g, " ");
			let str2 = str1.replace(".", " ");
			let res = str2.split(" ").map(Number);
			return new Date(res[2], res[1] - 1, res[0], res[3], res[4]);
		},
		aantalComponenten(i) {
			if (this.projecten[i].componenten) {
				return this.projecten[i].componenten.length;
			} else {
				return 0;
			}
		},
		aantalOnderdelen(i) {
			if (this.projecten[i].maten) {
				return this.projecten[i].maten.length;
			} else {
				return 0;
			}
		},
		aantalHandelingen(i) {
			let count = 0;
			if (this.projecten[i].planning) {
				for (const plan of this.projecten[i].planning) {
					if (plan.stappen) {
						count += plan.stappen.length;
					}
				}
			}
			return count;
		},
		deleteWvb() {
			if (this.werkvoorbereiding) {
				window.Swal.fire({
					title: "Weet je het zeker?",
					text:
						"Wanneer je deze werkvoorbereiding verwijderd kun je het niet meer terughalen!",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik weet het zeker!",
					showCancelButton: true,
					type: "warning"
				}).then(result => {
					if (result.value) {
						window.Swal.fire({
							text: "Poof! Je werkvoorbereiding is verwijderd!",
							type: "success"
						});
						this.$store.dispatch("deleteDataFirebase", `alleWVB/${this.wvbId}`);
						this.$store.commit("werkvoorbereiding", null);
					}
				});
			} else {
				window.Swal.fire({
					text: "Er is geen werkvoorbereiding geselecteerd!",
					type: "warning"
				});
			}
		},
		newWvb() {
			this.$store.commit("werkvoorbereiding", null);
			this.$router.push("/");
		},
		selectedColor(id) {
			if (id === this.wvbId) {
				return this.userColor;
			}
		}
	},
	mounted() {
		if (this.user) this.$store.dispatch("updateUserData");
	}
};
</script>

<style scoped lang="scss">
table {
	border: solid 1px #d6d6d6;

	thead tr th {
		font-size: 1em;
		font-weight: 400;
	}

	td {
		cursor: pointer;
		padding-top: 8px !important;
		padding-bottom: 8px !important;
	}
}

.roze {
	background-color: #e91e63;
	background: linear-gradient(60deg, #d65a84, #e91e63);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(233, 30, 99, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(233, 30, 99, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
}

.rood {
	background: linear-gradient(60deg, #ef5350, #e53935);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(244, 67, 54, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(244, 67, 54, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
}

.geel {
	background: linear-gradient(60deg, #ffa726, #fb8c00);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(255, 152, 0, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(255, 152, 0, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
}

.groen {
	background: linear-gradient(60deg, #66bb6a, #43a047);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(76, 175, 80, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(76, 175, 80, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
}

.blauw {
	background: linear-gradient(60deg, #26c6da, #00acc1);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(0, 188, 212, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(0, 188, 212, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
}

.paars {
	background: linear-gradient(60deg, #ab47bc, #8e24aa);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(156, 39, 176, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(156, 39, 176, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
}

.grijs {
	background: linear-gradient(60deg, #858585, #575757);
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(163, 163, 163, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(163, 163, 163, 0.4);
	background-repeat: no-repeat;
	background-attachment: fixed;
	color: white;
}
</style>
