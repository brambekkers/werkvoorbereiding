<template>
	<aside class="sidebar">
		<div class="logo">
			<a href="/" class="simple-text logo-normal">WVB</a>
		</div>
		<div class="sidebar-wrapper">
			<ul class="nav">
				<SidebarMenuItem v-if="allowDashboard" :itemProps="{page:7, name:'Dashboard', icon: 'dashboard'}"/>
				<SidebarMenuItem v-if="!allowDashboard" :itemProps="{page:page, name:'Dashboard', icon: 'dashboard'}"/>
				<SidebarMenuItem v-if="user" :itemProps="{page:16, name:'Projecten', icon: 'content_paste'}"/>
				<SidebarMenuItem v-if="!user" :itemProps="{page:20, name:'Projecten', icon: 'content_paste'}"/>
				<SidebarMenuItem :itemProps="{page:20, name:'Account', icon: 'person'}"/>
				<hr>
				<SidebarProjectMenuItem :itemProps="{page:1, name:'Gegevens'}"/>
				<SidebarProjectMenuItem :itemProps="{page:2, name:'Componenten'}"/>
				<SidebarProjectMenuItem :itemProps="{page:3, name:'Materialen'}"/>
				<SidebarProjectMenuItem :itemProps="{page:4, name:'Maten'}"/>
				<SidebarProjectMenuItem :itemProps="{page:5, name:'Gereedschap'}"/>
				<SidebarProjectMenuItem :itemProps="{page:6, name:'Planning'}"/>
				<hr>
				<SidebarMenuItem :itemProps="{page:9, name:'Importeren', icon: 'cloud_download'}"/>
				<SidebarMenuItem :itemProps="{page:10, name:'Exporteren', icon: 'cloud_upload'}"/>
			</ul>
		</div>
	</aside>
</template>

<script>
	import SidebarProjectMenuItem from "./SidebarProjectMenuItem"
	import SidebarMenuItem from "./SidebarMenuItem"

	export default {
		name: "Sidebar",
		computed:{
			page(){
				return this.$store.state.appData.page
			},
			user(){
				return this.$store.state.appData.user
			},
			wvbActive(){
				if(this.werkvoorbereiding){
					if(Object.keys(this.werkvoorbereiding).length > 0){
						return true
					}
				}
				return false
			},
			werkvoorbereiding(){
				return this.$store.state.werkvoorbereiding
			},
			allowDashboard(){
				if(this.wvbActive){
					if(this.werkvoorbereiding.stap > 6){
						return true
					}
				}
				else{
					return false
				}
			}	
		},
		components: {
			SidebarProjectMenuItem,
			SidebarMenuItem,
		},
	};
</script>


<style scoped>
</style>