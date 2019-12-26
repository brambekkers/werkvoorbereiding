<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-md-10 col-lg-8 col-xl-7 col-xxl-6 col-xxxl-4 ">
						<div class="card">
							<CardHeader
								:text="{
									title: 'Componenten',
									subtitle: 'Deel je werk op in stukken'
								}"
							/>
							<div class="card-body">
								<div
									class="row"
									v-bind:key="i"
									v-for="(component, i) in componenten"
								>
									<div class="col">
										<div class="input-group mb-2">
											<div class="input-group-prepend ">
												<span class="input-group-text pl-0"
													><i class="fa fa-tag fa-fw"></i
												></span>
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
									<div class="col-3">
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

									<DeleteButton @delete="removeComponent(i)" />
								</div>
								<AddButton @add="newComponent" :text="'Voeg component toe'" />
							</div>
						</div>
						<PreviousNextButton :previous="'gegevens'" />
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import newWvb from "@/assets/config/newWvb.js";

import CardHeader from "@/components/Card-header.vue";
import AddButton from "@/components/Add-button.vue";
import DeleteButton from "@/components/Delete-button.vue";
import PreviousNextButton from "@/components/Previous-next-button.vue";

export default {
	name: "Componenten",
	components: { CardHeader, DeleteButton, AddButton, PreviousNextButton },
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
			return this.$store.getters.werkvoorbereidingsObject("componenten");
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
			if (this.getComponenten)
				this.$set(this, "componenten", this.getComponenten);
			else
				this.componenten = this.$set(this, "componenten", newWvb.componenten);
		},
		newComponent() {
			this.componenten.push({
				naam: "",
				aantal: ""
			});
		},
		removeComponent(i) {
			this.componenten.splice(i, 1);
		},
		nextStep() {
			this.setData();
			this.$store.commit("verhoogStap", 3);
			this.$router.push("/materialen");
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				componenten: this.componenten
			});
			this.$store.dispatch("wvbToFirebase");
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
