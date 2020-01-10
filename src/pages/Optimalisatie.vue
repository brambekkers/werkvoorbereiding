<template>
	<div class="content">
		<div class="container-fluid" v-if="werkvoorbereiding">
			<div class="card  card-stats">
				<div class="card-header card-header-success card-header-icon">
					<div class="card-icon">
						<i class="fas fa-list-alt fa-2x"></i>
					</div>
					<h4 class="card-title text-left">Zaagoptimalisatie data</h4>
				</div>
				<div class="card-body">
					<div class="row">
						<ZaagoptimalistieSheetList :sheets="getPlaatmateriaal" />
						<ZaagoptimalistiePartList :parts="getPlaatmateriaalParts" />
					</div>
				</div>
			</div>

			<div class="row">
				<DashboardOptimalisatie :werkvoorbereiding="werkvoorbereiding" />
			</div>
		</div>
	</div>
</template>

<script>
import ZaagoptimalistiePartList from "@/components/zaagoptimalisatie/Zaagoptimalisatie-partlist.vue";
import ZaagoptimalistieSheetList from "@/components/zaagoptimalisatie/Zaagoptimalisatie-sheetlist.vue";
import DashboardOptimalisatie from "@/components/dashboard/Dashboard-optimalisatie.vue";
import Optimalisatie from "@/components/zaagoptimalisatie/Optimalisatie.js";

export default {
	name: "Zaagoptimalisatie",
	components: {
		ZaagoptimalistiePartList,
		ZaagoptimalistieSheetList,
		DashboardOptimalisatie
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject("materialen");
		},
		getMaten() {
			return this.$store.getters.werkvoorbereidingsObject("maten");
		},
		getPlaatmateriaal() {
			return this.getMaterialen.plaatmateriaal;
		},
		getPlaatmateriaalParts() {
			if (this.getMaten) {
				const pm = this.getPlaatmateriaal;
				return this.getMaten.filter(m => {
					if (pm) return pm.filter(gm => gm.naam === m.materiaal).length;
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
table {
	box-shadow: none;
}

.sheetCanvas {
	border: solid black 2px;
}
</style>
