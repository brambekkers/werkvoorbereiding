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
					<li class="nav-item dropdown" v-if="user">
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true"
						 aria-expanded="false">
							<i class="fas fa-cog"></i>
						</a>
						<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
							<a class="dropdown-item" v-if="user" @click="$store.state.appData.page = 30">Statistieken</a>
							<a class="dropdown-item" v-if="user === null" @click="loginMsg">Statistieken</a>
							<a class="dropdown-item" v-if="admin" @click="$store.state.appData.page = -99">Admin</a>
							<a class="dropdown-item" @click="$store.state.appData.page = 50">Instellingen</a>
						</div>
					</li>
					<li class="nav-item">
						<a class="mx-3">
							<i class="fas fa-user" @click="$store.state.appData.page = 20" v-if="user"></i>
						</a>
					</li>
					<li class="nav-item">
						<a class="mx-3" v-if="user === null" @click="$store.state.appData.page = 20">
							<i class="fas fa-lock-open"></i>
							<label class="ml-2">Login</label>
						</a>
					</li>
					<li class="nav-item">
						<a class="mx-3" v-if="user" @click="logout()">
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
			admin() { return this.$store.state.appData.admin },
			user() { return this.$store.state.appData.user },
			currentPage() { return this.$store.state.appData.page },
			sidebarOpen() { return this.$store.state.appData.sidebarOpen }
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
				if (this.currentPage === 40) {
					return "Over";
				}
				if (this.currentPage === 41) {
					return "Privacy";
				}
				if (this.currentPage === 50) {
					return "Instellingen";
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
			},
			loginMsg() {
				swal("Je moet eerst inloggen om je statistieken te zien!");
			}
		}
	};
</script>


<style scoped>
	a,
	a>label {
		cursor: pointer;
	}

	label {
		margin-bottom: 0px !important;
	}

	.dropdown-menu .dropdown-item:hover,
	.dropdown-menu .dropdown-item:focus,
	.dropdown-menu a:hover,
	.dropdown-menu a:focus,
	.dropdown-menu a:active {
		-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(200, 200, 200, 0.4);
		box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(200, 200, 200, 0.4);
		background-color: #999999;
		color: #FFFFFF;
	}
</style>