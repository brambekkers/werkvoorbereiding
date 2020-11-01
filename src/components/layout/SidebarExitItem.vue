<template>
	<li class="nav-item">
		<a class="nav-link" @click.prevent="exit">
			<i class="material-icons">{{ itemProps.icon }}</i>
			<p>{{ itemProps.name }}</p>
		</a>
	</li>
</template>

<script>
export default {
	name: 'SidebarExitItem',
	props: ['itemProps'],
	methods: {
		exit() {
			window.close();
		}
	}
};
</script>

<style scoped>
a {
	cursor: pointer;
}

i,
p {
	color: red !important;
}
</style>
