<template>
	<div class="content py-auto">
		<div class="container-fluid">
			<div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
				<form role="form" @submit.prevent="forgotPassword">
					<div class="card">
						<div class="card-header card-header-warning">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Wachtwoord</h3>
							<p class="card-category">Als je het even niet meer weet</p>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="input-group mb-2">
									<div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-envelope"></i></span></div>
									<input type="email" placeholder="Email" v-model="email" required="required" class="form-control">
								</div>
							</div>
						</div>

					</div>
					<button type="submit" class="btn btn-lg btn-block btn-warning">Wachtwoord opvragen</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "ForgotPw",
		data(){
			return {
				email: ''
			}
		},
		methods: {
			forgotPassword(){
				this.$store.state.appData.firebase.auth().sendPasswordResetEmail(this.email)

				this.email = ''
			}
		}
	};
</script>


<style scoped>

</style>