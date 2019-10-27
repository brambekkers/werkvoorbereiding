<template>
	<div
		class="content py-auto"
		v-if="userData"
	>
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-8">
					<div class="card mt-4">
						<CardHeader :text="{ title: 'Bewerk je profiel', subtitle: 'Laat andere weten wie jij bent en wat je doet' }" />
						<div class="card-body">
							<form v-if="profiel">
								<div class="row">
									<div class="col-md-5">
										<div class="form-group">
											<label>Voornaam</label>
											<input
												type="text"
												placeholder="Voornaam"
												v-model="profiel.voornaam"
												class="form-control"
											/>
										</div>
									</div>
									<div class="col-md-2">
										<div class="form-group">
											<label>Tussenvoegsel</label>
											<input
												type="text"
												placeholder="Tussenvoegsel"
												v-model="profiel.tussenvoegsel"
												class="form-control"
											/>
										</div>
									</div>
									<div class="col-md-5">
										<div class="form-group">
											<label>Achternaam</label>
											<input
												type="text"
												placeholder="Achternaam"
												v-model="profiel.achternaam"
												class="form-control"
											/>
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label for="exampleInputEmail1">Email adres</label>
											<input
												type="email"
												placeholder="Email"
												v-model="profiel.email"
												disabled="disabled"
												class="form-control"
											/>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label>Klas</label> <input
												type="text"
												placeholder="Klas"
												v-model="profiel.klas"
												class="form-control"
											/>
										</div>
									</div>
									<div class="col-md-3">
										<div class="form-group">
											<label>Niveau</label>
											<select
												class="form-control"
												v-model="profiel.niveau"
											>
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
											<textarea
												rows="3"
												cols="80"
												placeholder="Op deze plek kun je iets over jezelf vertellen."
												v-model="profiel.over"
												class="form-control"
											/>
											</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="card card-user mt-4">
						<div class="card-header card-header-success p-0">
							<div class="card-image">
								<a data-toggle="modal" data-target="#achtergrondFoto" class="pointer" v-if="profiel">
									<img src="./../assets/img/hout.jpg" />
								</a>
							</div>
						</div>
						<div class="card-body" v-if="profiel">
							<div class="author">
								<a data-toggle="modal" data-target="#profielFoto" class="pointer">
									<img v-if="!profielFoto" src="./../assets/img/default-avatar.png" class="avatar" />
									<img v-if="profielFoto" :src="profiel.foto" class="avatar" />
								</a>
								<h5 class="title">{{ profiel.voornaam }} {{ profiel.tussenvoegsel }} {{ profiel.achternaam }}</h5>
								<p class="description">{{ profiel.klas }} <span class="mx-2"> | </span> {{ profiel.niveau }}</p>
							</div>
							<p class="description text-center">{{ profiel.over }}</p>
						</div>
						<hr />
						<div class="card-footer">
							<div class="stats"><i class="fas fa-puzzle-piece mx-3"></i> Aantal projecten: {{ amountWvb }}</div>
						</div>
					</div>
				</div>
			</div>
			<div
				id="profielFoto"
				tabindex="-1"
				role="dialog"
				aria-labelledby="myModalLabel"
				aria-hidden="true"
				class="modal fade modal-mini modal-primary"
				style="display: none;"
			>
				<div class="modal-dialog">
					<div class="modal-content" v-if="profiel">
						<div class="modal-header justify-content-center">Profielfoto link</div>
						<div class="modal-body text-center">
							<div class="form-group"><input type="text" placeholder="http://" class="form-control" v-model="profiel.foto" /></div>
						</div>
					</div>
				</div>
			</div>
			<div
				id="achtergrondFoto"
				tabindex="-1"
				role="dialog"
				aria-labelledby="myModalLabel"
				aria-hidden="true"
				class="modal fade modal-mini modal-primary"
				style="display: none;"
			>
				<div class="modal-dialog">
					<div class="modal-content" v-if="profiel">
						<div class="modal-header justify-content-center">Achtergrondfoto profiel link</div>
						<div class="modal-body text-center">
							<div class="form-group"><input type="text" placeholder="http://" class="form-control" /></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CardHeader from "@/components/Card-header.vue";

export default {
	name: "Profiel",
	components: { CardHeader },
	watch: {
		profiel: {
			handler() {
				this.$store.dispatch("dataToFirebase", {
					path: `profiel`,
					data: this.profiel
				});
			},
			deep: true
		}
	},
	computed: {
		userData() {
			return this.$store.getters.userData;
		},
		alleWerkvoorbereidingen() {
			return this.$store.getters.alleWerkvoorbereidingen;
		},
		profiel() {
			return this.$store.getters.profiel;
		},
		profielFoto() {
			if (this.profiel.foto.length > 5) {
				return true;
			} else {
				return false;
			}
		},
		amountWvb() {
			if (this.alleWerkvoorbereidingen)
				return Object.keys(this.alleWerkvoorbereidingen).length;

			return 0;
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
	border: 5px solid #ffffff;
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
	box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56),
		0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.card .author {
	text-transform: uppercase;
}
</style>
