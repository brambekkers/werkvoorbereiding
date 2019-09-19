<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4 ">
						<div class="card">
							<CardHeader :text="{ title: 'Componenten', subtitle: 'Deel je werk op in stukken' }" />
							<div class="card-body">
								<div class="row" v-bind:key="index" v-for="(component, index) in componenten">
									<div class="col-md-7">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span class="input-group-text"><i class="fa fa-tag fa-fw"></i></span>
											</div>
											<input
												type="text"
												placeholder="Component"
												data-toggle="tooltip"
												data-placement="top"
												title=""
												required="required"
												class="form-control"
												data-original-title="Wat is de naam van het component?"
												v-model="component.naam"
											/>
										</div>
									</div>
									<div class="col-8 col-md-3">
										<div class="input-group mb-2">
											<input
												type="number"
												placeholder="Aantal"
												data-toggle="tooltip"
												data-placement="top"
												min="1"
												title=""
												required="required"
												class="form-control"
												data-original-title="Hoe vaak komt dit component voor in het project?"
												v-model="component.aantal"
											/>
										</div>
									</div>
									<div class="col-2 col-md-2">
										<div class="input-group mb-2">
											<button type="button" class="btn btn-sm btn-danger" @click="removeComponent(index)">
												<i class="fa fa-trash"></i>
											</button>
										</div>
									</div>
									<div class="col-12 d-block d-md-none">
										<hr />
									</div>
								</div>
								<hr />
								<button type="button" class="btn" @click="newComponent()"><i class="fa fa-plus mr-3"></i>Nieuw component</button>
							</div>
						</div>
						<div class="row">
							<div class="col-md-6">
								<button type="button" class="btn btn-lg btn-block btn-danger btn-fill" @click="previousStep()">
									<div class="row">
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-left"></i></div>
										<div class="col-10">Vorige stap</div>
									</div>
								</button>
							</div>
							<div class="col-md-6">
								<button type="submit" class="btn btn-lg btn-block">
									<div class="row">
										<div class="col-10">Volgende stap</div>
										<div class="col-2"><i aria-hidden="true" class="fa fa-chevron-right"></i></div>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import newWvb from '@/assets/config/newWvb.js';

import CardHeader from './attributes/Card-header.vue';

export default {
	name: 'Componenten',
	components: { CardHeader },
	data() {
		return {
			componenten: newWvb.componenten
		};
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getComponenten() {
			return this.$store.getters.werkvoorbereidingsObject('componenten');
		}
	},
	watch: {
		componenten: {
			handler() {
				this.setData();
			},
			deep: true
		},
		werkvoorbereiding: {
			handler() {
				this.updateGegevens();
			},
			deep: true
		}
	},
	methods: {
		updateGegevens() {
			if (this.getComponenten) this.$set(this, 'componenten', this.getComponenten);
			else this.componenten = this.$set(this, 'componenten', newWvb.componenten);
		},
		newComponent() {
			this.componenten.push({
				naam: '',
				aantal: ''
			});
		},
		removeComponent(i) {
			this.componenten.splice(i, 1);
		},
		previousStep() {
			this.$router.push('/gegevens');
		},
		nextStep() {
			this.setData();
			this.$store.commit('verhoogStap', 3);
			this.$router.push('/materialen');
		},
		setData() {
			this.$store.commit('werkvoorbereiding', {
				...this.werkvoorbereiding,
				componenten: this.componenten
			});
			this.$store.dispatch('wvbToFirebase');
		}
	},
	mounted() {
		window.$('[data-toggle="tooltip"]').tooltip({
			delay: { show: 500, hide: 0 }
		});
		this.updateGegevens();
	}
};
</script>

<style scoped></style>
