<template>
	<div class="col-4">
		<button
			class="btn btn-sm btn-block"
			@click="btnFunction()"
			:class="[
				(typeof data === 'boolean' ? data : data.length)
					? btnColorOnConnect
					: btnColorOnDisconnect
			]"
		>
			<template v-if="!loading">
				{{
					(typeof data === "boolean"
					? data
					: data.length)
						? btnTextOnConnect
						: btnTextOnDisconnect
				}}
			</template>
			<i v-if="loading" class="fas fa-spinner fa-spin"></i>
		</button>
	</div>
</template>

<script>
export default {
	name: "HelloWorld",
	props: [
		"data",
		"btnFunction",
		"loading",
		"btnTextOnConnect",
		"btnTextOnDisconnect",
		"btnColorOnConnect",
		"btnColorOnDisconnect"
	],
	
};
</script>

<style scoped lang="scss"></style>
