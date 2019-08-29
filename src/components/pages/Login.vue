<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form
					role="form"
					@submit.prevent="login()"
				>
					<div class="card">
						<CardHeader :text="{title: 'Login', subtitle: 'Beheer je eigen projecten!' }" />
						<div class="card-body">
							<div class="row">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
									<input
										type="email"
										placeholder="Email"
										v-model="email"
										required="required"
										class="form-control"
									>
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div> <input
										type="password"
										placeholder="Wachtwoord"
										v-model="password"
										required="required"
										class="form-control"
									>
								</div>
							</div>
						</div>

					</div>
					<button
						type="submit"
						class="btn btn-lg btn-block btn-success"
					>Inloggen</button>
					<div class="text-center">
						<label>Nog geen account? <router-link
								to="/register"
								class="link"
							>Account aan maken</router-link><br>
							of <router-link
								to="/forgotPw"
								class="link"
							>wachtwoord vergeten</router-link></label>
					</div>

				</form>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from "./attributes/Card-header.vue";

export default {
	name: "Login",
	components: { CardHeader },
	data() {
		return {
			email: "",
			password: ""
		};
	},
	methods: {
		async login() {
			const login = await this.$store.dispatch("login", {
				email: this.email,
				password: this.password
			});
			if (!login.user) return this.handleError(login);

			window.Swal.mixin({
				type: "success",
				title: "Succesvol ingelogd",
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000
			}).fire();

			this.$router.push("/profiel");

			this.email = "";
			this.password = "";
		},
		handleError(error) {
			// Ongeldig e-mailadres
			if (error.code === "auth/invalid-email") {
				window.Swal.fire({
					title: "Niet geldig",
					text: "Dit is geen geldig email adres.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
			// User niet aanwezig in database
			if (error.code === "auth/user-not-found") {
				window.Swal.fire({
					title: "Niet gevonden",
					text:
						"Dit e-mailadres is niet bij ons bekend... Probeer het met een ander e-mailadres nog een keer.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
			// Verkeerd wachtwoord
			else if (error.code === "auth/wrong-password") {
				window.Swal.fire({
					title: "Verkeerd wachtwoord",
					text:
						"Helaas is dit niet jouw juiste wachtwoord. Probeer het gerust nog een keer.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
			// Accound is uitgeschakeld
			else if (error.code === "auth/user-disabled") {
				window.Swal.fire({
					title: "Uitgeschakeld",
					text:
						"Dit account is tijdelijk niet actief. Neem contact op met de beheerder voor verdere informatie.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
		}
	}
};
</script>


<style scoped>
.link {
	cursor: pointer;
	color: #4aa64e !important;
}
</style>