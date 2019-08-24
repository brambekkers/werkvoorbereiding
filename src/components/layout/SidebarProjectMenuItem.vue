<template>
	<li class="nav-item pl-4">
		<a
			class="nav-link"
			:class="{ pointer: canClick }"
			@click.prevent="toPage()"
		>
			<i v-bind:class="icon"></i>
			<p>{{itemProps.page}}</p>
		</a>
	</li>
</template>

<script>
import $ from "jquery";

export default {
	name: "SidebarProjectMenuItem",
	props: ["itemProps"],
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		sidebar() {
			return this.$store.getters.sidebar;
		},
		appData() {
			return this.$store.state.appData;
		},
		canClick() {
			if (this.werkvoorbereiding) {
				return this.werkvoorbereiding.stap >= this.pageToNum()
					? true
					: false;
			}
			if (this.pageToNum() === 1) return true;
			return false;
		},
		icon() {
			if (this.werkvoorbereiding) {
				if (this.werkvoorbereiding.stap > this.pageToNum())
					return "far fa-check-circle";
				if (this.werkvoorbereiding.stap === this.pageToNum())
					return "far fa-circle";
				if (this.werkvoorbereiding.stap < this.pageToNum())
					return "far fa-times-circle";
			}

			if (this.pageToNum() === 1) return "far fa-circle";
			return "far fa-times-circle";
		}
	},
	methods: {
		toPage() {
			if (this.canClick) {
				this.$router.push(`/${this.itemProps.page}`);
				this.closeSidebar();
			}
		},
		closeSidebar() {
			if (this.sidebar) {
				$("html").removeClass("nav-open");
				$(".navbar-toggler").removeClass("toggled");
				this.$store.commit("sidebar", false);
			}
		},
		pageToNum() {
			if (this.itemProps.page === "gegevens") return 1;
			if (this.itemProps.page === "componenten") return 2;
			if (this.itemProps.page === "materialen") return 3;
			if (this.itemProps.page === "maten") return 4;
			if (this.itemProps.page === "gereedschap") return 5;
			if (this.itemProps.page === "planning") return 6;
			if (this.itemProps.page === "nacalculatie") return 7;
		}
	}
};
</script>


<style scoped>
.pointer {
	cursor: pointer;
}
</style>