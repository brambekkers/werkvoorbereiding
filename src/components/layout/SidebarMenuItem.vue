<template>
	<li class="nav-item">
		<a
			class="nav-link"
			@click.prevent="changePage"
		>
			<i class="material-icons">{{itemProps.icon}}</i>
			<p>{{ linkName }}</p>
		</a>
	</li>
</template>

<script>
export default {
	name: "SidebarMenuItem",
	props: ["itemProps"],
	computed: {
		sidebar() {
			return this.$store.getters.sidebar;
		},
		linkName() {
			return this.itemProps.name
				? this.itemProps.name
				: this.itemProps.page;
		}
	},
	methods: {
		changePage() {
			this.$router.push(`/${this.itemProps.page}`);
			this.closeSidebar();
		},
		closeSidebar() {
			if (this.sidebar) {
				window.$("html").removeClass("nav-open");
				window.$(".navbar-toggler").removeClass("toggled");
				this.$store.commit("sidebar", false);
			}
		}
	}
};
</script>


<style scoped>
a {
	cursor: pointer;
}
</style>