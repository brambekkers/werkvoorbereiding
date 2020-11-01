<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<div class="card">
						<CardHeader
							:text="{
                title: 'Importeren',
                subtitle: 'Een opgeslagen WVB gebruiken'
              }"
						/>
						<div class="card-body">
							<div class="row">
								<div class="col-md-12">
									<input
										type="file"
										class="form-control-file"
										value="Import"
										id="selectFiles"
										accept=".json"
										@change="getJson()"
									/>
								</div>
								<div class="col-md-12">
									<div class="form-group">
										<div rows="20" disabled="disabled" class="mt-4 importResult shadow">
											<JSONView v-if="importObj" :data="importObj" />
										</div>
									</div>
								</div>
								<div class="col-md-12">
									<button id="import" class="btn btn-block" @click="importeer()">Importeer</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CardHeader from "@/components/Card-header.vue";
	import { JSONView } from "vue-json-component";

	export default {
		name: "Importeren",
		components: { CardHeader, JSONView },
		data() {
			return {
				importJson: null
			};
		},
		computed: {
			werkvoorbereiding() {
				return this.$store.getters.werkvoorbereiding;
			},
			importObj() {
				return JSON.parse(this.importJson);
			}
		},
		methods: {
			getJson() {
				let el = document.getElementById("selectFiles");
				if (el.files[0]) {
					let reader = new FileReader();

					reader.onload = this.toJson;
					reader.readAsText(el.files[0]);
				} else {
					this.errorMessage();
				}
			},
			importeer() {
				if (this.importJson) {
					this.$store.dispatch("werkvoorbereiding", this.importObj);
					this.$store.dispatch("wvbToFirebase");

					this.succesMessage();
				}
			},
			toJson(event) {
				this.importJson = event.target.result;
			},
			succesMessage() {
				window.Swal.mixin({
					type: "success",
					title: "Data succesvol geimporteerd",
					toast: true,
					position: "top-end",
					showConfirmButton: false,
					timer: 3000
				}).fire();
			},
			errorMessage() {
				window.Swal.fire({
					title: "Niet gevonden",
					text:
						"De werkvoorbereiding kon niet worden gevonden. Zorg dat je een geldig werkvoorbereidingsbestand selecteerd.",
					confirmButtonColor: "#F33527",
					confirmButtonText: "Ik begrijp het!",
					type: "error"
				});
			}
		}
	};
</script>

<style scoped>
	.importResult {
		background-color: #f5f5f5 !important;
		color: #888888;
		cursor: not-allowed;
		border: 1px solid #e3e3e3;
		border-radius: 5px;
		background-repeat: no-repeat;
		min-height: 20vh;
	}
</style>
