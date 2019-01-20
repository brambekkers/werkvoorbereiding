<template>
	<nav class="navbar navbar-expand-lg navbar-transparent">
		<div class="container-fluid">
			<div class="navbar-wrapper">
				<label class="navbar-brand">{{pageName()}}</label>
			</div>
			<div class="justify-content-end">
				<a class="mx-3">
					<i class="fas fa-cogs"></i>
				</a>
				<a class="mx-3">
					<i class="fas fa-user" @click="$store.state.appData.page = 20"></i>
				</a>

				<a class="mx-3" v-if="user === null" @click="$store.state.appData.page = 20">
					<i class="fas fa-lock-open"></i>
					<label class="ml-2">Login</label>
				</a>
				<a class="mx-3" v-if="user != null" @click="logout()">
					<i class="fas fa-lock"></i>
					<label class="ml-2">Logout</label>
				</a>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" @click="sidebarToggle()">
					<span class="sr-only">Toggle navigation</span>
					<span class="navbar-toggler-icon icon-bar"></span>
					<span class="navbar-toggler-icon icon-bar"></span>
					<span class="navbar-toggler-icon icon-bar"></span>
				</button>
			</div>
		</div>
	</nav>
</template>

<script>
	import $ from "jquery";

	export default {
		name: "Navbar",
		computed: {
			user(){
				return this.$store.state.appData.user
			},
			currentPage(){
				return this.$store.state.appData.page
			},
			sidebarOpen(){
				return this.$store.state.appData.sidebarOpen
			}
		},
		methods: {
			logout() {
				this.$store.state.appData.firebase.auth().signOut().then(function () {
					console.log('User Logout')
				}).catch(function (error) {
					console.error(error)
				});
			},
			pageName() {
				if (this.currentPage === -99) {
					return "Admin";
				}
				if (this.currentPage === -5) {
					return "Planning en kosten";
				}
				if (this.currentPage === -3) {
					return "Overige materialen";
				}
				if (this.currentPage === -2) {
					return "Materiaal opties";
				}
				if (this.currentPage === 1) {
					return "Gegevens";
				}
				if (this.currentPage === 2) {
					return "Componenten";
				}
				if (this.currentPage === 3) {
					return "Materialen";
				}
				if (this.currentPage === 4) {
					return "Maten";
				}
				if (this.currentPage === 5) {
					return "Gereedschap";
				}
				if (this.currentPage === 6) {
					return "Planning";
				}
				if (this.currentPage === 7) {
					return "Dashbord";
				}
				if (this.currentPage === 9) {
					return "Importeren";
				}
				if (this.currentPage === 10) {
					return "Exporteren";
				}
				if (this.currentPage === 16) {
					return "Projecten";
				}
				if (this.currentPage === 20 && !this.user) {
					return "Login";
				}
				if (this.currentPage === 20 && this.user) {
					return "Profiel";
				}
				if (this.currentPage === 21) {
					return "Registreren";
				}
				if (this.currentPage === 22) {
					return "Wachtwoord vergeten";
				}
				if (this.currentPage === 30) {
					return "Statistieken";
				}
			},
			sidebarToggle(){
				this.$store.state.appData.sidebarOpen = !this.$store.state.appData.sidebarOpen

				if(this.sidebarOpen){
					$( "html" ).addClass( "nav-open" );
					$( ".navbar-toggler" ).addClass( "toggled" );
					 
				}else{
					$( "html" ).removeClass( "nav-open" );
					$( ".navbar-toggler" ).removeClass( "toggled" );
				}
			}
		}
	};
</script>


<style scoped>
	a, a > label {
		cursor: pointer;
	}
</style>