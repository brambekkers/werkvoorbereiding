<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-xl-12">
					<div class="card">
						<CardHeader
							:text="{
								title: 'Nacalculatie',
								subtitle: 'Wat heb je daadwerkelijk gedaan?'
							}"
						/>
						<div class="card-body">
							<draggable v-model="nacalculatie" handle=".handle">
								<div
									class="row area"
									v-bind:key="i"
									v-for="(calculatie, i) in nacalculatie"
								>
									<div class="col-6 col-sm-4">
										<div class="input-group mb-2">
											<div class="form-group bmd-form-group is-filled">
												<span
													id="basic-addon1"
													class="input-group-text grabbing handle"
												>
													<i class="fab fa-slack-hash"></i>
												</span>
											</div>
											<input
												type="date"
												placeholder="Welke handeling"
												data-toggle="tooltip"
												data-placement="top"
												required="required"
												class="form-control datepicker"
												data-original-title="Op welke datum heb je de handeling uitgevoerd?"
												v-model="calculatie.date"
											/>
										</div>
									</div>
									<div class="col-6 col-sm">
										<div class="input-group mb-2">
											<input
												type="text"
												placeholder="Welke handeling"
												data-toggle="tooltip"
												data-placement="top"
												required="required"
												class="form-control"
												data-original-title="Welk handeling heb je uitgevoerd?"
												v-model.trim="calculatie.naam"
											/>
										</div>
									</div>
									<div class="col-8 col-sm-2">
										<div class="input-group mb-2">
											<input
												type="number"
												placeholder="Aantal minuten"
												min="1"
												data-toggle="tooltip"
												data-placement="top"
												required="required"
												class="form-control"
												data-original-title="Hoeveel minuten ben je daarmee bezig geweest?"
												v-model.number="calculatie.min"
											/>
										</div>
									</div>

									<DeleteButton @delete="removeRegistration(i)" />

									<div class="col-12 d-block d-sm-none">
										<hr class="mt-0" />
									</div>
								</div>
							</draggable>
							<hr />
							<div class="row">
								<div class="col-sm-6 col-md-8 col-xl-9">
									<AddButton
										@add="newRegistration"
										:text="'Voeg nieuwe registratie toe'"
									/>
								</div>
								<div class="col-sm-6 col-md-3 col-xl-2">
									<div class="d-flex">
										<p class="d-inline mr-auto my-0">Aantal registraties:</p>
										<p class="d-inline ml-auto my-0">
											{{ registrationAmount }}
										</p>
									</div>
									<div class="d-flex">
										<p class="d-inline mr-auto my-0">Aantal minuten:</p>
										<p class="d-inline ml-auto my-0">{{ minuteAmount }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12">
							<button
								@click="$router.push('/dashboard')"
								class="btn btn-lg btn-block btn-danger btn-fill"
							>
								Naar Dashboard
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from "@/components/Card-header.vue";
import draggable from "vuedraggable";
import newWvb from "@/assets/config/newWvb.js";
import AddButton from "@/components/Add-button.vue";
import DeleteButton from "@/components/Delete-button.vue";

export default {
	name: "NaCalculatie",
	components: {
		CardHeader,
		draggable,
		AddButton,
		DeleteButton
	},
	data() {
		return {
			nacalculatie: newWvb.nacalculatie
		};
	},
	watch: {
		nacalculatie: {
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
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		getNacalculatie() {
			return this.$store.getters.werkvoorbereidingsObject("nacalculatie");
		},
		registrationAmount() {
			if (this.getNacalculatie) {
				return this.getNacalculatie.length;
			}
			return 0;
		},
		minuteAmount() {
			if (this.nacalculatie) {
				let total = 0;
				for (const cal of this.nacalculatie) {
					total += cal.min;
				}
				return total;
			}
			return 0;
		}
	},
	methods: {
		updateGegevens() {
			if (this.getNacalculatie)
				this.$set(this, "nacalculatie", this.getNacalculatie);
			else this.$set(this, "nacalculatie", newWvb.nacalculatie);
		},
		newRegistration() {
			this.nacalculatie.push({
				naam: "",
				date: null,
				min: null
			});
		},
		removeRegistration(i) {
			this.nacalculatie.splice(i, 1);
		},
		setData() {
			this.$store.commit("werkvoorbereiding", {
				...this.werkvoorbereiding,
				nacalculatie: this.nacalculatie
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

<style scoped>
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
