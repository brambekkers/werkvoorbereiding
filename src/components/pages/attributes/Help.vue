<template>
	<div class="fixed-plugin" v-if="isVisible">
		<i class="far fa-question-circle" @click="showHelp()"></i>
	</div>
</template>

<script>
export default {
	name: 'Help',
	computed: {
		routeName() {
			return this.$route.name.toLowerCase().replace(/\s+/g, '');
		},
		isVisible() {
			const helpPages = ['gegevens', 'componenten', 'materialen', 'maten', 'gereedschap', 'planning', 'nacalculatie'];
			return helpPages.filter(pageName => pageName === this.routeName).length > 0 ? true : false;
		},
		texts() {
			if (this.routeName === 'gegevens') {
				return {
					numbers: ['1', '2', '3'],
					pages: [
						{
							title: 'Welkom bij de werkvoorbereiding!',
							html:
								'We gaan samen stap voor stap jouw project bestuderen om tot een goede werkvoorbereiding te komen. Denk goed na over je project en vul zo veel mogelijk in! Hoe meer data hoe beter resultaat. <br/><br/> Mocht je er niet uitkomen, <strong> geen probleem </strong> per stap kun je altijd op het ? drukken voor meer informatie.'
						},
						{
							title: 'Gegevens',
							text:
								'Op de gegevens pagina vul je de gegevens is van het project. Dit doe je zodat je later gemakkelijk je project kan terugvinden'
						},
						{
							title: 'Niet op school?',
							text: 'Mocht je geen klas of docent hebben kun je deze velden leeg laten of voor iets anders gebruiken.'
						}
					]
				};
			}
		}
	},
	methods: {
		showHelp() {
			window.Swal.mixin({
				progressSteps: this.texts.numbers,
				confirmButtonText: 'Volgende &rarr;'
			}).queue(this.texts.pages);
		}
	}
};
</script>

<style scoped>
i {
	font-size: 2rem;
	color: #ffffff;
	padding: 10px;
	border-radius: 0 0 6px 6px;
	width: auto;
}

i:hover {
	cursor: pointer;
	-webkit-animation-duration: 1.3s;
	-webkit-animation-name: heartBeat;
	-webkit-animation-timing-function: ease-in-out;
	animation-duration: 1.3s;
	animation-name: heartBeat;
	animation-timing-function: ease-in-out;
}

@-webkit-keyframes heartBeat {
	0% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}

	14% {
		-webkit-transform: scale(1.3);
		transform: scale(1.3);
	}

	28% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}

	42% {
		-webkit-transform: scale(1.3);
		transform: scale(1.3);
	}

	70% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

@-moz-keyframes heartBeat {
	0% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}

	14% {
		-webkit-transform: scale(1.3);
		transform: scale(1.3);
	}

	28% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}

	42% {
		-webkit-transform: scale(1.3);
		transform: scale(1.3);
	}

	70% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

@keyframes heartBeat {
	0% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}

	14% {
		-webkit-transform: scale(1.3);
		transform: scale(1.3);
	}

	28% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}

	42% {
		-webkit-transform: scale(1.3);
		transform: scale(1.3);
	}

	70% {
		-webkit-transform: scale(1);
		transform: scale(1);
	}
}

.fixed-plugin {
	position: fixed;
	top: 75%;
	right: 0;
	width: 64px;
	background: rgba(0, 0, 0, 0.3);
	z-index: 1031;
	border-radius: 8px 0 0 8px;
	text-align: center;
}
</style>
