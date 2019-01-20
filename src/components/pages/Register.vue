<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form role="form" @submit.prevent="register()">
					<div class="card">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Registreer</h3>
							<p class="card-category">Voor een gratis account</p>
						</div>
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
	export default {
		name: "Register",
		data(){
			return{
				name: '',
				email: '',
				password: '',
				passwordCheck: ''
			}
		},
		props: ["appData"],
		methods: {
			register(){
				if(this.password === this.passwordCheck){
					this.appData.firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch((error) => {
						console.log(error.code, error.message)
					});

					this.name = ""
					this.email = ""
					this.password = ""
					this.passwordCheck = ""
				}else{
					alert('Het controle paswoord komt niet overeen!')
				}
			}
		}
	};
</script>


<style scoped>

</style>