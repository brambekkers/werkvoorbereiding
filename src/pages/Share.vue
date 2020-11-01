<template>
	<div class="content">
		<button
			class="btn btn-sm float-left ml-3"
			:class="{
				'bg-secondary text-white': darkMode,
				'bg-white text-secondary': !darkMode
			}"
			@click="backToWebsite"
			data-html2canvas-ignore
		>
			<i class="fas fa-chevron-left mr-2"></i>Terug
		</button>

		<DashboardContainer
			:werkvoorbereiding="werkvoorbereiding"
			:optionsOn="false"
		/>

		<div class="noWvb" v-if="!werkvoorbereiding && loading">
			<i class="loading fas fa-spinner"></i>
			<h2>Deze werkvoorbereiding wordt geladen</h2>
		</div>
		<div class="noWvb" v-if="!werkvoorbereiding && !loading">
			<i class="far fa-surprise"></i>
			<h2>Deze werkvoorbereiding bestaat niet</h2>
			<p>Het kan zijn dat deze werkvoorbereiding is verwijderd</p>
		</div>
	</div>
</template>

<script>
import fb from "firebase/app";
import "firebase/auth";
import "firebase/database";

import DashboardContainer from "@/components/dashboard/Dashboard-container.vue";

export default {
	name: "Dashboard",
	layout: "share",
	components: { DashboardContainer },
	data() {
		return {
			loading: true,
			werkvoorbereiding: null,
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
	mounted() {
		if (!fb.apps.length) {
			this.$store.commit("initializeFbApp", fb.initializeApp(this.fbConfig));
		}

		this.getWVB();
		setTimeout(() => {
			this.loading = false;
		}, 5000);

		this.$store.state.dashboard.filter.gegevens = true;
	},
	computed: {
		fb() {
			return this.$store.getters.fb;
		},
		uid() {
			return this.$route.params.uid;
		},
		wvbid() {
			return this.$route.params.wvbid;
		},
		dashboard() {
			return this.$store.getters.dashboard;
		},
		filter() {
			return this.dashboard.filter;
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === "licht" ? false : true;
		}
	},
	methods: {
		getWVB() {
			if (this.uid === "print") {
				this.werkvoorbereiding = this.$store.getters.werkvoorbereiding;
				return;
			}

			const wvbRef = this.fb
				.database()
				.ref(`users/${this.uid}/alleWVB/${this.wvbid}`);
			wvbRef.on("value", snapshot => {
				this.werkvoorbereiding = snapshot.val();
			});
		},
		backToWebsite() {
			window.location.href = "https://www.dewerkvoorbereider.nl";
		}
	}
};
</script>

<style scoped lang="scss">
.noWvb {
	height: 100vh;
	display: flex;
	flex-direction: column;
	transform: translateY(-10%);
	justify-content: center;
	align-items: center;

	i {
		font-size: 20rem;
		margin-bottom: 1rem;
	}

	.link {
		cursor: pointer;
		color: #4aa64e !important;
	}
}

.loading {
	-webkit-animation: rotate 2s;
	-webkit-animation-iteration-count: infinite;
	font-size: 1rem;
}

@-webkit-keyframes rotate {
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(360deg);
	}
}
</style>
