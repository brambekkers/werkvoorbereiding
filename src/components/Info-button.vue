<template>
	<div class="col-2 col-md-1 col-lg-2 col-xl-1">
		<div class="input-group mb-2">
			<button
				class="btn btn-sm btn-fab ml-auto btn-info btn-block"
				data-toggle="collapse"
				:data-target="`#extraInfo_${firstIndex}_${secondIndex}`"
				aria-expanded="true"
				aria-controls="collapseExample"
				@click.prevent=""
			>
				<i class="fa fa-info"></i>
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "InfoButton",
	props: ["firstIndex", "secondIndex"]
};
</script>
