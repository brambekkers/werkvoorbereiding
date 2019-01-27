<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-6 col-lg-8 col-xl-6 col-xxl-4 col-xxxl-3">
					<div class="card">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Importeren</h3>
							<p class="card-category">Een opgeslagen WVB gebruiken</p>
						</div>
						<div class="card-body">
							<div class="row">
								<div class="col-md-12">
									<input type="file" class="form-control-file" value="Import" id="selectFiles" accept='.json'> 
								</div>
								<div class="col-md-12 ">
									<div class="form-group">
										<textarea rows="20" disabled="disabled" id="result" class="form-control h-75 mt-4 importResult" v-model="wvbJson" />
									</div>
								</div>
								<div class="col-md-12">
									<button id="import" class="btn btn-block" @click="importeerJson()">Importeer</button>
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
	export default {
		name: "Importeren",
		data(){
			return{
				wvbJson: null
			}
		},
		methods: {
			importeerJson(){
				let el = document.getElementById("selectFiles")
				if(el.files[0]){
					let reader = new FileReader();

					reader.onload = this.inputFiles;
					reader.readAsText(el.files[0]);
					this.succesMessage()
				}else{
					this.errorMessage()
				}

			},
			inputFiles(event){
				this.toObject(event)
				this.toJson(event)
			},
			toJson(event){
				this.wvbJson = event.target.result
			},
			toObject(event){
				let obj = JSON.parse(event.target.result);
				this.$store.state.werkvoorbereiding = obj
			},
			succesMessage(){
				swal({
					title: "Succesvol geïmporteerd ",
					text: "De werkvoorbereiding is succesvol geïmporteerd. Je kunt nu verder gaan met bewerken of de data bekijken.",
					dangerMode: false,
					icon: "success",
				})
			},
			errorMessage(){
				swal({
					title: "Niet gevonden",
					text: "De werkvoorbereiding kon niet worden gevonden. Zorg dat je een geldig werkvoorbereidingsbestand selecteerd.",
					dangerMode: true,
					icon: "error",
				})
			}

		}
	};
</script>


<style scoped>
	.importResult{
		background-color: #F5F5F5 !important;
		color: #888888;
		cursor: not-allowed;
		border: 1px solid #E3E3E3;
		border-bottom: 1px dotted #d2d2d2;
		background-repeat: no-repeat;
	}

</style>