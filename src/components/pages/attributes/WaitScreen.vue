<template>
	<div class="loadingScreen">
		<i class="loadingIcon fas fa-spinner fa-spin"></i>
		<p>{{text}}</p>
	</div>
</template>

<script>
	export default {
		name: "WaitScreen",
		computed: {
			text(){ return this.$store.state.appData.waitScreenText }
		}
	};
</script>


<style scoped>
	.loadingScreen{
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99;
		height: 100%;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.6);
		text-align: center;
	}

	.loadingIcon{
		margin: auto;
		margin-top: 30vh;
		margin-bottom: 5vh;
		font-size: 5rem;
	}
</style>