<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row justify-content-center">
				<div class="col-md-8 col-lg-6 col-xl-5">
					<div class="card">
						<CardHeader :text="{title: 'Importeren', subtitle: 'Een opgeslagen WVB gebruiken' }"/>
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
	import CardHeader from "./attributes/Card-header.vue";
	import Swal from 'sweetalert2'

	export default {
		name: "Importeren",
		components: { CardHeader },
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
				const Toast = Swal.mixin({
					toast: true,
					position: 'top-end',
					showConfirmButton: false,
					timer: 3000
				});

				Toast.fire({
					type: 'success',
					title: 'Data succesvol geimporteerd'
				})
			},
			errorMessage(){
				Swal.fire({
					title: "Niet gevonden",
					text: "De werkvoorbereiding kon niet worden gevonden. Zorg dat je een geldig werkvoorbereidingsbestand selecteerd.",
					confirmButtonColor: '#F33527',
					confirmButtonText: 'Ik begrijp het!',
					type: "error",
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