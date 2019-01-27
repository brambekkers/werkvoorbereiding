<template>
	<li class="nav-item">
		<a class="nav-link" @click.prevent="$store.state.appData.page = itemProps.page">
			<i class="material-icons">{{itemProps.icon}}</i>
			<p>{{itemProps.name}}</p>
		</a>
	</li>
</template>

<script>
	export default {
		name: "SidebarMenuItem",
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