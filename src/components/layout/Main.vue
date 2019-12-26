<template>
	<main class="main-panel">
		<Navbar data-html2canvas-ignore v-if="!landingPage && !isShare" />

		<transition
			name="bounce"
			mode="out-in"
			:duration="{ enter: 1000, leave: 1000 }"
			enter-active-class="bounceInLeft"
			leave-active-class="bounceOutRight"
		>
			<router-view />
		</transition>

		<transition name="fade">
			<div class="exitSidebarDiv" v-if="sidebar" @click="closeSidebar()" />
		</transition>
		<WaitScreen data-html2canvas-ignore v-if="waitScreen" />
		<Footer data-html2canvas-ignore />
	</main>
</template>

<script>
import Navbar from "./Navbar";
import Footer from "./Footer";
import WaitScreen from "@/components/WaitScreen.vue";

export default {
	name: "Main",
	created() {
		this.closeSidebar();
	},
	computed: {
		landingPage() {
			return this.$store.getters.landingPage;
		},
		sidebar() {
			return this.$store.getters.sidebar;
		},
		user() {
			return this.$store.getters.user;
		},
		waitScreen() {
			return this.$store.state.appData.waitScreen;
		},
		isShare() {
			return this.$route.name == "share";
		}
	},
	components: {
		Navbar,
		Footer,
		WaitScreen
	},
	methods: {
		closeSidebar() {
			if (this.sidebar) {
				window.$("html").removeClass("nav-open");
				window.$(".navbar-toggler").removeClass("toggled");
				this.$store.commit("sidebar", false);
			}
		}
	}
};
</script>

<style scoped>
.exitSidebarDiv {
	position: absolute;
	z-index: 999;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
}
</style>
