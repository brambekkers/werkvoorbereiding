<template>
	<li class="nav-item">
		<a class="nav-link" @click.prevent="changePage">
			<i class="material-icons">{{itemProps.icon}}</i>
			<p>{{itemProps.name}}</p>
		</a>
	</li>
</template>

<script>
	import $ from "jquery"

	export default {
		name: "SidebarMenuItem",
		props: ["itemProps"],
		computed: {
			appData()		{ return this.$store.state.appData },
			sideBarOpen() 	{ return this.$store.state.appData.sidebarOpen},
		},
		methods: {
			changePage(){
				this.$store.state.appData.page = this.itemProps.page
				this.closeSidebar();
			},
			closeSidebar() {
				if (this.sideBarOpen) {
					$("html").removeClass("nav-open");
					$(".navbar-toggler").removeClass("toggled");
					this.$store.state.appData.sidebarOpen = false
				}
			}	
		},
	};
</script>


<style scoped>
	a {
		cursor: pointer;
	}
</style>