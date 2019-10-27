<template>
	<div
		class="card-header card-header-"
		:class="userColor"
	>
		<h3 class="card-title">
			<i class="fa fa-industry fa-lg pr-4"></i>{{text.title}}</h3>
		<p class="card-category">{{text.subtitle}}</p>
	</div>
</template>

<script>
export default {
	name: "CardHeader",
	props: ["text"],
	computed: {
		instellingen() {
			return this.$store.getters.instellingen;
		},
		userColor() {
			if (this.instellingen.kleur) return this.instellingen.kleur;
			return "groen";
		}
	}
};
</script>


<style scoped>
.roze {
	background-color: #e91e63;
	background: linear-gradient(60deg, #d65a84, #e91e63);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(233, 30, 99, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(233, 30, 99, 0.4);
}

.rood {
	background: linear-gradient(60deg, #ef5350, #e53935);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(244, 67, 54, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(244, 67, 54, 0.4);
}

.geel {
	background: linear-gradient(60deg, #ffa726, #fb8c00);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(255, 152, 0, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(255, 152, 0, 0.4);
}

.groen {
	background: linear-gradient(60deg, #66bb6a, #43a047);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(76, 175, 80, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(76, 175, 80, 0.4);
}

.blauw {
	background: linear-gradient(60deg, #26c6da, #00acc1);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(0, 188, 212, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(0, 188, 212, 0.4);
}

.paars {
	background: linear-gradient(60deg, #ab47bc, #8e24aa);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(156, 39, 176, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(156, 39, 176, 0.4);
}

.grijs {
	background: linear-gradient(60deg, #858585, #575757);
	webkit-box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(163, 163, 163, 0.4);
	box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
		0 7px 10px -5px rgba(163, 163, 163, 0.4);
}
</style>