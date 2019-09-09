<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<div class="card">
						<CardHeader :text="{ title: 'Exporteren', subtitle: 'Je WVB extern opslaan' }" />
						<div class="card-body">
							<div class="row mb-2">
								<div class="col-md-12">
									<button type="button" class="btn btn-block btn-fill" @click="opslaanAlsJson()">
										<i class="fas fa-save float-left"></i>
										Downloaden
									</button>
								</div>
							</div>
							<div class="row mb-2">
								<div class="col-md-12">
									<button type="button" class="btn btn-block btn-fill" @click="opslaanAlsCanvas()">
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

									<div class="collapse" id="collapseExample">
										<div class="card card-body my-0">
											<p><strong>Let op: </strong> functies zijn tijdelijk uitgeschakeld</p>

											<social-sharing
												url="https://dewerkvoorbereider.nl"
												title="De werkvoorbereider.nl"
												description="Bekijk mijn werkvoorbereiding op deWerkvoorbereider.nl"
												quote="De werkvoorbereider heeft mij geholpen mijn werk inzichtelijk te maken"
												hashtags="werkvoorbereiding,prijs,tijd"
												inline-template
											>
												<div class="socialIcons">
													<network network="email">
														<div class="socialIcon mail">
															<i class="fa fa-envelope"></i>
														</div>
													</network>
													<network network="facebook">
														<div class="socialIcon facebook">
															<i class="fab fa-facebook"></i>
														</div>
													</network>
													<network network="linkedin">
														<div class="socialIcon linkedin">
															<i class="fab fa-linkedin"></i>
														</div>
													</network>
													<network network="twitter">
														<div class="socialIcon twitter">
															<i class="fab fa-twitter"></i>
														</div>
													</network>
													<network network="whatsapp">
														<div class="socialIcon whatsapp">
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
import * as FileSaver from 'file-saver';
import html2canvas from 'html2canvas';
import CardHeader from './attributes/Card-header.vue';

export default {
	name: 'Exporteren',
	components: { CardHeader },
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		wvbJson() {
			return JSON.stringify(this.werkvoorbereiding, null, '\t');
		}
	},
	methods: {
		opslaanAlsJson() {
			if (this.werkvoorbereiding) {
				var blob = new Blob([this.wvbJson], {
					type: 'text/plain;charset=utf-8'
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
			if (this.werkvoorbereiding) {
				let _this = this;
				this.$store.commit('setWaitScreen', true);
				this.$router.push('/dashboard');

				// makes screenshot
				setTimeout(async () => {
					const el = document.getElementsByClassName('content')[0];
					const canvas = await html2canvas(el, {
						logging: false
					});

					this.$router.push('/exporteren');
					this.$store.commit('setWaitScreen', false);
					this.$store.state.appData.waitScreen = false;
					canvas.toBlob(blob => {
						// Generate file download
						FileSaver.saveAs(
							blob,
							`Werkvoorbereiding_${_this.werkvoorbereiding.basisgegevens.naam}_${_this.werkvoorbereiding.basisgegevens.project}.png`
						);
					});
				}, 5000);
			} else {
				this.noAccount();
			}
		},
		noAccount() {
			window.Swal.fire({
				title: 'Geen werkvoorbereiding',
				text: 'Er is geen werkvoorbereiding in gebruik. Selecteer een werkvoorbereiding of maak een nieuwe aan.',
				confirmButtonColor: '#F33527',
				confirmButtonText: 'Ik begrijp het!',
				type: 'error'
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

.fullWidth {
	width: 100%;
}

.hide {
	display: none;
}

.socialIcons {
	display: flex;
	width: 100%;
	justify-content: center;

	p {
		width: 100%;
	}
}

.socialIcon {
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
