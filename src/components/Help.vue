<template>
	<div class="fixed-plugin" v-if="texts.length">
		<i class="far fa-question-circle" @click="showHelp()"></i>
	</div>
</template>

<script>
export default {
	name: "Help",
	computed: {
		routeName() {
			if (this.$route.name)
				return this.$route.name.toLowerCase().replace(/\s+/g, "");
			return "";
		},
		hexColor() {
			return this.$store.getters.hexColor;
		},
		texts() {
			if (this.routeName === "gegevens") {
				return [
					{
						title: "Welkom bij de werkvoorbereiding!",
						html:
							`We gaan samen stap voor stap jouw project bestuderen om tot een goede werkvoorbereiding te komen. 
							Denk goed na over je project en vul zo veel mogelijk in! Hoe meer data, hoe beter het resultaat. <br/><br/> 
							
							Mocht je er niet uitkomen, <strong> geen probleem</strong>, per stap kun je altijd op het <strong>?</strong> drukken voor meer informatie.`
					},
					{
						title: "Gegevens",
						text:
							"Op de gegevens pagina vul je de gegevens is van het project. Dit doe je zodat je later gemakkelijk je project kan terugvinden."
					},
					{
						title: "Werk of school?",
						html:
							"Gebruik je dit formulier voor werk, privé of voor school? <br><br>Zet de velden aan die voor jou van toepassing zijn. Gebruik het <strong>+ icoon</strong> om velden aan of uit te zetten."
					}
				];
			}
			if (this.routeName === "componenten") {
				return [
					{
						title: "Wat zijn componenten?",
						html:
							"Om ervoor te zorgen dat we het project goed kunnen bekijken vragen we je het project in kleinere subgroepjes te verdelen. Componenten zijn logische behapbare groepen van onderdelen."
					},
					{
						title: "Een voorbeeld",
						text:
							"Bij een kast kun je bijv denken aan de componenten: romp, lade en onderstel. Deze componenten bestaan vaak uit meerdere onderdelen en materialen."
					},
					{
						title: "Meerdere componenten",
						text:
							"Mocht je nou meerdere van dezelfde componenten hebben (bijv meerdere lades) dan vul je een groter aantal in."
					}
				];
			}
			if (this.routeName === "materialen") {
				return [
					{
						title: "Welke materialen?",
						html:
							"Hier kun je de (hout) materialen invullen die je voor jouw project gaat gebruiken. Vul het massieve hout, plaatmateriaal en fineer in. Bij overige materialen kun je al je andere materialen verwerken. "
					},
					{
						title: "Kosten berekenen",
						text:
							"Om de kosten goed te kunnen berekenen moeten we de juiste waardes invullen voor de kosten. Massiefhout wordt berekend door prijs per m3. Plaatmateriaal en fineer gaat per m2."
					},
					{
						title: "Materiaalopties",
						text:
							'Er zijn ook nog overige factoren waarmee we kunnen rekenen. Deze vindt je terug onder de "materiaal opties". Bekijk deze opties en pas ze aan op jouw project.'
					}
				];
			}
			if (this.routeName === "maten") {
				return [
					{
						title: "Welke maten?",
						html:
							`Hier kun je de maten invullen van de onderdelen die je gaat maken. Denk bijvoorbeeld aan een regel van een tafel. <br><br> 
							Je beschrijft de onderdelen en bij welk component deze horen. Vervolgens geef je het materiaal, aantal en de afmetingen op.`
					},
					{
						title: "Maateenheid",
						text:
							"Om de kosten goed te kunnen berekenen moeten we alle informatie hebben. Alle maten worden ingevoerd in millimeters. Deze maten keer het aantal worden meegenomen in de berekening."
					}
				];
			}
			if (this.routeName === "gereedschap") {
				return [
					{
						title: "Gereedschappen",
						html:
							`Om straks een goede planning te kunnen maken is het handig om aan te geven welke gereedschappen je nodig denkt te hebben. Deze gereedschappen kun je in de volgende stap selecteren tijdens de planning.
							 <br><br> <strong>Let op:</strong> Teveel gereedschappen selecteren kan leiden tot een enorme lange keuzenlijst.`
					},
					{
						title: "Zelf toevoegen",
						html:
							"Mocht jouw gereedschap er niet tussen staan dan kun je deze handmatig toevoegen. Klik op het <strong>+ icoon </strong> om een gereedschap toe te voegen."
					}
				];
			}
			return [];
		}
	},
	methods: {
		showHelp() {
			window.Swal.mixin({
				progressSteps: [...Array(this.texts.length).keys()].map(n => n + 1),
				confirmButtonText: "Volgende &rarr;",
				confirmButtonColor: this.hexColor
			}).queue(this.texts);
		}
	}
};
</script>

<style scoped lang="scss">
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
