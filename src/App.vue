<template>
	<div id="app" class="wrapper" :class="{ darkmode: darkMode }">
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
			<Sidebar v-if="!landingPage" />
		</transition>
		<Main v-if="!landingPage" />
		<Help v-if="!landingPage" />
	</div>
</template>

<script>
import fb from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import 'vue2-animate/dist/vue2-animate.min.css';
import './assets/css/material-dashboard.css';

import Sidebar from './components/layout/Sidebar';
import Main from './components/layout/Main';
import Help from './components/pages/attributes/Help.vue';
import Landing from './components/pages/Landing.vue';

export default {
	name: 'app',
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
	components: {
		Sidebar,
		Main,
		Help,
		Landing
	},
	created() {
		this.$store.commit('initializeFbApp', fb.initializeApp(this.fbConfig));
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
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === 'licht' ? false : true;
		}
	}
};
</script>

<style lang="scss">
#app {
	overflow-x: hidden;
}

.main-panel {
	box-sizing: content-box;

	.content {
		padding: 30px 15px;
		margin-top: 10px;
		min-height: calc(100vh - 155px);
	}
}

.darkmode {
	background: #303030 !important;

	hr {
		background: #e7e7e7;
	}

	.navbar {
		i,
		a,
		.icon-bar {
			color: white !important;
		}

		.dropdown-menu {
			background: #343a40 !important;
			.dropdown-item:hover {
				background: #3f444b !important;
			}
		}

		.navbar-toggler .icon-bar {
			background-color: white !important;
		}
	}

	.sidebar {
		background: #212121 !important;

		&::before,
		.off-canvas-sidebar nav .navbar-collapse::before {
			background: #212121 !important;
		}

		i,
		p,
		a {
			color: white !important;
		}
	}

	div.card {
		background: #424242 !important;
		-webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
		box-shadow: 2 1px 4px 0 rgba(0, 0, 0, 0.5);
		i,
		p,
		a,
		input,
		select,
		h6,
		h5,
		h4 {
			color: white !important;
		}

		.stap {
			background: rgba(0, 0, 0, 0.2);
		}

		.valutaSelect {
			background-color: #555555;
		}
	}
}

.swal-text {
	text-align: center;
}

.stats a {
	color: #999999;
}

.swal2-progress-steps {
	.swal2-progress-step {
		background: #bbb !important;
	}
	.swal2-active-progress-step {
		background: #666 !important;
	}
	.swal2-progress-step-line {
		background: #bbb !important;
	}
}
</style>
