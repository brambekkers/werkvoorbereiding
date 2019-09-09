<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form">
				<div class="row justify-content-center">
					<div class="col-md-8 col-lg-6 col-xl-5">
						<div class="card">
							<CardHeader :text="{ title: 'Instellingen', subtitle: 'De algemene instellingen' }" />
							<div class="card-body">
								<h6 class="title"><strong>Layout</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Basiskleur</p>
									</div>
									<div class="col-md-4 input-group">
										<select class="form-control" v-model="instellingen.kleur" :class="instellingen.kleur">
											<option value="blauw" class="blauw"></option>
											<option value="grijs" class="grijs"></option>
											<option value="roze" class="roze"></option>
											<option value="paars" class="paars"></option>
											<option value="groen" class="groen"></option>
											<option value="geel" class="geel"></option>
											<option value="rood" class="rood"></option>
										</select>
									</div>
									<div class="col-md-8">
										<p class="col-form-label">Kleurenmodus</p>
									</div>
									<div class="col-md-4 input-group">
										<select class="form-control" v-model="instellingen.modus" :class="instellingen.modus">
											<option value="licht" class="licht">Licht</option>
											<option value="donker" class="donker">Donker</option>
										</select>
									</div>
								</div>
								<hr />
								<h6 class="title"><strong>Financieel</strong></h6>
								<div class="row mb-2">
									<div class="col-md-8">
										<p class="col-form-label">Valuta</p>
									</div>
									<div class="col-md-4 input-group">
										<select class="form-control valutaSelect" v-model="instellingen.valuta">
											<option value="€">Euro €</option>
											<option value="$">Dollar $</option>
											<option value="£">Pound £</option>
											<option value="¥">Yen ¥</option>
										</select>
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
import CardHeader from './attributes/Card-header.vue';

export default {
	name: 'Instellingen',
	components: { CardHeader },
	watch: {
		instellingen: {
			handler() {
				this.$store.dispatch('dataToFirebase', {
					path: `profiel/instellingen`,
					data: this.instellingen
				});
			},
			deep: true
		}
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		instellingen() {
			return this.$store.getters.instellingen;
		}
	}
};
</script>

<style scoped>
.roze {
	background-color: #e91e63;
}

.rood {
	background-color: #e53935;
}

.geel {
	background-color: #ffa726;
}

.groen {
	background-color: #43a047;
}

.blauw {
	background-color: #00acc1;
}

.paars {
	background-color: #8e24aa;
}

.grijs {
	background-color: #575757;
}

.donker {
	background-color: #555555;
	color: #fff;
	padding-left: 1rem;
}

.licht {
	background-color: #fff;
	color: #555555;
	padding-left: 1rem;
}
</style>
