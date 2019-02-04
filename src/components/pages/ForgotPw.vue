<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form role="form" @submit.prevent="forgotPassword">
					<div class="card">
						<CardHeader :text="{title: 'Wachtwoord', subtitle: 'Als je het even niet meer weet' }"/>
						<div class="card-body">
							<div class="row">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
									<input type="email" placeholder="Email" v-model="email" required="required" class="form-control">
								</div>
							</div>
						</div>

					</div>
					<button type="submit" class="btn btn-lg btn-block btn-danger">Wachtwoord opvragen</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	import CardHeader from "./attributes/Card-header.vue";

	export default {
		name: "ForgotPw",
		components: { CardHeader },
		data(){
			return {
				email: ''
			}
		},
		methods: {
			forgotPassword(){
				this.$store.state.appData.firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
					swal({
						title: "Reset e-mail",
						text: `Er is een wachtwoord reset email verstuurd naar ${this.email}. Volg de instructies in de mail om eht wachtwoord te resetten.`,
						dangerMode: false,
						icon: "success",
					})
					this.email = ''
				}).catch((error) => {
					console.log(error)
					this.handleError(error);
				});
				
			},
			handleError(error){
				if(error.code === "auth/invalid-email"){
					swal({
						title: "niet geldig",
						text: "Dit is geen geldig email adres.",
						dangerMode: true,
						icon: "error",
					})
				}
				if(error.code === "auth/user-not-found"){
					swal({
						title: "Verkeerde email?",
						text: "Dit e-mailadres is niet bij ons bekend.",
						dangerMode: true,
						icon: "error",
					})
				}
			}
		}
	};
</script>


<style scoped>

</style>