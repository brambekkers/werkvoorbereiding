<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader
								:text="{
									title: 'Instellingen',
									subtitle: 'De algemene instellingen'
								}"
							/>
							<div class="card-body">
								<h6 class="title col-form-label border-bottom my-1">
									<strong>Layout</strong>
								</h6>
								<div class="row mb-2 d-flex">
									<div class="col-md-8">
										<label class="col-form-label text-left">Basiskleur</label>
									</div>
									<div class="col-md-4 input-group">
										<select
											class="form-control"
											v-model="instellingen.kleur"
											:class="instellingen.kleur"
										>
											<option value="blauw" class="blauw"></option>
											<option value="grijs" class="grijs"></option>
											<option value="roze" class="roze"></option>
											<option value="paars" class="paars"></option>
											<option value="groen" class="groen"></option>
											<option value="geel" class="geel"></option>
											<option value="rood" class="rood"></option>
										</select>
									</div>
									<div class="col-md-8">
										<label class="col-form-label text-left">Kleurenmodus</label>
									</div>
									<div class="col-md-4 input-group">
										<select
											class="form-control pl-3"
											v-model="instellingen.modus"
											:class="instellingen.modus"
										>
											<option value="licht" class="licht">Licht</option>
											<option value="donker" class="donker">Donker</option>
										</select>
									</div>
								</div>
								<h6 class="title col-form-label border-bottom mb-1">
									<strong>Financieel</strong>
								</h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label text-left">Valuta</label>
									</div>
									<div class="col-md-4 input-group">
										<b-form-select
											v-model="instellingen.valuta"
											:options="valutaOptions"
											class="form-control pl-3"
										></b-form-select>
									</div>
								</div>
								<h6 class="title col-form-label border-bottom mb-1">
									<strong>Account</strong>
								</h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<label class="col-form-label  text-left"
											>Account verwijderen</label
										>
									</div>
									<div class="col-md-4 input-group">
										<a
											id="delete"
											class="col-form-label text-danger"
											@click="deleteAccount()"
										>
											<u>Verwijderen</u>
										</a>
									</div>
								</div>
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

export default {
	name: "Instellingen",
	components: { CardHeader },
	data() {
		return {
			valutaOptions: [
				{ value: "€", text: "Euro €" },
				{ value: "$", text: "Dollar $" },
				{ value: "£", text: "Pound £" },
				{ value: "¥", text: "Yen ¥" }
			]
		};
	},
	watch: {
		instellingen: {
			handler() {
				this.$store.dispatch("dataToFirebase", {
					path: `profiel/instellingen`,
					data: this.instellingen
				});
			},
			deep: true
		}
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		instellingen() {
			return this.$store.getters.instellingen;
		}
	},
	methods: {
		deleteAccount() {
			window.Swal.fire({
				title: "Weet je het zeker?",
				text:
					"Wanneer je het account verwijderd kun je dit niet meer ongedaan maken! Je bent ook al je opgeslagen werk kwijt. Check dus goed of dit klopt!",
				confirmButtonColor: "#F33527",
				confirmButtonText: "Ik weet het zeker!",
				showCancelButton: true,
				type: "error"
			}).then(result => {
				if (result.value) {
					window.Swal.fire({
						title: "Weet je het echt zeker?",
						text:
							"Na deze melding verwijder je de gebruiker echt en ben je alles kwijt! Weet je het zeker?",
						confirmButtonColor: "#F33527",
						confirmButtonText: "Ik weet het echt zeker!",
						showCancelButton: true,
						type: "warning"
					}).then(result => {
						if (result.value) {
							window.Swal.fire({
								text: "Poof! Je hebt de gebruiker is verwijderd!",
								type: "error"
							});
							this.$store.dispatch("deleteUser");
							this.$store.commit("resetInstellingen");
							this.$store.commit("werkvoorbereiding", null);
							this.$router.push("/");
						}
					});
				}
			});
		}
	}
};
</script>

<style scoped>
.roze {
	background-color: #e91e63 !important;
}

.rood {
	background-color: #e53935 !important;
}

.geel {
	background-color: #ffa726 !important;
}

.groen {
	background-color: #43a047 !important;
}

.blauw {
	background-color: #00acc1 !important;
}

.paars {
	background-color: #8e24aa !important;
}

.grijs {
	background-color: #575757 !important;
}

.donker {
	background-color: #555555;
	color: #fff;
	padding-left: 1rem;
}

.licht {
	background-color: #fff !important;
	color: #555555;
	padding-left: 1rem;
}

#delete {
	cursor: pointer;
	width: 100%;
	text-align: right;
}
</style>
