<template>
	<div class="col-md-12">
		<div class="card">
			<div class="card-header card-header-danger">
				<div class="row">
					<div class="d-flex w-100">
						<div class="pl-3">
							<h3 class="card-title">
								<i class="fa fa-list-ol fa-lg pr-4"></i>Materiaalstaat
							</h3>
							<p class="card-category">Alle onderdelen op een rij</p>
						</div>

						<div class="align-self-center ml-auto pr-5">
							<div class="togglebutton">
								<label>
									<input type="checkbox" checked @change="toggleBrutoNetto()" />
									<span class="toggle"></span>
									<span class="toggle-label"> {{ listType }} </span>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card-body">
				<template v-if="materialList.length">
					<div class="table-responsive">
						<table
							class="table table-hover table-striped text-center table-sm mb-0"
							:class="{ 'table-dark': darkMode }"
						>
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
					</div>
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
	name: "DashboardMateriaalstaat",
	props: ["werkvoorbereiding"],
	computed: {
		listType() {
			return this.$store.getters.dashboard.materiaalStaatType;
		},
		materialList() {
			if (this.listType === "netto") {
				return [...this.maten, ...this.overigeMaterialen];
			} else {
				return [...this.brutoMaten, ...this.overigeMaterialen];
			}
		},
		materialen() {
			return this.werkvoorbereiding.materialen
				? this.werkvoorbereiding.materialen
				: [];
		},
		overigeMaterialen() {
			return this.werkvoorbereiding.overigeMaterialen
				? this.werkvoorbereiding.overigeMaterialen
				: [];
		},
		maten() {
			return this.werkvoorbereiding.maten ? this.werkvoorbereiding.maten : [];
		},
		brutoMaten() {
			let brutoMaten = JSON.parse(JSON.stringify(this.maten));
			brutoMaten.map(m => {
				const matM = this.materialen.massief;
				const matP = this.materialen.plaatmateriaal;

				// Maten van massief naar brutomaten
				if (matM) {
					if (matM.filter(x => x.naam === m.materiaal).length) {
						m.lengte = Number(m.lengte) + this.overlengteKops * 2;
						m.breedte = Number(m.breedte) + this.overlengteLangs * 2;
					}
				}
				// Maten van plaatmateriaal naar brutomaten
				if (matP) {
					if (matP.filter(x => x.naam === m.materiaal).length) {
						m.lengte = Number(m.lengte) + this.overlengteZijde * 2;
						m.breedte = Number(m.breedte) + this.overlengteZijde * 2;
					}
				}
				return m;
			});
			return brutoMaten;
		},
		materiaalOpties() {
			return this.werkvoorbereiding.materiaalOpties
				? this.werkvoorbereiding.materiaalOpties
				: null;
		},
		overlengteZijde() {
			return this.materiaalOpties
				? Number(this.materiaalOpties.overlengteZijdes)
				: 0;
		},
		overlengteKops() {
			return this.materiaalOpties
				? Number(this.materiaalOpties.overlengteKops)
				: 0;
		},
		overlengteLangs() {
			return this.materiaalOpties
				? Number(this.materiaalOpties.overlengteLangs)
				: 0;
		},
		darkMode() {
			return this.$store.getters.instellingen.modus === "licht" ? false : true;
		}
	},
	methods: {
		toggleBrutoNetto() {
			this.$store.commit("setDashboard", {
				path: "materiaalStaatType",
				value: this.listType === "netto" ? "bruto" : "netto"
			});
		}
	}
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

.toggle-label {
	text-transform: capitalize;
	color: white;
	font-size: 1.2rem;
}

.togglebutton label {
	input[type="checkbox"]:checked + .toggle {
		background-color: #64ba68;
	}
}
</style>
