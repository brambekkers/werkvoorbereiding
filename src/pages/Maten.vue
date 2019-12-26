<template>
	<div class="content">
		<div class="container-fluid">
			<form role="form" @submit.prevent="nextStep()">
				<div class="row justify-content-center">
					<div class="col-xl-12">
						<div class="card">
							<CardHeader
								:text="{
									title: 'Maten',
									subtitle: 'Hoe groot zijn je onderdelen'
								}"
							/>
							<div class="card-body">
								<draggable v-model="maten" handle=".handle">
									<div
										class="row maten"
										v-bind:key="i"
										v-for="(maat, i) in maten"
									>
										<div class="col-8 col-md-4 col-xl pl-0">
											<div class="input-group mb-2">
												<div class="input-group-prepend">
													<span id="basic-addon1" class="input-group-text">
														<i class="fab fa-slack-hash handle"></i>
													</span>
												</div>
												<input
													type="text"
													placeholder="Naam onderdeel"
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Welk onderdeel ga je bematen?"
													v-model="maat.naam"
												/>
											</div>
										</div>
										<div class="col-4 col-md-4 col-xl-1">
											<div class="input-group mb-2">
												<input
													type="number"
													min="1"
													placeholder="Aantal"
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Hoeveel stuks heb je van dit onderdeel?"
													v-model="maat.aantal"
												/>
											</div>
										</div>
										<div class="col-6 col-md-4 col-xl-2">
											<div class="input-group mb-2">
												<select
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Welk component?"
													v-model="maat.component"
												>
													<option value="" selected disabled hidden
														>Kies een component</option
													>
													<option
														v-bind:key="index"
														v-for="(component, index) in getComponenten"
														>{{ component.naam }}</option
													>
												</select>
											</div>
										</div>
										<div class="col-6 col-md col-xl-2">
											<div class="input-group mb-2">
												<select
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Welk materiaal?"
													v-model="maat.materiaal"
												>
													<option value="" selected disabled hidden
														>Kies een materiaal</option
													>
													<optgroup
														label="Massiefhout"
														v-if="massief && massief.length"
													>
														<option
															v-bind:key="i"
															v-for="(materiaal, i) in massief"
															>{{ materiaal.naam }}</option
														>
													</optgroup>
													<optgroup
														label="Plaatmateriaal"
														v-if="plaatmateriaal && plaatmateriaal.length"
													>
														<option
															v-bind:key="i"
															v-for="(materiaal, i) in plaatmateriaal"
															>{{ materiaal.naam }}</option
														>
													</optgroup>
													<optgroup
														label="Fineer"
														v-if="fineer && fineer.length"
													>
														<option
															v-bind:key="i"
															v-for="(materiaal, i) in fineer"
															>{{ materiaal.naam }}</option
														>
													</optgroup>
													<optgroup
														label="Overige materialen"
														v-if="
															getOverigeMaterialen &&
																getOverigeMaterialen.length
														"
													>
														<option
															v-bind:key="i"
															v-for="(materiaal, i) in getOverigeMaterialen"
															>{{ materiaal.naam }}</option
														>
													</optgroup>
												</select>
											</div>
										</div>
										<div class="col-4 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<input
													type="number"
													placeholder="Lengte"
													min="1"
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Wat is de lengte in mm?"
													v-model="maat.lengte"
												/>
											</div>
										</div>
										<div class="col-4 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<input
													type="number"
													placeholder="Breedte"
													min="1"
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Wat is de breedte in mm?"
													v-model="maat.breedte"
												/>
											</div>
										</div>
										<div class="col-2 col-md-2 col-xl-1">
											<div class="input-group mb-2">
												<input
													type="number"
													placeholder="Dikte"
													min="1"
													data-toggle="tooltip"
													data-placement="top"
													required="required"
													class="form-control"
													data-original-title="Wat is de dikte in mm?"
													v-model="maat.dikte"
												/>
											</div>
										</div>
										<DeleteButton @delete="removeMaten(i)" />
									</div>
								</draggable>
								<hr />
								<AddButton @add="newMaat" :text="'Voeg onderdeel toe'" />
							</div>
						</div>
						<PreviousNextButton :previous="'materialen'" />
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import newWvb from "@/assets/config/newWvb.js";
import CardHeader from "@/components/Card-header.vue";
import draggable from "vuedraggable";
import AddButton from "@/components/Add-button.vue";
import DeleteButton from "@/components/Delete-button.vue";
import PreviousNextButton from "@/components/Previous-next-button.vue";

export default {
	name: "Maten",
	data() {
		return {
			maten: newWvb.maten
		};
	},
	components: {
		CardHeader,
		draggable,
		AddButton,
		DeleteButton,
		PreviousNextButton
	},
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getMaten() {
			return this.$store.getters.werkvoorbereidingsObject("maten");
		},
		getComponenten() {
			return this.$store.getters.werkvoorbereidingsObject("componenten");
		},
		getMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject("materialen");
		},
		getOverigeMaterialen() {
			return this.$store.getters.werkvoorbereidingsObject("overigeMaterialen");
		},
		massief() {
			if (this.getMaterialen) {
				return this.getMaterialen.massief || false;
			}
			return false;
		},
		plaatmateriaal() {
			if (this.getMaterialen) {
				return this.getMaterialen.plaatmateriaal || false;
			}
			return false;
		},
		fineer() {
			if (this.getMaterialen) {
				return this.getMaterialen.fineer || false;
			}
			return false;
		}
	},
	watch: {
		maten: {
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
			if (this.getMaten) this.$set(this, "maten", this.getMaten);
			else this.$set(this, "maten", newWvb.maten);
		},
		newMaat() {
			this.maten.push({
				naam: "",
				aantal: "",
				breedte: "",
				component: "",
				dikte: "",
				lengte: "",
				materiaal: ""
			});
		},
		removeMaten(i) {
			this.maten.splice(i, 1);
		},
		nextStep() {
			this.setData();
			this.$store.commit("verhoogStap", 5);
			this.$router.push("/gereedschap");
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				maten: this.maten
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

<style scoped lang="scss">
.card-body {
	.maten {
		padding-top: 0.4rem;
		margin: 0 10px;
		border-radius: 0.2rem;

		i {
			cursor: move; /* fallback if grab cursor is unsupported */
			cursor: -webkit-grab;
			cursor: grab;
		}

		i:active {
			cursor: -webkit-grabbing;
			cursor: grabbing;
		}
	}
	.maten:nth-child(odd) {
		background: rgba(0, 0, 0, 0.1);
	}
}

.grabbing {
	cursor: move;
	/* fallback if grab cursor is unsupported */
	cursor: grab;
	cursor: -moz-grab;
	cursor: -webkit-grab;
}

/* (Optional) Apply a "closed-hand" cursor during drag operation. */
.grabbing:active {
	cursor: grabbing;
	cursor: -moz-grabbing;
	cursor: -webkit-grabbing;
}
</style>
