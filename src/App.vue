<template>
	<div
		id="app"
		class="wrapper"
	>
		<transition
			name="bounce"
			mode="out-in"
			:duration="{ enter: 1000, leave: 1000 }"
			enter-active-class="bounceInLeft"
			leave-active-class="bounceOutUp"
		>
			<Landing v-if="landingPage" />
		</transition>

		<transition
			name="bounce"
			mode="out-in"
			:duration="{ enter: 1000, leave: 1000 }"
			enter-active-class="bounceInLeft"
			leave-active-class="bounceOutLeft"
		>
			<Sidebar
				data-html2canvas-ignore
				v-if="!landingPage"
			/>
		</transition>
		<Main />
		<!-- <Help data-html2canvas-ignore v-if="page != 0"/> -->
	</div>
</template>

<script>
import "vue2-animate/dist/vue2-animate.min.css";
import "./assets/css/material-dashboard.css";

import fb from "firebase/app";
import "firebase/auth";
import "firebase/database";

// To Do: checken hoe ik deze maar één keer hoef te importeren
// Nu krijg ik error als ik ze niet per componenent importeer
import $ from "jquery";
import popper from "popper.js";
import bootstrap from "bootstrap";
import Swal from "sweetalert2";

import Sidebar from "./components/layout/Sidebar";
import Main from "./components/layout/Main";
import Help from "./components/pages/attributes/Help.vue";
import Landing from "./components/pages/Landing.vue";

export default {
	name: "app",
	data() {
		return {
			fbConfig: {
				apiKey: process.env.VUE_APP_apiKey,
				authDomain: process.env.VUE_APP_authDomain,
				databaseURL: process.env.VUE_APP_databaseURL,
				projectId: process.env.VUE_APP_projectId,
				storageBucket: process.env.VUE_APP_storageBucket,
				messagingSenderId: process.env.VUE_APP_messagingSenderId
			}
		};
	},
	watch: {
		werkvoorbereiding: {
			handler(newValue) {
				// this.firebase.WvbToFb(this.werkvoorbereiding);
			},
			deep: true
		}
	},
	components: {
		Sidebar,
		Main,
		Help,
		Landing
	},
	created() {
		this.$store.commit("initializeFbApp", fb.initializeApp(this.fbConfig));
		this.authStateChange();
	},
	methods: {
		authStateChange() {
			this.$store.getters.fb.auth().onAuthStateChanged(user => {
				this.$store.commit("user", user ? user : null);
				if (user) this.$store.dispatch("FbDatabaseListner", user.uid);
			});
		}
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		landingPage() {
			return this.$store.getters.landingPage;
		},
		sidebar() {
			return this.$store.getters.sidebar;
		}
	}
};
</script>

<style>
html {
	overflow-x: hidden;
}

.main-panel > .content {
	margin-top: 10px;
	padding: 30px 15px;
	min-height: calc(100vh - 165px);
}
.swal-text {
	text-align: center;
}

.stats a {
	color: #999999;
}
</style>