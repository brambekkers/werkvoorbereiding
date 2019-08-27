<template>
	<div class="col-xl-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-success card-header-icon">
				<div class="card-icon">
					<i class="fas fa-th"></i>
				</div>
				<p class="card-category">Onderdelen</p>
				<h4 class="card-title">{{onderdelen}}</h4>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons far fa-square mr-2"></i>
					<a><strong>Unieke items: </strong> {{uniekeOnderdelenn}}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "DashboardParts",
	data() {
		return {};
	},
	computed: {
		getMaten() {
			return this.$store.getters.werkvoorbereidingsObject("maten");
		},
		onderdelen() {
			if (this.getMaten && this.getMaten.length) {
				return this.getMaten
					.map(m => m.aantal)
					.reduce((a, b) => {
						return Number(a) + Number(b);
					});
			}
			return 0;
		},
		uniekeOnderdelenn() {
			if (this.getMaten) return this.getMaten.length;
			return 0;
		}
	}
};
</script>


<style scoped>
</style>