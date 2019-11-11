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
										Opslaan
									</button>
								</div>
							</div>
							<div class="row mb-2">
								<div class="col-md-12">
									<button
										type="button"
										class="btn btn-block btn-fill"
										data-toggle="collapse"
										data-target="#saveAsButtons"
										aria-expanded="false"
										aria-controls="saveAsButtons"
									>
										<i class="fas fa-print float-left"></i>
										Downloaden als
									</button>
									<div class="collapse" id="saveAsButtons">
										<div class="card card-body my-0">
											<p>Je kunt de werkvoorbereiding die je hebt gemaakt downloaden als een afbeelding of PDF.</p>
											<p>
												<strong>Let op: </strong>Dit bestand kun je later <u>niet</u> opnieuw inlezen in dit programma.
												Gebruik daar de <u>opslaan</u> knop voor.
											</p>

											<div class="socialIcons">
												<div class="socialIcon facebook" @click="opslaanAlsCanvas('image')">
													<i class="far fa-image"></i>
												</div>
												<div class="socialIcon mail" @click="opslaanAlsCanvas('pdf')">
													<i class="far fa-file-pdf"></i>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="row mb-2">
								<div class="col-md-12">
									<button
										type="button"
										class="btn btn-block btn-fill"
										data-toggle="collapse"
										data-target="#shareButtons"
										aria-expanded="false"
										aria-controls="shareButtons"
									>
										<i class="far fa-share-square float-left"></i>
										Delen
									</button>

									<div class="collapse" id="shareButtons">
										<div class="card card-body my-0">
											<p v-if="!wvbid && !userid"><strong>Let op: </strong> Eerst inloggen!</p>
											<p>Deze functies werken alleen als je bent ingelogd en een werkvoorbereiding hebt geselecteerd.</p>
											<p v-if="!wvbid && userid">
												<strong>Let op: </strong> Je hebt geen werkvoorbereiding geselecteerd om te delen
											</p>

											<social-sharing
												:url="`https://dewerkvoorbereider.nl/share/${userid}/${wvbid}`"
												title="De werkvoorbereider.nl"
												description="Bekijk mijn werkvoorbereiding op deWerkvoorbereider.nl"
												quote="De werkvoorbereider heeft mij geholpen mijn werk inzichtelijk te maken"
												hashtags="werkvoorbereiding,prijs,tijd"
												inline-template
												v-if="userid && wvbid"
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
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import CardHeader from '@/components/Card-header.vue';

export default {
	name: 'Exporteren',
	components: { CardHeader },
	computed: {
		werkvoorbereiding() {
			return this.$store.getters.werkvoorbereiding;
		},
		wvbJson() {
			return JSON.stringify(this.werkvoorbereiding, null, '\t');
		},
		userid() {
			const user = this.$store.getters.user;
			if (user) return this.$store.getters.user.uid;
			return false;
		},
		wvbid() {
			if (this.werkvoorbereiding) return this.werkvoorbereiding.id;
			return false;
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
		opslaanAlsCanvas(type) {
			if (this.werkvoorbereiding) {
				this.$store.commit('setWaitScreen', true);
				this.$router.push(`/share/${this.userid}/${this.wvbid}`);

				// makes screenshot
				setTimeout(async () => {
					const el = document.getElementsByClassName('content')[0];
					const canvas = await html2canvas(el, {
						logging: false
					});

					this.$router.push('/exporteren');
					this.$store.commit('setWaitScreen', false);
					this.$store.state.appData.waitScreen = false;

					// CREATE image
					if (type === 'image') this.createImage(canvas);
					// CREATE pdf
					if (type === 'pdf') this.createPDF(canvas);
				}, 5000);
			} else {
				this.noAccount();
			}
		},
		createImage(canvas) {
			let _this = this;
			// CREATE PNG
			canvas.toBlob(blob => {
				// Generate file download
				FileSaver.saveAs(
					blob,
					`Werkvoorbereiding_${_this.werkvoorbereiding.basisgegevens.naam}_${_this.werkvoorbereiding.basisgegevens.project}.png`
				);
			});
		},
		createPDF(canvas) {
			const imgData = canvas.toDataURL('image/png');
			const imgWidth = 210;
			const pageHeight = 295;
			const imgHeight = (canvas.height * imgWidth) / canvas.width;
			const doc = new jsPDF('p', 'mm');

			let heightLeft = imgHeight;
			let position = 0; // give some top padding to first page

			doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 10);
			heightLeft -= pageHeight;

			while (heightLeft >= 0) {
				position = heightLeft - imgHeight;
				doc.addPage();
				doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 10);
				heightLeft -= pageHeight;
			}

			doc.save(`Werkvoorbereiding_${this.werkvoorbereiding.basisgegevens.naam}_${this.werkvoorbereiding.basisgegevens.project}.pdf`);
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
	cursor: pointer;

	i {
		font-size: 30px;
		color: white;
	}
}

.socialIcon-small {
	width: 30px !important;
	height: 30px !important;
	i {
		font-size: 15px !important;
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

.google {
	background: #ea4335;
}

.microsoft {
	background: #03a5f0;
}

.disabled {
	opacity: 30%;
	cursor: not-allowed;
}
</style>
