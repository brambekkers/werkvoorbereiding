<template>
	<div class="col-2 col-md-1 col-lg-2 col-xl-1">
		<div class="input-group mb-2">
			<button
				class="btn btn-sm btn-fab pulse-button"
				@click.prevent="$emit('add')"
			>
				<i class="material-icons fas fa-plus "></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "AddButton"
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
