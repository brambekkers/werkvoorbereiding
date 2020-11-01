<template>
	<div class="d-flex align-items-end">
		<button
			class="btn btn-sm btn-fab pulse-button"
			@click.prevent="$emit('add')"
		>
			<i class="material-icons fas fa-plus "></i>
		</button>
		<h6 class="ml-2 mb-1">
			{{ text }}
		</h6>
	</div>
</template>

<script>
export default {
	name: "AddButton",
	props: ["text"]
};
</script>

<style scoped lang="scss">
.pulse-button {
	-webkit-animation: pulse 1.5s infinite;
	&:hover {
		-webkit-animation: none;
	}

	@-webkit-keyframes pulse {
		70% {
			box-shadow: 0 0 0 50px rgba(90, 153, 212, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(90, 153, 212, 0);
		}
	}
}
</style>
