<template>
	<div class="content">
		<DashboardContainer
			:werkvoorbereiding="werkvoorbereiding"
			:optionsOn="true"
		/>
		<div class="noWvb text-center" v-if="!werkvoorbereiding">
			<i class="far fa-surprise"></i>
			<h3>Je hebt nog geen werkvoorbereiding gemaakt</h3>
			<router-link class="link" to="/gegevens"
				>Klik hier om een nieuwe werkvoorbereiding te starten</router-link
			>
		</div>
	</div>
</template>

<script>
import DashboardContainer from "@/components/dashboard/Dashboard-container.vue";

export default {
	name: "Dashboard",
	components: {
		DashboardContainer
	},
	data() {
		return {};
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		}
	}
};
</script>

<style scoped lang="scss">
.noWvb {
	height: 75vh;
	display: flex;
	flex-direction: column;
	transform: translateY(-10%);
	justify-content: center;
	align-items: center;

	i {
		font-size: 20rem;
		margin-bottom: 1rem;
	}

	.link {
		cursor: pointer;
		color: #4aa64e !important;
	}
}
</style>
