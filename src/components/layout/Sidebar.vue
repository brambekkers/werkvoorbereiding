<template>
	<aside
		id="main-sidebar"
		class="sidebar"
		data-color="green"
	>
		<div class="logo">
			<router-link
				to="/"
				class="simple-text logo-normal"
			>WVB</router-link>
		</div>
		<div class="sidebar-wrapper">
			<ul class="nav">
				<SidebarMenuItem :itemProps="{ page: 'dashboard', name: 'dashboard',  icon: 'dashboard' }" />
				<SidebarMenuItem :itemProps="{ page: user ? 'projecten' : 'login', name: 'projecten',  icon: 'content_paste' }" />
				<SidebarMenuItem :itemProps="{ page: user ? 'profiel' : 'login', name: 'profiel', icon: 'person' }" />
				<hr />
				<SidebarProjectMenuItem :itemProps="{ page: 'gegevens' }" />
				<SidebarProjectMenuItem :itemProps="{ page: 'componenten' }" />
				<SidebarProjectMenuItem :itemProps="{ page: 'materialen' }" />
				<SidebarProjectMenuItem :itemProps="{ page: 'maten' }" />
				<SidebarProjectMenuItem :itemProps="{ page: 'gereedschap' }" />
				<SidebarProjectMenuItem :itemProps="{ page: 'planning' }" />
				<SidebarProjectMenuItem
					:itemProps="{ page: 'nacalculatie' }"
					v-if="stap >= 7"
				/>
				<hr />
				<SidebarMenuItem :itemProps="{ page: 'importeren', name: 'importeren', icon: 'cloud_download' }" />
				<SidebarMenuItem :itemProps="{ page: 'exporteren', name: 'exporteren', icon: 'cloud_upload' }" />
				<hr v-if="electron" />
				<SidebarExitItem
					v-if="electron"
					:itemProps="{ name: 'afsluiten', icon: 'exit_to_app' }"
				/>
			</ul>
		</div>
	</aside>
</template>

<script>
import SidebarProjectMenuItem from "./SidebarProjectMenuItem";
import SidebarExitItem from "./SidebarExitItem";
import SidebarMenuItem from "./SidebarMenuItem";
import isElectron from "is-electron";

export default {
	name: "Sidebar",
	computed: {
		electron() {
			return isElectron();
		},
		user() {
			return this.$store.getters.user;
		},
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		stap() {
			if (this.werkvoorbereiding) return this.werkvoorbereiding.stap;
			return 0;
		}
	},
	components: {
		SidebarProjectMenuItem,
		SidebarMenuItem,
		SidebarExitItem
	}
};
</script>

<style scoped></style>
