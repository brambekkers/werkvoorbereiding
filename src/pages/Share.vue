<template>
	<div class="content">
		<div
			class="container-fluid"
			v-if="werkvoorbereiding"
		>
			<button
				class="btn btn-sm float-left "
				:class="{ 'bg-secondary text-white': darkMode, 'bg-white text-secondary': !darkMode  }"
				@click="backToWebsite"
				data-html2canvas-ignore
			>
				<i class="fas fa-chevron-left mr-2"></i>Terug
			</button>
			<DashboardFilter data-html2canvas-ignore />
			<div class="row">
				<DashboardName
					v-if="filter.gegevens"
					:werkvoorbereiding="werkvoorbereiding"
				/>
			</div>
			<div class="row">
				<DashboardPrice
					v-if="filter.verkoopprijs"
					:werkvoorbereiding="werkvoorbereiding"
				/>
				<DashboardWorkdays
					v-if="filter.aantalWerkdagen"
					:werkvoorbereiding="werkvoorbereiding"
				/>
				<DashboardParts
					v-if="filter.aantalOnderdelen"
					:werkvoorbereiding="werkvoorbereiding"
				/>
				<DashboardTool
					v-if="filter.favGereedschap"
					:werkvoorbereiding="werkvoorbereiding"
				/>
			</div>
			<div class="row ">
				<DashboardMaterialCost
					v-if="filter.materiaalKosten"
					:werkvoorbereiding="werkvoorbereiding"
				/>
				<DashboardWorktime
					v-if="filter.planningTijd"
					:werkvoorbereiding="werkvoorbereiding"
				/>
			</div>
			<div class="row">
				<DashboardPlanning
					v-if="filter.agenda"
					:werkvoorbereiding="werkvoorbereiding"
				/>
			</div>
		</div>
		<div
			class="noWvb"
			v-if="!werkvoorbereiding && loading"
		>
			<i class="loading fas fa-spinner"></i>
			<h2>Deze werkvoorbereiding wordt geladen</h2>
		</div>
		<div
			class="noWvb"
			v-if="!werkvoorbereiding && !loading"
		>
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

import DashboardFilter from "@/components/dashboard/Dashboard-filter.vue";
import DashboardName from "@/components/dashboard/Dashboard-name.vue";
import DashboardPrice from "@/components/dashboard/Dashboard-price.vue";
import DashboardWorkdays from "@/components/dashboard/Dashboard-workdays.vue";
import DashboardParts from "@/components/dashboard/Dashboard-parts.vue";
import DashboardTool from "@/components/dashboard/Dashboard-tool.vue";
import DashboardMaterialCost from "@/components/dashboard/Dashboard-materialcost.vue";
import DashboardWorktime from "@/components/dashboard/Dashboard-worktime.vue";
import DashboardPlanning from "@/components/dashboard/Dashboard-planning.vue";

export default {
	name: "Dashboard",
	layout: "share",
	components: {
		DashboardName,
		DashboardPrice,
		DashboardWorkdays,
		DashboardParts,
		DashboardTool,
		DashboardMaterialCost,
		DashboardWorktime,
		DashboardPlanning,
		DashboardFilter
	},
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
			this.$store.commit(
				"initializeFbApp",
				fb.initializeApp(this.fbConfig)
			);
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
			return this.$store.getters.instellingen.modus === "licht"
				? false
				: true;
		}
	},
	methods: {
		getWVB() {
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
