<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<div class="card">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Exporteren</h3>
							<p class="card-category">Je WVB extern opslaan</p>
						</div>
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
									<button type="button" class="btn btn-block btn-fill" @click="opslaanAlsCanvas()">
										<i class="fas fa-print float-left"></i>
										Printen (afbeelding) 
									</button>
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
	import $ from 'jquery';
	import html2canvas from 'html2canvas';

	export default {
		name: "Exporteren",
		computed: {
			wvbActive(){
				if(this.$store.state.werkvoorbereiding){
					if(Object.keys(this.$store.state.werkvoorbereiding).length > 0){
						return true
					}
				}
				return false
			},
			werkvoorbereiding(){
				return this.$store.state.werkvoorbereiding
			},
			wvbJson(){
				return JSON.stringify(this.$store.state.werkvoorbereiding, null, "\t")
			}
		},
		methods: {
			opslaanAlsJson(){
				if(this.wvbActive){
					var blob = new Blob([this.wvbJson], {type: "text/plain;charset=utf-8"});
					FileSaver.saveAs(blob, `Werkvoorbereiding_${this.werkvoorbereiding.basisgegevens.naam}_${this.werkvoorbereiding.basisgegevens.project}.json`)
				}else{
					this.noAccount()
				}
			},
			opslaanAlsCanvas(){
				if(this.wvbActive){
					let _this = this
					this.$store.state.appData.page = 7
					$(".sidebar").hide();
					$(".main-panel").css( "width", '100%');
					setTimeout(()=>{
						html2canvas(document.body).then((canvas)=>{
							this.$store.state.appData.page = 10
							canvas.toBlob(function(blob) {
								// Generate file download
								window.saveAs(blob, `Werkvoorbereiding_${_this.werkvoorbereiding.basisgegevens.naam}_${_this.werkvoorbereiding.basisgegevens.project}.png`);
								$(".sidebar").show();
								$(".main-panel").css( "width", 'calc(100% - 260px)');
							});
						},this);
					},1000)
				}else{
					this.noAccount()
				}
			},
			noAccount(){
				swal({
					title: "Geen werkvoorbereiding",
					text: "Er is geen werkvoorbereiding in gebruik. Selecteer een werkvoorbereiding of maak een nieuwe aan.",
					dangerMode: true,
					icon: "error",
				})
			}
		},
	};
</script>


<style scoped>

</style>