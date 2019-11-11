<template>
	<div class="col-md-12">
		<div class="card">
			<div class="card-header card-header-danger">
				<div class="row">
					<div class="d-flex w-100">
						<div class="pl-3">
							<h3 class="card-title"><i class="fa fa-list-ol fa-lg pr-4"></i>Materiaalstaat</h3>
							<p class="card-category">Alle onderdelen op een rij</p>
						</div>
					</div>
				</div>
			</div>
			<div class="card-body">
				<template v-if="materialList.length">
					<table class="table table-hover table-striped text-center table-sm mb-0" :class="{ 'table-dark darkHover': darkMode }">
						<thead class="bg-light" :class="{ 'bg-dark': darkMode }">
							<tr>
								<th scope="col">#</th>
								<th scope="col">Naam</th>
								<th scope="col">Aantal</th>
								<th scope="col">Lengte</th>
								<th scope="col">Breedte</th>
								<th scope="col">Dikte</th>
								<th scope="col">Materiaal</th>
							</tr>
						</thead>
						<tbody>
							<tr :key="index" v-for="(maten, index) in materialList">
								<td>{{ index + 1 }}</td>
								<td>{{ maten.naam }}</td>
								<td>{{ maten.aantal }}</td>
								<td>{{ maten.lengte }}</td>
								<td>{{ maten.breedte }}</td>
								<td>{{ maten.dikte }}</td>
								<td>{{ maten.materiaal }}</td>
							</tr>
						</tbody>
					</table>
				</template>
				<template v-if="!materialList.length">
					<p>Voeg materialen toe om de materiaalstaat te bekijken.</p>
				</template>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DashboardMateriaalstaat',
	props: ['werkvoorbereiding'],
	data() {
		return {};
	},
	computed: {
		materialList() {
			const overigeMaterialen = this.werkvoorbereiding.overigeMaterialen ? this.werkvoorbereiding.overigeMaterialen : [];
			const maten = this.werkvoorbereiding.maten ? this.werkvoorbereiding.maten : [];
			return [...maten, ...overigeMaterialen];
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === 'licht' ? false : true;
		}
	},
	methods: {}
};
</script>

<style scoped lang="scss">
table {
	border: solid 1px #d6d6d6;

	td {
		padding-top: 8px !important;
		padding-bottom: 8px !important;
	}
}

.darkHover tr:hover {
	background-color: rgba(36, 36, 36, 0.75) !important;
}
</style>
