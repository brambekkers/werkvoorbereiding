<template>
  <main class="main-panel">
    <Navbar/>

	<!-- Project pages -->
	<Gegevens v-if="currentPage === 1"/>
	<Componenten v-if="currentPage === 2"/>
	<Materialen v-if="currentPage === 3"/>
	<Maten v-if="currentPage === 4"/>
	<Gereedschap v-if="currentPage === 5"/>
	<Planning v-if="currentPage === 6"/>

	<!-- Profile pages -->
	<Login v-if="currentPage === 20 && !user"/>
	<Profile v-if="currentPage === 20 && user"/>
	<!-- <Register v-if="currentPage === 21"/> -->
	<!-- <ForgotPw v-if="currentPage === 22"/> -->

    <Footer/>
  </main>
</template>

<script>
import Navbar from "./Navbar";
import Content from "./Content";
import Footer from "./Footer";

// project pages
import Gegevens from "../pages/Gegevens.vue";
import Componenten from "../pages/Componenten.vue";
import Materialen from "../pages/Materialen.vue";
import Maten from "../pages/Maten.vue";
import Gereedschap from "../pages/Gereedschap.vue";
import Planning from "../pages/Planning.vue";

// Profile pages
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import ForgotPw from "../pages/ForgotPw.vue";
import Profile from "../pages/Profile.vue";


export default {
  name: "Main",
  computed: {
	  currentPage(){
		  return this.$store.state.appData.page
	  },
	  user(){
		  return this.$store.state.appData.user
	  }
  },
  components: {
    Navbar,
    Content,
	Footer,
	Login,
	Register,
	ForgotPw,
	Profile,
	Gegevens,
	Componenten,
	Materialen,
	Maten,
	Gereedschap,
	Planning
  },
  methods: {

  }
};
</script>


<style scoped>
</style>
