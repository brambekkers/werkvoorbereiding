<template>
	<div class="accordion" id="accordionAdmin">
		<!-- Search -->
		<form class="form-inline justify-content-end">
			<input class="form-control mr-sm-8 w-25" type="search" placeholder="Zoeken" aria-label="Search">
			<button class="btn btn-success my-2 my-sm-0" type="submit">Zoeken</button>
		</form>
		<!-- Accordion -->
		<div class="card cardlist" v-bind:key="userKeys[(page * amount)+index]" v-for="(user, index) in paginatedData">
			<div class="card-header" data-toggle="collapse" :data-target="`#accordion${index}`">
				<div class="row text-center">
					<div class="col-md-1"><strong>{{((page - 1) * amount)+index + 1}}</strong></div>
					<div class="col-md-3">
						<p class="mb-0 idkey">{{userKeys[(page * amount)+index]}}</p>
					</div>
					<div class="col-md-3">
						<p class="mb-0" v-if="haveProfile(user.profiel)">{{user.profiel.voornaam}}
							{{user.profiel.tussenvoegsel}}
							{{user.profiel.achternaam}}</p>
					</div>
					<div class="col-md-2">
						<div class="p-1 h-100 rounded"
							:class="{ 'bglichtrood': !haveProfile(user.profiel), 'bglichtgroen': haveProfile(user.profiel)}">
							Profiel
						</div>
					</div>
					<div class="col-md-2">
						<div class="p-1 h-100 rounded"
							:class="{ 'bglichtrood': haveWVB(user.alleWVB) < 1, 'bglichtgroen': haveWVB(user.alleWVB) > 0}">
							Projecten <strong>{{haveWVB(user.alleWVB)}}</strong>
						</div>
					</div>
					<div class="col-md-auto">
						<button type="button" class="btn btn-danger btn-block btn-sm h-100 my-0"
							@click="deleteUser(key)">X</button>
					</div>
				</div>
			</div>

			<div :id="`accordion${index}`" class="collapse" data-parent="#accordionAdmin">
				<div class="card-body">
					<div class="row">
						<div class="col-md-8" v-if="haveProfile(user.profiel)">
							<div class="row">
								<div class="col-md-2 card-user">
									<h6>Foto:</h6>
									<img v-if="!user.profiel.foto" src="./../../../assets/img/default-avatar.png"
										class="avatar img-fluid rounded-circle">
									<img v-if="user.profiel.foto" :src="user.profiel.foto" class="avatar img-fluid">
								</div>
								<div class="col-md-4">
									<h6>Profiel informatie</h6>
									<p>Naam: {{user.profiel.voornaam}} {{user.profiel.tussenvoegsel}}
										{{user.profiel.achternaam}}</p>
									<p>Klas: {{user.profiel.klas}} </p>
									<p>Niveau: {{user.profiel.niveau}} </p>
								</div>
								<div class="col-md-6">
									<h6>Over Mij:</h6>
									<p>{{user.profiel.over}} </p>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<div class="row">
								<div class="col" v-if="haveWVB(user.alleWVB) > 0">
									<h6>Projecten</h6>
									<div class="border">
										<a class="dropdown-item projectItem" v-bind:key="key"
											v-for="(wvb, key, index) in user.alleWVB" @click="copyWvb(wvb)">{{index+1}}
											- {{wvb.basisgegevens.project}}</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<nav aria-label="Page navigation example">
			<div id="pageAmountContainer" class="input-group mb-3 float-left w-25">
				<div class="input-group-prepend">
					<label class="input-group-text" for="pageAmount">Users per pagina</label>
				</div>
				<select v-model="amount" class="custom-select" id="pageAmount">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="50">50</option>
					<option value="100">100</option>
					<option :value="userArray.length">Alles</option>
				</select>
			</div>

			<ul class="pagination justify-content-center mt-2">
				<b-pagination v-model="page" :total-rows="userAmount" :per-page="amount"/>
			</ul>
		</nav>
	</div>
</template>

<script>
	import $ from "jquery"

	export default {
		name: "AdminUserList",
		props: ['users'],
		data() {
			return {
				page: 1,
				amount: 10,
			}
		},
		computed: {
			userArray() {
				return Object.values(this.users)
			},
			userKeys() {
				return Object.keys(this.users)
			},
			userAmount(){
				return Object.keys(this.users).length
			},
			paginatedData() {
				let start = (this.page-1) * this.amount
				let end = start + this.amount;
				return this.userArray.slice(start, end);
			}
		},
		methods: {
			haveProfile(profile) {
				if (profile) {
					return true
				} else {
					return false
				}
			},
			haveWVB(alleWVB) {
				if (alleWVB) {
					return Object.keys(alleWVB).length
				} else {
					return 0
				}
			},
			deleteUser(key) {

			},

			copyWvb(wvb) {
				this.$store.state.userData.alleWVB[wvb.basisgegevens.id] = wvb
			},
		},
		mounted() {
			$('.collapse').on('show.bs.collapse', function () {
				$('.collapse.in').collapse('hide');
			});
		}
	};
</script>


<style scoped>
	.cardlist {
		cursor: pointer;
		margin: 0;
		padding: 0;
		border-radius: 0;
	}

	.cardlist:nth-child(even) {
		background-color: #f2f2f2;
	}

	.cardlist:hover,
	.projectItem:hover {
		background-color: #f2f2f2;
	}

	.projectItem {
		cursor: pointer;
	}

	.projectItem:nth-child(odd) {
		background-color: #fff;
	}

	.projectItem:nth-child(even) {
		background-color: #f2f2f2;
	}

	.idkey {
		font-size: 0.7rem;
	}

	.page-link {
		cursor: pointer;
	}

	.bglichtgroen {
		background: rgba(202, 243, 202, 0.5)
	}

	.bglichtrood {
		background: rgba(248, 212, 209, 0.5)
	}

	.card-body {
		background: #fff;
	}

	#pageAmountContainer {
		position: absolute;
	}
</style>