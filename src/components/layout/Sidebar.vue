<template>
	<aside class="sidebar">
		<div class="logo">
			<a href="/" class="simple-text logo-normal">WVB</a>
		</div>
		<div class="sidebar-wrapper">
			<ul class="nav">
				<li class="nav-item">
					<a class="nav-link" href="./dashboard.html">
						<i class="material-icons">dashboard</i>
						<p>Dashboard</p>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="./user.html">
						<i class="material-icons">content_paste</i>
						<p>Projecten</p>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="./tables.html">
						<i class="material-icons">person</i>
						<p>Account</p>
					</a>
				</li>
				<hr>
				<SidebarProjectMenuItem :itemProps="{page:1, name:'Gegevens'}"/>
				<SidebarProjectMenuItem :itemProps="{page:2, name:'Componenten'}"/>
				<SidebarProjectMenuItem :itemProps="{page:3, name:'Materialen'}"/>
				<SidebarProjectMenuItem :itemProps="{page:4, name:'Maten'}"/>
				<SidebarProjectMenuItem :itemProps="{page:5, name:'Gereedschap'}"/>
				<SidebarProjectMenuItem :itemProps="{page:6, name:'Planning'}"/>
				<hr>
				<li class="nav-item">
					<a class="nav-link" href="./rtl.html">
						<i class="material-icons">language</i>
						<p>Importeren</p>
					</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="./rtl.html">
						<i class="material-icons">language</i>
						<p>Exporteren</p>
					</a>
				</li>
			</ul>
		</div>
	</aside>
</template>

<script>
	import SidebarProjectMenuItem from "./SidebarProjectMenuItem"

	export default {
		name: "Sidebar",
		components: {
			SidebarProjectMenuItem
		},
	};
</script>


<style scoped>
</style>