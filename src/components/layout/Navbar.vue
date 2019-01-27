<template>
	<nav class="navbar navbar-expand-lg navbar-transparent">
		<div class="container-fluid">
			<div class="navbar-wrapper">
				<a class="navbar-brand" href="#pablo">{{pageName()}}</a>
			</div>
			<button @click="sidebarToggle()" class="navbar-toggler" type="button" data-toggle="collapse" aria-controls="navigation-index"
			 aria-expanded="false" aria-label="Toggle navigation">
				<span class="sr-only">Toggle navigation</span>
				<span class="navbar-toggler-icon icon-bar"></span>
				<span class="navbar-toggler-icon icon-bar"></span>
				<span class="navbar-toggler-icon icon-bar"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end">
				<ul class="navbar-nav">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
						 aria-expanded="false">
							<i class="fas fa-cog"></i>
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<a class="dropdown-item" href="#">Statistieken</a>
							<a class="dropdown-item" href="#">Admin</a>
							<hr>
							<a class="dropdown-item" href="#">Instellingen</a>
						</div>
					</li>
					<li class="nav-item">
						<a class="mx-3">
							<i class="fas fa-user" @click="$store.state.appData.page = 20"></i>
						</a>
					</li>
					<li class="nav-item">
						<a class="mx-3" v-if="user === null" @click="$store.state.appData.page = 20">
							<i class="fas fa-lock-open"></i>
							<label class="ml-2">Login</label>
						</a>
					</li>
					<li class="nav-item">
						<a class="mx-3" v-if="user != null" @click="logout()">
							<i class="fas fa-lock"></i>
							<label class="ml-2">Logout</label>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script>
	import $ from "jquery";

	export default {
		name: "Navbar",
		computed: {
			user() {
				return this.$store.state.appData.user
			},
			currentPage() {
				return this.$store.state.appData.page
			},
			sidebarOpen() {
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
					return "Dashboard";
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
			sidebarToggle() {
				this.$store.state.appData.sidebarOpen = !this.$store.state.appData.sidebarOpen

				if (this.sidebarOpen) {
					$("html").addClass("nav-open");
					$(".navbar-toggler").addClass("toggled");

				} else {
					$("html").removeClass("nav-open");
					$(".navbar-toggler").removeClass("toggled");
				}
			}
		}
	};
</script>


<style scoped>
	a,
	a>label {
		cursor: pointer;
	}
	label{
		margin-bottom: 0px !important;
	}
</style>