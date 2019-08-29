<template>
	<div class="content">
		<div
			class="container-fluid"
			v-if="werkvoorbereiding"
		>
			<div id="filter">
				<button class="btn btn-filter btn-sm"><i class="fas fa-filter mr-2"></i>Filter</button>
			</div>
			<div class="row">
				<DashboardPrice />
				<DashboardWorkdays />
				<DashboardParts />
				<DashboardTool />
			</div>
			<div class="row ">
				<DashboardMaterialCost />
				<DashboardWorktime />
			</div>
			<div class="row">
				<DashboardPlanning />
			</div>

		</div>
		<div
			class="noWvb"
			v-if="!werkvoorbereiding"
		>
			<i class="far fa-surprise"></i>
			<h2>Je hebt nog geen werkvoorbereiding gemaakt</h2>
			<router-link
				class="link"
				to="/gegevens"
			>Klik hier om een nieuwe werkvoorbereiding te starten</router-link>
		</div>
	</div>
</template>

<script>
import DashboardPrice from "./attributes/Dashboard-price.vue";
import DashboardWorkdays from "./attributes/Dashboard-workdays.vue";
import DashboardParts from "./attributes/Dashboard-parts.vue";
import DashboardTool from "./attributes/Dashboard-tool.vue";
import DashboardMaterialCost from "./attributes/Dashboard-materialcost.vue";
import DashboardWorktime from "./attributes/Dashboard-worktime.vue";
import DashboardPlanning from "./attributes/Dashboard-planning.vue";

export default {
	name: "Dashboard",
	components: {
		DashboardPrice,
		DashboardWorkdays,
		DashboardParts,
		DashboardTool,
		DashboardMaterialCost,
		DashboardWorktime,
		DashboardPlanning
	},
	data() {
		return {};
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		}
	}
};
</script>


<style scoped lang="scss">
#filter {
	display: flex;
	justify-content: flex-end;

	.btn-filter {
		color: #a9afbb;
		background: white;
		border-radius: 6px;
		border: 0;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
	}
}

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