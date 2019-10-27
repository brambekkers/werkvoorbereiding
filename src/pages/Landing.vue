<template>
	<div id="backgroundLanding">
		<div class="container">
			<div class="rellax-text-container">
				<h1 class="h1-seo">WVB</h1>
				<p class="pro">Pro</p>
			</div>
			<h3 class="h3-description">De werkvoorbereiding die werkt voor jou!</h3>
			<div class="icon">
				<i
					class="fas fa-arrow-up"
					@click="hideLandingPage"
				></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Landing",
	mounted() {
		if (this.$route.name != "Gegevens") {
			this.hideLandingPage();
		}
	},
	methods: {
		hideLandingPage() {
			this.$store.commit("landingPage", false);
		}
	}
};
</script>


<style scoped lang="scss">
#backgroundLanding {
	position: absolute;
	z-index: 1000;
	height: 100vh;
	width: 100vw;
	min-height: 100vh;
	background: url("../assets/img/landing1.jpg");
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.rellax-text-container {
	display: flex;
	justify-content: center;
}

.h1-seo {
	display: inline-block;
	color: #fff;
	font-family: Open Sans Condensed, sans-serif;
	font-size: 20vh;
	max-width: 80vw;
	font-weight: 700;
	letter-spacing: -5px;
	text-align: center;
	text-transform: uppercase;
	margin-bottom: 0;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.71);
}

.h3-description {
	color: #fff;
	text-align: center;
	font-size: 2.5vh;
	padding-right: 2vh;
	padding-left: 2vh;
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.71);
}

.icon {
	margin-top: 5vh;
	width: 100%;
	font-size: 6vh;
	color: #fff;
	text-align: center;

	i {
		border-radius: 50%;
		padding: 1.5vh;
		width: 10vh;
		height: 10vh;
		border: #fff solid 5px;
		text-shadow: 0 2px 8px rgba(0, 0, 0, 0.71);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.71);

		&:hover {
			cursor: pointer;
			-webkit-animation-name: bounce;
			animation-name: bounce;
			-webkit-transform-origin: center bottom;
			transform-origin: center bottom;
			-webkit-animation-duration: 1s;
			animation-duration: 1s;
			-webkit-animation-fill-mode: both;
			animation-fill-mode: both;
		}
	}
}

.pro {
	background: #132026;
	height: 35px;
	color: #fff;
	border-radius: 4px;
	font-size: 20px;
	font-weight: 600;
	margin-top: 4vh;
	padding: 6px 10px;
}

@-webkit-keyframes bounce {
	from,
	20%,
	53%,
	80%,
	to {
		-webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}

	40%,
	43% {
		-webkit-animation-timing-function: cubic-bezier(
			0.755,
			0.05,
			0.855,
			0.06
		);
		animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		-webkit-transform: translate3d(0, -30px, 0);
		transform: translate3d(0, -30px, 0);
	}

	70% {
		-webkit-animation-timing-function: cubic-bezier(
			0.755,
			0.05,
			0.855,
			0.06
		);
		animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		-webkit-transform: translate3d(0, -15px, 0);
		transform: translate3d(0, -15px, 0);
	}

	90% {
		-webkit-transform: translate3d(0, -4px, 0);
		transform: translate3d(0, -4px, 0);
	}
}

@keyframes bounce {
	from,
	20%,
	53%,
	80%,
	to {
		-webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
		-webkit-transform: translate3d(0, 0, 0);
		transform: translate3d(0, 0, 0);
	}

	40%,
	43% {
		-webkit-animation-timing-function: cubic-bezier(
			0.755,
			0.05,
			0.855,
			0.06
		);
		animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		-webkit-transform: translate3d(0, -30px, 0);
		transform: translate3d(0, -30px, 0);
	}

	70% {
		-webkit-animation-timing-function: cubic-bezier(
			0.755,
			0.05,
			0.855,
			0.06
		);
		animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
		-webkit-transform: translate3d(0, -15px, 0);
		transform: translate3d(0, -15px, 0);
	}

	90% {
		-webkit-transform: translate3d(0, -4px, 0);
		transform: translate3d(0, -4px, 0);
	}
}

footer {
	position: absolute;
	bottom: 0px;
}
</style>