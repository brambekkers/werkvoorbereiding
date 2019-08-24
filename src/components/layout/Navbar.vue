<template>
	<nav class="navbar navbar-expand-lg navbar-transparent">
		<div class="container-fluid">
			<div class="navbar-wrapper">
				<router-link
					to="/"
					class="navbar-brand"
					href="#"
					v-if="!landingPage"
				>{{$route.name}}</router-link>
			</div>
			<button
				@click="sidebarToggle()"
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				aria-controls="navigation-index"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="sr-only">Toggle navigation</span>
				<span class="navbar-toggler-icon icon-bar"></span>
				<span class="navbar-toggler-icon icon-bar"></span>
				<span class="navbar-toggler-icon icon-bar"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end">
				<ul class="navbar-nav">
					<li
						class="nav-item dropdown"
						v-if="user"
					>
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdownMenuLink"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i class="fas fa-cog"></i>
						</a>
						<div
							class="dropdown-menu"
							aria-labelledby="navbarDropdownMenuLink"
						>
							<router-link
								to="/statistieken"
								class="dropdown-item"
								v-if="user"
								@click="$store.state.appData.page = 30"
							>Statistieken</router-link>
							<a
								class="dropdown-item"
								v-if="user === null"
								@click="loginMsg"
							>Statistieken</a>
							<router-link
								to="/admin"
								class="dropdown-item"
								v-if="admin"
							>Admin</router-link>
							<router-link
								to="/instellingen"
								class="dropdown-item"
							>Instellingen</router-link>
						</div>
					</li>
					<li class="nav-item">
						<router-link
							class="mx-3"
							to="/profiel"
							v-if="user"
						>
							<i class="fas fa-user"></i>
						</router-link>
					</li>
					<li class="nav-item">
						<router-link
							class="mx-3"
							v-if="!user"
							to="/login"
						>
							<i class="fas fa-lock-open"></i>
							<label class="ml-2">Login</label>
						</router-link>
					</li>
					<li class="nav-item">
						<a
							class="mx-3"
							v-if="user"
							@click="$store.dispatch('logout')"
						>
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
import Swal from "sweetalert2";

export default {
	name: "Navbar",
	computed: {
		admin() {
			return this.$store.getters.admin;
		},
		user() {
			return this.$store.getters.user;
		},
		landingPage() {
			return this.$store.getters.landingPage;
		},
		sidebar() {
			return this.$store.getters.sidebar;
		}
	},
	methods: {
		sidebarToggle() {
			this.$store.commit("sidebar", !this.sidebar);

			if (this.sidebar) {
				$("html").addClass("nav-open");
				$(".navbar-toggler").addClass("toggled");
			} else {
				$("html").removeClass("nav-open");
				$(".navbar-toggler").removeClass("toggled");
			}
		},
		loginMsg() {
			Swal.fire("Je moet eerst inloggen om je statistieken te zien!");
		}
	}
};
</script>


<style scoped  lang="scss">
.nav-item {
	.mx-3 {
		color: #555;
	}
}

a,
a > label {
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
	-webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(200, 200, 200, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(200, 200, 200, 0.4);
	background-color: #999999;
	color: #ffffff;
}
</style>