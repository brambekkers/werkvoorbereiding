<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form role="form" @submit.prevent="register()">
					<div class="card">
						<CardHeader :text="{title: 'Registreer', subtitle: 'Voor een gratis account' }"/>							
						<div class="card-body">
							<div class="row">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-user"></i></span></div>
									<input type="text" placeholder="Naam" v-model="name" required="required" class="form-control">
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
									<input type="email" placeholder="Email" v-model="email" required="required" class="form-control">
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-key"></i></span></div> <input
									 type="password" placeholder="Wachtwoord" v-model="password" required="required" class="form-control">
								</div>
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-unlock"></i></span></div> <input
									 type="password" placeholder="Herhaal wachtwoord" v-model="passwordCheck" required="required" class="form-control">
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
	import CardHeader from "./attributes/Card-header.vue";
	import Swal from 'sweetalert2'

	export default {
		name: "Register",
		components: { CardHeader },
		data(){
			return{
				name: '',
				email: '',
				password: '',
				passwordCheck: ''
			}
		},
		methods: {
			register(){
				let that = this
				if(this.password === this.passwordCheck){
					this.$store.state.appData.firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
					.then(() => {
						that.$store.state.appData.firebase.auth().currentUser.sendEmailVerification();

						const Toast = Swal.mixin({
							toast: true,
							position: 'top-end',
							showConfirmButton: false,
							timer: 3000
						});

						Toast.fire({
							type: 'success',
							title: 'Het account is succesvol aangemaakt.'
						})

						that.$store.state.appData.page = 20;
					})
					.catch((error) => {
						this.handleError(error);
					});
					this.resetForm()
				}else{
					this.handleError({code:'password dont match' });
				}
			},
			handleError(error){
				// E-mailadres is al in gebruik
				if(error.code === "auth/email-already-in-use"){
					Swal.fire({
						title: "Al een account?",
						text: "Dit e-mailadres is al in gebruik... Waarschijnlijk heb je al een account. Probeer in te loggen.",
						confirmButtonColor: '#F33527',
						confirmButtonText: 'Ik begrijp het!',
						type: "error",
					})
				}
				if(error.code === "auth/weak-password"){
					Swal.fire({
						title: "Slecht wachtwoord?",
						text: "Dit wachtwoord is niet sterk genoeg. Maak een sterker wachtwoord en probeer het opnieuw.",
						confirmButtonColor: '#F33527',
						confirmButtonText: 'Ik begrijp het!',
						type: "error",
					})
				}
				// wachtwoord komt niet overeen
				if(error.code === "password dont match"){
					Swal.fire({
						title: "Controleer wachtwoord",
						text: "Het controle wachtwoord komt niet overeen met je eerste invoer. Zorg dat je het wachtwoordt goed typt.",
						confirmButtonColor: '#F33527',
						confirmButtonText: 'Ik begrijp het!',
						type: "error",
					})
				}
			},
			resetForm(){
				this.name = ""
				this.email = ""
				this.password = ""
				this.passwordCheck = ""
			}
		}
	};
</script>


<style scoped>

</style>