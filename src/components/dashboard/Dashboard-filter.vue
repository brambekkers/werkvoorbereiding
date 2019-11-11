<template>
	<div>
		<div id="filter">
			<button
				class="btn btn-filter btn-sm"
				data-toggle="collapse"
				data-target="#filterCollapse"
				aria-expanded="false"
				aria-controls="filterCollapse"
				:class="{ 'bg-secondary text-white': darkMode }"
			>
				<i class="fas fa-filter mr-2"></i>Filter
			</button>
		</div>
		<div class="collapse" id="filterCollapse">
			<div class="card card-body  mt-1">
				<h4>Filter opties</h4>
				<div id="filterList">
					<FilterOptions :filterProps="{ name: 'Gegevens', id: 'gegevens' }" />
					<FilterOptions :filterProps="{ name: 'Verkoopprijs', id: 'verkoopprijs' }" />
					<FilterOptions :filterProps="{ name: 'Werkdagen', id: 'aantalWerkdagen' }" />
					<FilterOptions :filterProps="{ name: 'Aantal onderdelen', id: 'aantalOnderdelen' }" />
					<FilterOptions :filterProps="{ name: 'Favoriet gereedschap', id: 'favGereedschap' }" />
					<FilterOptions :filterProps="{ name: 'Materiaal kosten', id: 'materiaalKosten' }" />
					<FilterOptions :filterProps="{ name: 'Plannings tijd', id: 'planningTijd' }" />
					<FilterOptions :filterProps="{ name: 'Materiaalstaat', id: 'materiaalstaat' }" />
					<FilterOptions :filterProps="{ name: 'Agenda', id: 'agenda' }" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import FilterOptions from '@/components/dashboard/Dashboard-filteroption.vue';

export default {
	name: 'DashboardFilter',
	components: {
		FilterOptions
	},
	computed: {
		darkMode() {
			return this.$store.getters.instellingen.modus === 'licht' ? false : true;
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

#filterList {
	display: flex;
	flex-wrap: wrap;

	.filterItem {
		margin: 10px 10px;
	}
}
</style>
