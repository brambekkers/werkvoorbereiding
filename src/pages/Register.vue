<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-lg-10 col-xl-8 mx-auto">
				<form role="form" @submit.prevent="register()">
					<div class="card">
						<CardHeader :text="{ title: 'Registreer', subtitle: 'Voor een gratis account' }" />
						<div class="card-body px-5 pb-5">
							<div class="row mt-5">
								<div class="col-md-6">
									<div class="info info-horizontal">
										<div class="icon icon-info">
											<i class="fas fa-project-diagram material-icons text-primary"></i>
										</div>
										<div class="description">
											<h4 class="card-title">Overzicht</h4>
											<p class="description">
												Al jouw ingevoerde gegevens overzichtelijk op één plek en waarbij je gemmakelijk kunt switchen tussen
												jouw projecten.
											</p>
										</div>
									</div>
									<div class="info info-horizontal">
										<div class="icon icon-info">
											<i class="fas fa-server material-icons text-secondary"></i>
										</div>
										<div class="description">
											<h4 class="card-title">Backup</h4>
											<p class="description">
												Nooit meer een werkvoorbereiding kwijtraken en je data altijd tot je beschikking! Met een account
												staat je data altijd veilig online. <br />
											</p>
										</div>
									</div>
									<div class="info info-horizontal">
										<div class="icon icon-info">
											<i class="fas fa-sign material-icons text-warning"></i>
										</div>
										<div class="description">
											<h4 class="card-title">Lulkt het niet? Wij helpen!</h4>
											<p class="description">
												Jouw project staat voorop. Een nieuwe functie? Geen probleem! Wij staan voor je klaar! <br />
											</p>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="socialIcons">
										<div class="socialIcon google" @click="loginWithGoogle()">
											<i class="fab fa-google"></i>
										</div>
										<div class="socialIcon facebook disabledIcon">
											<i class="fab fa-facebook"></i>
										</div>
										<div class="socialIcon microsoft disabledIcon">
											<i class="fab fa-microsoft"></i>
										</div>
									</div>
									<h4 class="text-center mt-4 mb-3">Of registreer je met je e-mail</h4>
									<div class="input-group mb-2">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-envelope"></i></span>
										</div>
										<input type="email" placeholder="Email" v-model="email" required="required" class="form-control" />
									</div>
									<div class="input-group mb-2">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-key"></i></span>
										</div>
										<input type="password" placeholder="Wachtwoord" v-model="password" required="required" class="form-control" />
									</div>
									<div class="input-group mb-2">
										<div class="input-group-prepend">
											<span class="input-group-text"><i class="fas fa-unlock"></i></span>
										</div>
										<input
											type="password"
											placeholder="Herhaal wachtwoord"
											v-model="passwordCheck"
											required="required"
											class="form-control"
										/>
									</div>
									<!-- Algemene voorwaarden -->
									<!-- <div class="form-check ml-3 mt-4">
										<label class="form-check-label">
											<input class="form-check-input" type="checkbox" value="" checked="" />
											<span class="form-check-sign">
												<span class="check"></span>
											</span>
											Ik stem in met de <a href="#something"> algemene voorwaarden</a>.
										</label>
									</div> -->
								</div>
							</div>
						</div>
					</div>
					<button type="submit" class="btn btn-lg btn-block btn-success">Registreren</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from '@/components/Card-header.vue';
import fb from 'firebase/app';
import 'firebase/auth';

export default {
	name: 'Register',
	components: {
		CardHeader
	},
	data() {
		return {
			email: '',
			password: '',
			passwordCheck: ''
		};
	},
	methods: {
		async register() {
			if (this.password === this.passwordCheck) {
				const register = await this.$store.dispatch('register', {
					email: this.email,
					password: this.password
				});
				if (register.code) return this.handleError(register);

				this.successMsg();
				this.resetForm();
				this.$router.push('/account');
			} else {
				this.handleError({
					code: 'password dont match'
				});
			}
		},
		async loginWithGoogle() {
			const provider = new fb.auth.GoogleAuthProvider();
			const login = await this.$store.dispatch('loginWithSocial', provider);
			if (login.code) return this.handleError(login);

			this.successMsg();
			this.resetForm();
			this.$router.push('/account');
		},
		async loginWithFacebook() {
			const provider = new fb.auth.FacebookAuthProvider();
			const login = await this.$store.dispatch('loginWithSocial', provider);
			if (login.code) return this.handleError(login);

			this.successMsg();
			this.resetForm();
			this.$router.push('/account');
		},
		async loginWithMicrosoft() {
			const provider = new fb.auth.OAuthProvider('microsoft.com');
			const login = await this.$store.dispatch('loginWithSocial', provider);
			if (login.code) return this.handleError(login);
			if (login.user) {
				this.successMsg();
				this.resetForm();
				this.$router.push('/account');
			}
		},
		successMsg() {
			window.Swal.mixin({
				type: 'success',
				title: 'Het account is succesvol aangemaakt.',
				toast: true,
				position: 'top-end',
				showConfirmButton: false,
				timer: 3000
			}).fire();
		},
		handleError(error) {
			// E-mailadres is al in gebruik
			if (error.code === 'auth/email-already-in-use') {
				window.Swal.fire({
					title: 'Al een account?',
					text: 'Dit e-mailadres is al in gebruik... Waarschijnlijk heb je al een account. Probeer in te loggen.',
					confirmButtonColor: '#F33527',
					confirmButtonText: 'Ik begrijp het!',
					type: 'error'
				});
			}
			if (error.code === 'auth/weak-password') {
				window.Swal.fire({
					title: 'Slecht wachtwoord?',
					text: 'Dit wachtwoord is niet sterk genoeg. Maak een sterker wachtwoord en probeer het opnieuw.',
					confirmButtonColor: '#F33527',
					confirmButtonText: 'Ik begrijp het!',
					type: 'error'
				});
			}
			// wachtwoord komt niet overeen
			if (error.code === 'password dont match') {
				window.Swal.fire({
					title: 'Controleer wachtwoord',
					text: 'Het controle wachtwoord komt niet overeen met je eerste invoer. Zorg dat je het wachtwoordt goed typt.',
					confirmButtonColor: '#F33527',
					confirmButtonText: 'Ik begrijp het!',
					type: 'error'
				});
			}
		},
		resetForm() {
			this.name = '';
			this.email = '';
			this.password = '';
			this.passwordCheck = '';
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
	margin-top: 3px;
	margin-right: 10px;
	font-size: 1.6em;
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
