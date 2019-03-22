<template>
	<main class="main-panel">
		<Navbar data-html2canvas-ignore v-if="currentPage > 0"/>
				
		<transition 
			name="bounce" 
			mode="out-in" 
			:duration="{ enter: 1000, leave: 1000 }" 
			enter-active-class="bounceInLeft"
  			leave-active-class="bounceOutRight">
			<!-- Project pages -->
			<Gegevens v-if="currentPage === 1"/>
			<Componenten v-if="currentPage === 2"/>
			<OverigeMaterialen v-if="currentPage === -3"/>
			<Materialen v-if="currentPage === 3"/>
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

			<Instellingen v-if="currentPage === 50" />
			<Over v-if="currentPage === 40" />
			<Privacy v-if="currentPage === 41" />
			<licence v-if="currentPage === 42" />
			<Admin v-if="currentPage === -99" />
		</transition>
		
		<transition name="fade"> 
			<div class="exitSidebarDiv" v-if="sideBarOpen" @click="closeSidebar()" />
		</transition>
		<WaitScreen data-html2canvas-ignore v-if="waitScreenBoolean" />
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
	import Instellingen from "../pages/Instellingen.vue";
	import Over from "../pages/Over.vue";
	import Privacy from "../pages/Privacy.vue";
	import Admin from "../pages/Admin.vue";
	import Licence from "../pages/Licence.vue"
	import WaitScreen from "../pages/attributes/WaitScreen.vue"

	import $ from "jquery"
	import Animate from "vue2-animate/dist/vue2-animate.min.css"

	export default {
		name: "Main",
		computed: {
			currentPage() 	{ return this.$store.state.appData.page },
			sideBarOpen() 	{ return this.$store.state.appData.sidebarOpen},
			user() 			{ return this.$store.state.appData.user },
			waitScreenBoolean() 	{ return this.$store.state.appData.waitScreen }
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
			Instellingen,
			Over,
			Privacy,
			Licence,
			WaitScreen,
		},
		methods: {
			closeSidebar() {
				if (this.sideBarOpen) {
					$("html").removeClass("nav-open");
					$(".navbar-toggler").removeClass("toggled");
					this.$store.state.appData.sidebarOpen = false
				}
			}
		}
	};
</script>


<style scoped>
	.exitSidebarDiv{
		position: absolute;
		z-index: 999;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.4)
	}
</style>