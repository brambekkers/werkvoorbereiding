<template>
	<div class="col-2 col-md-1 col-lg-2 col-xl-1">
		<div class="input-group mb-2">
			<button
				type="button"
				class="btn btn-sm btn-fab btn-danger btn-block"
				@click="$emit('delete')"
			>
				<i class="fa fa-trash fa-xs"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "DeleteButton",
};
</script>
