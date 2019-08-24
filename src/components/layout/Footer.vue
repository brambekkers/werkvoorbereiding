<template>
	<footer class="footer">
		<div class="container-fluid">
			<nav class="float-left">
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
					<li>
					</li>
				</ul>
			</nav>
		</div>
	</footer>
</template>

<script>
export default {
	name: "Footer"
};
</script>


<style scoped>
a {
	cursor: pointer;
	padding-top: 0 !important;
}
</style>
