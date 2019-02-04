<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form role="form" @submit.prevent="login()">
					<div class="card">
						<CardHeader :text="{title: 'Login', subtitle: 'Beheer je eigen projecten!' }"/>
						<div class="card-body">
							<div class="row">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
									<input type="email" placeholder="Email" v-model="email" required="required" class="form-control">
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div> <input
									 type="password" placeholder="Wachtwoord" v-model="password" required="required" class="form-control">
								</div>
							</div>
						</div>

					</div>
					<button type="submit" class="btn btn-lg btn-block btn-success">Inloggen</button>
					<div class="text-center">
						<label>Nog geen account? <a class="color-teal" @click="$store.state.appData.page = 21">Account aan maken</a><br>
						of <a class="color-teal" @click="$store.state.appData.page = 22">wachtwoord vergeten</a></label>
					</div>
					
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import CardHeader from "./attributes/Card-header.vue";
	import Swal from 'sweetalert2'

	export default {
		name: "Login",
		components: { CardHeader },
		data(){
			return{
				email: '',
				password: ''
			}
		},
		methods: {
			login(){
				this.$store.state.appData.firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((test)=>{
					const Toast = Swal.mixin({
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 3000
					});

					Toast.fire({
						type: 'success',
						title: 'Succesvol aangemeld'
					})
				}).catch((error) => {
					this.handleError(error);					
				});

				this.email = ""
				this.password = ""
			},
			handleError(error){
				// Ongeldig e-mailadres
					if(error.code === "auth/invalid-email"){
						Swal.fire({
							title: "Niet geldig",
							text: "Dit is geen geldig email adres.",
							confirmButtonColor: '#F33527',
							confirmButtonText: 'Ik begrijp het!',
							type: "error",
						})
					}
					// User niet aanwezig in database
					if(error.code === "auth/user-not-found"){
						Swal.fire({
							title: "Niet gevonden",
							text: "Dit e-mailadres is niet bij ons bekend... Probeer het met een ander e-mailadres nog een keer.",
							confirmButtonColor: '#F33527',
							confirmButtonText: 'Ik begrijp het!',
							type: "error",
						})
					}
					// Verkeerd wachtwoord
					else if(error.code === "auth/wrong-password"){
						Swal.fire({
							title: "Verkeerd wachtwoord",
							text: "Helaas is dit niet jouw juiste wachtwoord. Probeer het gerust nog een keer.",
							confirmButtonColor: '#F33527',
							confirmButtonText: 'Ik begrijp het!',
							type: "error",
						})
					}
					// Accound is uitgeschakeld
					else if(error.code === "auth/user-disabled"){
						Swal.fire({
							title: "Uitgeschakeld",
							text: "Dit account is tijdelijk niet actief. Neem contact op met de beheerder voor verdere informatie.",
							confirmButtonColor: '#F33527',
							confirmButtonText: 'Ik begrijp het!',
							type: "error",
						})
					}
			}
		}
	};
</script>


<style scoped>
	a{
		cursor: pointer;
		color: #4AA64E !important;
	}
</style>