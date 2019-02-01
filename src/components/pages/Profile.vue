<template>
	<div class="content py-auto" v-if="userData">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-8">
					<div class="card mt-4">
						<div class="card-header card-header-success">
							<h3 class="card-title">
								<i class="fa fa-industry fa-lg pr-4"></i>Bewerk je profiel</h3>
							<p class="card-category">Laat andere weten wie jij bent en wat je doet</p>
						</div>
						<div class="card-body">
							<form v-if="profiel">
								<div class="row">
									<div class="col-md-5">
										<div class="form-group"><label>Voornaam</label> <input type="text" placeholder="Voornaam" v-model="profiel.voornaam"
											 class="form-control"></div>
									</div>
									<div class="col-md-2">
										<div class="form-group"><label>Tussenvoegsel</label> <input type="text" placeholder="Tussenvoegsel" v-model="profiel.tussenvoegsel"
											 class="form-control"></div>
									</div>
									<div class="col-md-5">
										<div class="form-group"><label>Achternaam</label> <input type="text" placeholder="Achternaam" v-model="profiel.achternaam"
											 class="form-control"></div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group"><label for="exampleInputEmail1">Email adres</label> <input type="email" placeholder="Email"
											 v-model="profiel.email" disabled="disabled" class="form-control"></div>
									</div>
									<div class="col-md-3">
										<div class="form-group"><label>Klas</label> <input type="text" placeholder="Klas" v-model="profiel.klas"
											 class="form-control"></div>
									</div>
									<div class="col-md-3">
										<div class="form-group"><label>Niveau</label> 
											<select class="form-control" v-model="profiel.niveau">
												<option>Niveau 2</option>
												<option>Niveau 3</option>
												<option>Niveau 4</option>
											</select>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group">
											<label>Over mij</label> 
											<textarea rows="3" cols="80" placeholder="Op deze plek kun je iets over jezelf vertellen."  v-model="profiel.over"  class="form-control">
											 </textarea></div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card card-user mt-4">
						<div class="card-header card-header-success p-0">
							<div class="card-image" >
								<a data-toggle="modal" data-target="#achtergrondFoto" class="pointer" v-if="profiel">
									<img src="./../../assets/img/hout.jpg">
								</a>
							</div>
						</div>
						<div class="card-body" v-if="profiel">
							<div class="author">
								<a data-toggle="modal" data-target="#profielFoto" class="pointer">
									<img v-if="!profielFoto" src="./../../assets/img/default-avatar.png" class="avatar">
									<img v-if="profielFoto" :src="profiel.foto" class="avatar">
								</a>
								<h5 class="title">{{ profiel.voornaam }} {{ profiel.tussenvoegsel }}  {{ profiel.achternaam }}</h5>
								<p class="description"> {{ profiel.klas }} <span class="mx-2"> | </span> {{ profiel.niveau }} </p>
							</div>
							<p class="description text-center">{{ profiel.over }}</p>
						</div>
						<hr>
						<div class="card-footer">
							<div class="stats"><i class="fas fa-puzzle-piece mx-3"></i> Aantal projecten: {{ projectAmount() }} </div>
						</div>
					</div>
				</div>
			</div>
			<div id="profielFoto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" class="modal fade modal-mini modal-primary"
			 style="display: none;">
				<div class="modal-dialog">
					<div class="modal-content" v-if="profiel">
						<div class="modal-header justify-content-center"> Profielfoto link </div>
						<div class="modal-body text-center">
							<div class="form-group"><input type="text" placeholder="http://" class="form-control" v-model="profiel.foto"></div>
						</div>
					</div>
				</div>
			</div>
			<div id="achtergrondFoto" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" class="modal fade modal-mini modal-primary"
			 style="display: none;">
				<div class="modal-dialog">
					<div class="modal-content" v-if="profiel">
						<div class="modal-header justify-content-center"> Achtergrondfoto profiel link </div>
						<div class="modal-body text-center">
							<div class="form-group"><input type="text" placeholder="http://" class="form-control"></div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "Profile",
		watch: {
			profiel:  {
				handler(newValue) {
					this.profileToFB();
				},
				deep: true
			}
		},
		computed: {
			userData(){
				return this.$store.state.userData
			},
			userDataExist(){
				if(this.userData){
					if(Object.keys(this.userData).length > 0){
						return true
					}
				}
				return false
			},
			profiel(){
				if(this.userDataExist){
					return this.$store.state.userData.profiel
				}
			},
			profielFoto(){
				if(this.profiel.foto.length > 5){
					return true
				}else{
					return false
				}
			}
		},
		methods: {
			projectAmount(){
				if(this.userDataExist){ 
					if(this.userData.alleWVB){ 
						return Object.keys(this.userData.alleWVB).length 
					} 
					else{
						return 0  
					} 
				}
			},
			profileToFB(){
				if (this.$store.state.appData.user && this.profiel) {
					let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
					this.$store.state.appData.firebase.database().ref(`users/${userId}/profiel`).set(this.profiel);
				}
			}
		}
	};
</script>


<style scoped>
	.pointer {
		cursor: pointer;
	}

	.card .card-image {
		width: 100%;
		overflow: hidden;
		height: 92px;
		border-radius: 4px 4px 0 0;
		position: relative;
		-webkit-transform-style: preserve-3d;
		-moz-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}

	.card .card-image img {
		width: 100%;
		border-radius: 3px;
	}

	.card-user .avatar {
		border: 5px solid #FFFFFF;
		position: relative;
		margin-bottom: 15px;
	}

	.card-user .author {
		text-align: center;
		text-transform: none;
		margin-top: -70px;
	}

	.card-user .avatar {
		width: 124px;
		height: 124px;
		position: relative;
		z-index: 10;
		margin-bottom: 15px;
		box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
	}

	.card .author {
		text-transform: uppercase;
	}
</style>