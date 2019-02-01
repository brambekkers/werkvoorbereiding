<template>
	<main class="main-panel" @click="closeSidebar()">
		<Navbar data-html2canvas-ignore/>

		<!-- Project pages -->
		<Gegevens v-if="currentPage === 1" />
		<Componenten v-if="currentPage === 2" />
		<OverigeMaterialen v-if="currentPage === -3" />
		<Materialen v-if="currentPage === 3" />
		<Maten v-if="currentPage === 4" />
		<Gereedschap v-if="currentPage === 5" />
		<Planning v-if="currentPage === 6" />
		<Dashboard v-if="currentPage === 7" />

		<!-- Opties -->
		<MateriaalOpties v-if="currentPage === -2" />
		<PlanningOpties v-if="currentPage === -5" />

		<!-- Import/Export -->
		<Importeren v-if="currentPage === 9" />
		<Exporteren v-if="currentPage === 10" />

		<!-- Profile pages -->
		<Login v-if="currentPage === 20 && !user" />
		<Profile v-if="currentPage === 20 && user" />
		<Register v-if="currentPage === 21" />
		<ForgotPw v-if="currentPage === 22" />
		<Projecten v-if="currentPage === 16" />
		<Statistieken v-if="currentPage === 30" />

		<Over v-if="currentPage === 40" />
		<Privacy v-if="currentPage === 41" />
		<licence v-if="currentPage === 42" />
		<Admin v-if="currentPage === -99" />

		<Footer data-html2canvas-ignore/>
	</main>
</template>

<script>
	import Navbar from "./Navbar";
	import Footer from "./Footer";

	// project pages
	import Gegevens from "../pages/Gegevens.vue";
	import Componenten from "../pages/Componenten.vue";
	import Materialen from "../pages/Materialen.vue";
	import OverigeMaterialen from "../pages/OverigeMaterialen.vue"
	import Maten from "../pages/Maten.vue";
	import Gereedschap from "../pages/Gereedschap.vue";
	import Planning from "../pages/Planning.vue";
	import Dashboard from "../pages/Dashboard.vue";

	// optie pages
	import MateriaalOpties from "../pages/MateriaalOpties.vue";
	import PlanningOpties from "../pages/PlanningOpties.vue";

	import Importeren from "../pages/Importeren.vue";
	import Exporteren from "../pages/Exporteren.vue";

	// Profile pages
	import Login from "../pages/Login.vue";
	import Register from "../pages/Register.vue";
	import ForgotPw from "../pages/ForgotPw.vue";
	import Profile from "../pages/Profile.vue";
	import Projecten from "../pages/Projecten.vue";
	import Statistieken from "../pages/Statistieken.vue";

	// Overige
	import Over from "../pages/Over.vue";
	import Privacy from "../pages/Privacy.vue";
	import Admin from "../pages/Admin.vue";
	import Licence from "../pages/Licence.vue"

	import $ from "jquery"

	export default {
		name: "Main",
		computed: {
			currentPage() {
				return this.$store.state.appData.page
			},
			user() {
				return this.$store.state.appData.user
			}
		},
		components: {
			Navbar,
			Footer,
			Login,
			Register,
			ForgotPw,
			Profile,
			Projecten,
			Gegevens,
			Componenten,
			Materialen,
			OverigeMaterialen,
			Maten,
			Gereedschap,
			Planning,
			Dashboard,
			MateriaalOpties,
			PlanningOpties,
			Importeren,
			Exporteren,
			Statistieken,
			Admin,
			Over,
			Privacy,
			Licence
		},
		methods: {
			closeSidebar() {
				if (this.$store.state.appData.sidebarOpen) {
					// console.log('klik')

					// if(){
					// 	$("html").removeClass("nav-open");
					// 	$(".navbar-toggler").removeClass("toggled");
					// }
					
				}

			}
		}
	};
</script>


<style scoped>
</style>