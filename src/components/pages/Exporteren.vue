<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<div class="card">
						<CardHeader :text="{title: 'Exporteren', subtitle: 'Je WVB extern opslaan' }" />
						<div class="card-body">
							<div class="row mb-2">
								<div class="col-md-12">
									<button
										type="button"
										class="btn btn-block btn-fill"
										@click="opslaanAlsJson()"
									>
										<i class="fas fa-save float-left"></i>
										Downloaden
									</button>
								</div>
							</div>
							<div class="row mb-2">
								<div class="col-md-12">
									<button
										type="button"
										class="btn btn-block btn-fill"
										@click="opslaanAlsCanvas()"
									>
										<i class="fas fa-print float-left"></i>
										Printen (afbeelding)
									</button>
								</div>
							</div>
							<div class="row mb-2">
								<div class="col-md-12">
									<button
										type="button"
										class="btn btn-block btn-fill"
										data-toggle="collapse"
										data-target="#collapseExample"
										aria-expanded="false"
										aria-controls="collapseExample"
									>
										<i class="far fa-share-square float-left"></i>
										Delen
									</button>

									<div
										class="collapse"
										id="collapseExample"
									>
										<div class="card card-body my-0">
											<p>Deze functies zijn tijdelijk uitgeschakeld</p>

											<social-sharing
												url="https://dewerkvoorbereider.nl"
												title="De werkvoorbereider.nl"
												description="Bekijk mijn werkvoorbereiding op deWerkvoorbereider.nl"
												quote="De werkvoorbereider heeft mij geholpen mijn werk inzichtelijk te maken"
												hashtags="werkvoorbereiding,prijs,tijd"
												inline-template
											>
												<div class="icons">
													<network network="email">
														<div class="icon mail">
															<i class="fa fa-envelope"></i>
														</div>
													</network>
													<network network="facebook">
														<div class="icon facebook">
															<i class="fab fa-facebook"></i>
														</div>
													</network>
													<network network="linkedin">
														<div class="icon linkedin">
															<i class="fab fa-linkedin"></i>
														</div>
													</network>
													<network network="twitter">
														<div class="icon twitter">
															<i class="fab fa-twitter"></i>
														</div>
													</network>
													<network network="whatsapp">
														<div class="icon whatsapp">
															<i class="fab fa-whatsapp"></i>
														</div>
													</network>
												</div>
											</social-sharing>
										</div>
									</div>
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
import * as FileSaver from "file-saver";
import $ from "jquery";
import html2canvas from "html2canvas";
import CardHeader from "./attributes/Card-header.vue";
import Swal from "sweetalert2";

export default {
	name: "Exporteren",
	components: { CardHeader },
	computed: {
		wvbActive() {
			if (this.$store.state.werkvoorbereiding) {
				if (
					Object.keys(this.$store.state.werkvoorbereiding).length > 0
				) {
					return true;
				}
			}
			return false;
		},
		werkvoorbereiding() {
			return this.$store.state.werkvoorbereiding;
		},
		wvbJson() {
			return JSON.stringify(
				this.$store.state.werkvoorbereiding,
				null,
				"\t"
			);
		}
	},
	methods: {
		opslaanAlsJson() {
			if (this.wvbActive) {
				var blob = new Blob([this.wvbJson], {
					type: "text/plain;charset=utf-8"
				});
				FileSaver.saveAs(
					blob,
					`Werkvoorbereiding_${this.werkvoorbereiding.basisgegevens.naam}_${this.werkvoorbereiding.basisgegevens.project}.json`
				);
			} else {
				this.noAccount();
			}
		},
		opslaanAlsCanvas() {
			if (this.wvbActive) {
				let _this = this;
				this.$store.state.appData.waitScreen = true;
				this.$store.state.appData.waitScreenText =
					"De resultaten worden omgezet naar een afbeelding. Even geduld...";
				this.$store.state.appData.page = 7;
				$(".sidebar").hide();
				$(".main-panel").css("width", "100%");
				setTimeout(() => {
					html2canvas(document.body, { logging: false }).then(
						canvas => {
							this.$store.state.appData.page = 10;
							this.$store.state.appData.waitScreen = false;
							canvas.toBlob(blob => {
								// Generate file download
								window.saveAs(
									blob,
									`Werkvoorbereiding_${_this.werkvoorbereiding.basisgegevens.naam}_${_this.werkvoorbereiding.basisgegevens.project}.png`
								);
								$(".sidebar").show();
								$(".main-panel").css(
									"width",
									"calc(100% - 260px)"
								);
							});
						},
						this
					);
				}, 5000);
			} else {
				this.noAccount();
			}
		},
		noAccount() {
			Swal.fire({
				title: "Geen werkvoorbereiding",
				text:
					"Er is geen werkvoorbereiding in gebruik. Selecteer een werkvoorbereiding of maak een nieuwe aan.",
				confirmButtonColor: "#F33527",
				confirmButtonText: "Ik begrijp het!",
				type: "error"
			});
		}
	}
};
</script>


<style lang="scss">
button {
	i {
		font-size: 1rem;
	}
}

.icons {
	display: flex;
	width: 100%;

	p {
		width: 100%;
	}
}

.icon {
	margin: 5px;
	width: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 5px;

	i {
		font-size: 30px;
		color: white;
	}
}

.mail {
	background: #dd4b39;
}

.facebook {
	background: #3b5998;
}

.twitter {
	background: #55acee;
}

.linkedin {
	background: #0077b5;
}

.whatsapp {
	background: #25d366;
}
</style>