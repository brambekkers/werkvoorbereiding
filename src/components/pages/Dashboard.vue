<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<DashboardPrice />
				<DashboardWorkdays />
				<DashboardParts />
				<DashboardTool />
			</div>
			<div class="row">
				<DashboardMaterialCost />
				<DashboardWorktime />
			</div>

		</div>
	</div>
</template>

<script>
	import DashboardPrice from './attributes/Dashboard-price.vue';
	import DashboardWorkdays from './attributes/Dashboard-workdays.vue';
	import DashboardParts from './attributes/Dashboard-parts.vue';
	import DashboardTool from './attributes/Dashboard-tool.vue';
	import DashboardMaterialCost from './attributes/Dashboard-materialcost.vue';
	import DashboardWorktime from './attributes/Dashboard-worktime.vue';

	export default {
		name: "Dashboard",
		components: {
			DashboardPrice,
			DashboardWorkdays,
			DashboardParts,
			DashboardTool,
			DashboardMaterialCost,
			DashboardWorktime
		},
		data(){
			return{
			}
		},
		computed: {

		}
	};
</script>


<style scoped>

</style>