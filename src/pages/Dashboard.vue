<template>
	<div class="content">
		<div class="container-fluid" v-if="werkvoorbereiding">
			<DashboardFilter />
			<div class="row">
				<DashboardName v-if="filter.gegevens" :werkvoorbereiding="werkvoorbereiding" />
			</div>
			<div class="row">
				<DashboardPrice v-if="filter.verkoopprijs" :werkvoorbereiding="werkvoorbereiding" />
				<DashboardWorkdays v-if="filter.aantalWerkdagen" :werkvoorbereiding="werkvoorbereiding" />
				<DashboardParts v-if="filter.aantalOnderdelen" :werkvoorbereiding="werkvoorbereiding" />
				<DashboardTool v-if="filter.favGereedschap" :werkvoorbereiding="werkvoorbereiding" />
			</div>
			<div class="row ">
				<DashboardMaterialCost v-if="filter.materiaalKosten" :werkvoorbereiding="werkvoorbereiding" />
				<DashboardWorktime v-if="filter.planningTijd" :werkvoorbereiding="werkvoorbereiding" />
			</div>
			<div class="row">
				<DashboardMateriaalstaat v-if="filter.materiaalstaat" :werkvoorbereiding="werkvoorbereiding" />
			</div>
			<div class="row">
				<DashboardPlanning v-if="filter.agenda" :werkvoorbereiding="werkvoorbereiding" />
			</div>
		</div>
		<div class="noWvb" v-if="!werkvoorbereiding">
			<i class="far fa-surprise"></i>
			<h2>Je hebt nog geen werkvoorbereiding gemaakt</h2>
			<router-link class="link" to="/gegevens">Klik hier om een nieuwe werkvoorbereiding te starten</router-link>
		</div>
	</div>
</template>

<script>
import DashboardFilter from '@/components/dashboard/Dashboard-filter.vue';
import DashboardName from '@/components/dashboard/Dashboard-name.vue';
import DashboardPrice from '@/components/dashboard/Dashboard-price.vue';
import DashboardWorkdays from '@/components/dashboard/Dashboard-workdays.vue';
import DashboardParts from '@/components/dashboard/Dashboard-parts.vue';
import DashboardTool from '@/components/dashboard/Dashboard-tool.vue';
import DashboardMaterialCost from '@/components/dashboard/Dashboard-materialcost.vue';
import DashboardWorktime from '@/components/dashboard/Dashboard-worktime.vue';
import DashboardMateriaalstaat from '@/components/dashboard/Dashboard-materiaalstaat.vue';
import DashboardPlanning from '@/components/dashboard/Dashboard-planning.vue';

export default {
	name: 'Dashboard',
	components: {
		DashboardName,
		DashboardPrice,
		DashboardWorkdays,
		DashboardParts,
		DashboardTool,
		DashboardMaterialCost,
		DashboardWorktime,
		DashboardMateriaalstaat,
		DashboardPlanning,
		DashboardFilter
	},
	data() {
		return {};
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		dashboard() {
			return this.$store.getters.dashboard;
		},
		filter() {
			return this.dashboard.filter;
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === 'licht' ? false : true;
		}
	}
};
</script>

<style scoped lang="scss">
.noWvb {
	height: 75vh;
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
</style>
