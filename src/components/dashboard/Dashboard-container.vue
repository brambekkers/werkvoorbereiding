<template>
	<div class="container-fluid" v-if="werkvoorbereiding">
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
			<DashboardMateriaalstaat
				v-if="filter.materiaalstaat"
				:werkvoorbereiding="werkvoorbereiding"
			/>
		</div>
		<div class="row">
			<DashboardOptimalisatie
				v-if="filter.optimalisatie"
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
</template>

<script>
import DashboardFilter from "@/components/dashboard/Dashboard-filter.vue";
import DashboardName from "@/components/dashboard/Dashboard-name.vue";
import DashboardPrice from "@/components/dashboard/Dashboard-price.vue";
import DashboardWorkdays from "@/components/dashboard/Dashboard-workdays.vue";
import DashboardParts from "@/components/dashboard/Dashboard-parts.vue";
import DashboardTool from "@/components/dashboard/Dashboard-tool.vue";
import DashboardMaterialCost from "@/components/dashboard/Dashboard-materialcost.vue";
import DashboardWorktime from "@/components/dashboard/Dashboard-worktime.vue";
import DashboardMateriaalstaat from "@/components/dashboard/Dashboard-materiaalstaat.vue";
import DashboardOptimalisatie from "@/components/dashboard/Dashboard-optimalisatie.vue";
import DashboardPlanning from "@/components/dashboard/Dashboard-planning.vue";

export default {
	name: "Dashboard-container",
	props: ["werkvoorbereiding"],
	components: {
		DashboardName,
		DashboardPrice,
		DashboardWorkdays,
		DashboardParts,
		DashboardTool,
		DashboardMaterialCost,
		DashboardWorktime,
		DashboardPlanning,
		DashboardMateriaalstaat,
		DashboardOptimalisatie,
		DashboardFilter
	},
	computed: {
		dashboard() {
			return this.$store.getters.dashboard;
		},
		filter() {
			return this.dashboard.filter;
		}
	}
};
</script>

<style scoped lang="scss"></style>
