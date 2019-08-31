<template>
	<footer class="footer">
		<div class="container-fluid">
			<nav class="float-left" :class="{ 'text-light': darkMode }">
				<ul>
					<li>
						<router-link to="/over">Over</router-link>
					</li>
					<li>
						<router-link to="/privacy">Privacy</router-link>
					</li>
					<li>
						<router-link to="/licentie">Licentie</router-link>
					</li>
					<li></li>
				</ul>
			</nav>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	computed: {
		darkMode() {
			return this.$store.getters.instellingen.modus === 'licht' ? false : true;
		}
	}
};
</script>

<style scoped>
a {
	cursor: pointer;
	padding-top: 0 !important;
}
</style>
