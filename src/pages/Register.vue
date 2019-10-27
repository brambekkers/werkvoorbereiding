<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-lg-10 col-xl-8 mx-auto">
				<form
					role="form"
					@submit.prevent="register()"
				>
					<div class="card">
						<CardHeader :text="{title: 'Registreer', subtitle: 'Voor een gratis account' }" />
						<div class="card-body px-5 pb-5">
							<div class="row">
								<div class="col-md-6">
									<div class="info info-horizontal">
										<div class="icon icon-info">
											<i class="fas fa-project-diagram material-icons"></i>
										</div>
										<div class="description">
											<h4 class="info-title">Overzicht</h4>
											<p class="description">
												Nooit meer een werkvoorbereiding kwijtraken! <br>
												Al jouw ingevoerde gegevens overzichtelijk op één plek
												en waarbij je gemmakelijk kunt switchen tussen jouw projecten.
											</p>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<h4 class="mt-4 text-center">Maak een account aan</h4>
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
										<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div>
										<input
											type="password"
											placeholder="Wachtwoord"
											v-model="password"
											required="required"
											class="form-control"
										>
									</div>
									<div class="input-group mb-2">
										<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-unlock"></i></span></div>
										<input
											type="password"
											placeholder="Herhaal wachtwoord"
											v-model="passwordCheck"
											required="required"
											class="form-control"
										>
									</div>
								</div>
							</div>
						</div>

					</div>
					<button
						type="submit"
						class="btn btn-lg btn-block btn-success"
					>Registreren</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from "@/components/Card-header.vue";

export default {
	name: "Register",
	components: {
		CardHeader
	},
	data() {
		return {
			email: "",
			password: "",
			passwordCheck: ""
		};
	},
	methods: {
		async register() {
			if (this.password === this.passwordCheck) {
				const register = await this.$store.dispatch("register", {
					email: this.email,
					password: this.password
				});
				if (register.code) return this.handleError(register);

				this.successMsg();
				this.resetForm();
				this.$router.push("/profiel");
			} else {
				this.handleError({
					code: "password dont match"
				});
			}
		},
		successMsg() {
			window.Swal.mixin({
				type: "success",
				title: "Het account is succesvol aangemaakt.",
				toast: true,
				position: "top-end",
				showConfirmButton: false,
				timer: 3000
			}).fire();
		},
		handleError(error) {
			// E-mailadres is al in gebruik
			if (error.code === "auth/email-already-in-use") {
				window.Swal.fire({
					title: "Al een account?",
					text:
						"Dit e-mailadres is al in gebruik... Waarschijnlijk heb je al een account. Probeer in te loggen.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
			if (error.code === "auth/weak-password") {
				window.Swal.fire({
					title: "Slecht wachtwoord?",
					text:
						"Dit wachtwoord is niet sterk genoeg. Maak een sterker wachtwoord en probeer het opnieuw.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
			// wachtwoord komt niet overeen
			if (error.code === "password dont match") {
				window.Swal.fire({
					title: "Controleer wachtwoord",
					text:
						"Het controle wachtwoord komt niet overeen met je eerste invoer. Zorg dat je het wachtwoordt goed typt.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
		},
		resetForm() {
			this.name = "";
			this.email = "";
			this.password = "";
			this.passwordCheck = "";
		}
	}
};
</script>


<style scoped>
.info {
	max-width: 360px;
	margin: 0 auto;
	padding: 0;
}
.info-horizontal .material-icons {
	float: left;
	margin-top: 24px;
	margin-right: 10px;
	font-size: 2.6em;
}

.info .info-title {
	color: #3c4858;
	margin: 30px 0 15px;
}

.info-horizontal .description {
	overflow: hidden;
	color: #999;
}
</style>