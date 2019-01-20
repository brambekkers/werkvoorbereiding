<template>
	<li class="nav-item pl-4">
		<a class="nav-link" @click.prevent="$store.state.appData.page = itemProps.page">
			<i class="far fa-times-circle"></i>
			<p>{{itemProps.name}}</p>
		</a>
	</li>
</template>

<script>
	export default {
		name: "SidebarProjectMenuItem",
		props: ["itemProps"],
		computed: {
			appData(){
				return this.$store.state.appData
			}
		}
	};
</script>


<style scoped>
	a {
		cursor: pointer;
	}
</style>