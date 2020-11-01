<template>
	<div class="form-group">
		<div class="material-switch">
			<input
				:id="toolKey"
				type="checkbox"
				v-model="value.data"
				@change="$emit('changetool', { toolKey, category })"
			/>
			<label
				v-bind:for="toolKey"
				:style="{ 'background-color': hexColor }"
			></label>
		</div>
		<label>{{ toolKey }}</label>
	</div>
</template>

<script>
export default {
	name: "GereedschapItem",
	props: ["value", "toolKey", "category"],
	computed: {
		toolProps() {
			return { category: this.category, toolKey: this.toolKey };
		},
		getGereedschap() {
			return this.$store.getters.werkvoorbereidingsObject("gereedschap");
		},
		hexColor() {
			return this.$store.getters.hexColor;
		}
	}
};
</script>

<style scoped lang="scss"></style>
