<template>
	<div class="col-md-4">
		<div class="card card-stats mb-1">
			<div
				class="card-header card-header-icon"
				:class="[status ? 'card-header-success' : 'card-header-rose']"
			>
				<div class="card-icon p-0">
					<i class="far fa-check-circle" v-if="status"></i>
					<i class="far fa-circle" v-if="!status"></i>
				</div>
				<h4 class="card-title">{{ text }}</h4>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons">update</i>
					{{ time ? `Updated: ${time}` : "Status: not online" }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Status",
		props: ["text", "status", "time"]
	};
</script>

<style scoped lang="scss"></style>
