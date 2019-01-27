<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-8 col-xl-6 col-xxl-4 col-xxxl-3">
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
									<button type="button" class="btn btn-block btn-fill">
										<i class="fas fa-print float-left"></i>
										Printen (naar PDF) 
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

	export default {
		name: "Exporteren",
		computed: {
			werkvoorbereiding(){
				return this.$store.state.werkvoorbereiding
			},
			wvbJson(){
				return JSON.stringify(this.$store.state.werkvoorbereiding, null, "\t")
			}
		},
		methods: {
			opslaanAlsJson(){
				var blob = new Blob([this.wvbJson], {type: "text/plain;charset=utf-8"});
				FileSaver.saveAs(blob, `Werkvoorbereiding_${this.werkvoorbereiding.basisgegevens.naam}_${this.werkvoorbereiding.basisgegevens.project}.json`)
			}
		},
	};
</script>


<style scoped>

</style>