<template>
	<div class="form-check filterItem">
		<label class="form-check-label">
			<input class="form-check-input" type="checkbox" v-model="dashboard.filter[filterProps.id]" />
			{{ name }}
			<span class="form-check-sign">
				<span class="check"></span>
			</span>
		</label>
	</div>
</template>

<script>
export default {
	name: 'filterOption',
	props: ['filterProps'],
	computed: {
		dashboard() {
			return this.$store.getters.dashboard;
		},
		name() {
			if (this.filterProps) return this.filterProps.name;
			return '';
		}
	}
};
</script>

<style></style>
