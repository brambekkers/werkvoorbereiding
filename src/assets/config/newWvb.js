export default {
	// Algemene gegevens
	id: '',
	aangemaaktOp: '',
	laatsteBewerking: '',
	stap: 2,
	isActief: true,

	// Project gegevens
	basisgegevens: {
		docent: '',
		klas: '',
		naam: '',
		project: ''
	},
	componenten: [{ naam: '', aantal: '' }],
	gereedschap: {
		gereedschap: {
			Accutol: false,
			Bovenfrees: false,
			Decoupeerzaag: false,
			Dominofrees: false,
			Dremel: false,
			Handcirkelzaag: false,
			Klopboor: false,
			Lamellofrees: false,
			Multitool: false,
			Schaafmachine: false,
			Schuurmachine: false,
			Slijptol: false,
			Tacker: false
		},
		machines: {
			Afkortzaag: false,
			Bandschuurmachine: false,
			Cnc: false,
			Draaibank: false,
			Formaatzaag: false,
			Kantenaanlijmmachine: false,
			Kolomboor: false,
			Langgatboor: false,
			Lasersnijder: false,
			Lintzaag: false,
			Pennenbank: false,
			Rijboormachine: false,
			Schulpzaag: false,
			Stationairfrees: false,
			Vandiktebank: false,
			Vandikteschuurmachine: false,
			Vlakbank: false,
			Wandzaag: false
		}
	},
	maten: [
		{
			naam: '',
			aantal: '',
			breedte: '',
			component: '',
			dikte: '',
			lengte: '',
			materiaal: ''
		}
	],
	materiaalOpties: {
		maximaleDikteDuims: 23,
		opslagpercentageMassief: 50,
		opslagpercentagePlaat: 25,
		overlengteKops: 10,
		overlengteLangs: 10,
		overlengteZijdes: 6
	},
	materialen: {
		fineer: [
			{
				// kosten: 0,
				naam: '',
				prijs: ''
			}
		],
		massief: [
			{
				// kosten: 0,
				naam: '',
				prijs: ''
			}
		],
		plaatmateriaal: [
			{
				// kosten: 0,
				naam: '',
				prijs: ''
			}
		]
	},
	overigeMaterialen: [
		{
			aantal: '',
			naam: '',
			prijs: ''
		}
	],
	planning: [
		{
			component: '',
			onderdeel: '',
			stappen: [
				{
					aantal: '',
					bewerking: '',
					bewerkingstijd: '',
					gereedschap: '',
					insteltijd: '',
					stap: '',
					werkzaamheid: ''
				}
			]
		}
	],
	planningOpties: {
		btwTarief: 21,
		dagenWeek: 5,
		indirecteKosten: 0,
		ineffectieveTijd: 10,
		urenWerkdag: 8,
		uurtarief: 10,
		winstOpslag: 5
	}
};
