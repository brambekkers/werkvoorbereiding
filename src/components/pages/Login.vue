<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form role="form" @submit.prevent="login()">
					<div class="card">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Login</h3>
							<p class="card-category">Beheer je eigen projecten!</p>
						</div>
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
	export default {
		name: "Login",
		data(){
			return{
				email: '',
				password: ''
			}
		},
		methods: {
			login(){
				this.$store.state.appData.firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
					console.log(error.code, error.message)
				});

				this.email = ""
				this.password = ""
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