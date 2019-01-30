<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-8">
						<div class="card">
							<div class="card-header card-header-success">
								<h3 class="card-title">
									<i class="fa fa-industry fa-lg pr-4"></i>Privacy</h3>
								<p class="card-category">Hoe gaan wij om met de privacy</p>
							</div>
							<div class="card-body">
								<div class="row">
									<div class="col-12">
										<p class="mt-4">DeWerkvoorbereider is verantwoordelijk voor de verwerking van persoonsgegevens zoals weergegeven in deze
											privacyverklaring. DeWerkvoorbereider probeert zo min mogelijk gegevens te verzamelen. DeWerkvoorbereider
											kan gebruikt worden zonder account. Op deze manier wordt het aantal verzaamlende gegevens geminimaliseerd.</p>


										<h4>Persoonsgegevens die wij verwerken</h4>
										<p>DeWerkvoorbereider verwerkt je persoonsgegevens doordat je gebruik maakt van onze diensten en/of omdat je
											deze gegevens zelf aan ons verstrekt. Hieronder vind je een overzicht van de persoonsgegevens die wij
											verwerken:
											<ul>
												<li>Voor- en achternaam</li>
												<li>E-mailadres</li>
												<li>Overige persoonsgegevens die je actief verstrekt bijvoorbeeld door een profiel op deze website aan te
													maken.</li>
												<li>Gegevens over jouw activiteiten op onze website</li>
											</ul>
										</p>


										<h4>Bijzondere en/of gevoelige persoonsgegevens die wij verwerken</h4>
										<p>Onze website en/of dienst heeft niet de intentie gegevens te verzamelen over websitebezoekers die jonger
											zijn
											dan 16 jaar. Tenzij ze toestemming hebben van ouders of voogd. We kunnen echter niet controleren of een
											bezoeker ouder dan 16 is. Wij raden ouders dan ook aan betrokken te zijn bij de online activiteiten van hun
											kinderen, om zo te voorkomen dat er gegevens over kinderen verzameld worden zonder ouderlijke toestemming.
											Als je er van overtuigd bent dat wij zonder die toestemming persoonlijke gegevens hebben verzameld over een
											minderjarige, neem dan contact met ons op via info@dewerkvoorbereider.nl, dan verwijderen wij deze
											informatie.</p>

										<h4>Met welk doel en op basis van welke grondslag wij persoonsgegevens verwerken</h4>
										DeWerkvoorbereider verwerkt jouw persoonsgegevens voor de volgende doelen:

										<ul>
											<li>Je de mogelijkheid te bieden een account aan te maken en oude werkvoorbereidingen op te slaan.</li>
										</ul>

										<h4>Hoe lang we persoonsgegevens bewaren</h4>
										<p>DeWerkvoorbereider bewaart je persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren
											waarvoor je gegevens worden verzameld. Je kunt ten alle tijden zelfstandig jouw account verwijderen onder
											jouw profiel.</p>

										<h4>Cookies, of vergelijkbare technieken, die wij gebruiken</h4>
										<p>DeWerkvoorbereider gebruikt functionele, analytische en tracking cookies. Een cookie is een klein
											tekstbestand dat bij het eerste bezoek aan deze website wordt opgeslagen in de browser van je computer,
											tablet of smartphone. DeWerkvoorbereider gebruikt cookies met een puur technische functionaliteit. Deze
											zorgen ervoor dat de website naar behoren werkt en dat bijvoorbeeld jouw voorkeursinstellingen onthouden
											worden. Deze cookies worden ook gebruikt om de website goed te laten werken en deze te kunnen optimaliseren.
											Daarnaast plaatsen we cookies die jouw surfgedrag bijhouden zodat we op maat gemaakte content en
											advertenties
											kunnen aanbieden.</p>

										<h4>Gegevens inzien, aanpassen of verwijderen</h4>
										<p>Je hebt het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Dit kun je zelf doen
											via de persoonlijke instellingen van jouw account. Daarnaast heb je het recht om je eventuele toestemming
											voor de gegevensverwerking in te trekken of bezwaar te maken tegen de verwerking van jouw persoonsgegevens
											door ons en heb je het recht op gegevensoverdraagbaarheid. Dat betekent dat je bij ons een verzoek
											kan indienen om de persoonsgegevens die wij van jou beschikken in een computerbestand naar jou of een ander,
											door jou genoemde organisatie, te sturen. Wil je gebruik maken van je recht op bezwaar en/of recht op
											gegevensoverdraagbaarheid of heb je andere vragen/opmerkingen over de gegevensverwerking, stuur dan een
											gespecificeerd verzoek naar <strong>info@dewerkvoorbereider.nl</strong>. Om er zeker van te zijn dat het
											verzoek tot inzage
											door jou is gedaan, vragen wij jou een kopie van je identiteitsbewijs bij het verzoek mee te sturen. Maak in
											deze kopie je pasfoto, MRZ (machine readable zone, de strook met nummers onderaan het paspoort),
											paspoortnummer en Burgerservicenummer (BSN) zwart. Dit ter bescherming van je privacy. DeWerkvoorbereider
											zal
											zo snel mogelijk, maar in ieder geval binnen vier weken, op jouw verzoek reageren.
										</p>

										<h4>Hoe wij persoonsgegevens beveiligen</h4>
										<p>DeWerkvoorbereider neemt de bescherming van jouw gegevens serieus en neemt passende maatregelen om misbruik,
											verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde wijziging tegen te gaan. Als jij het
											idee hebt dat jouw gegevens toch niet goed beveiligd zijn of er aanwijzingen zijn van misbruik, neem dan
											contact op met onze klantenservice of via info@dewerkvoorbereider.nl
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Privacy",
	};
</script>


<style scoped>
	h4{
		margin-top: 2rem;
		margin-bottom: 0rem;
		text-decoration: underline;
	}
</style>