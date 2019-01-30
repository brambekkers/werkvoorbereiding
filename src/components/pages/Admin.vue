<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<AdminAmount :aantal="userAmount" />
				<AdminProjects :aantal="countAllWVB" />

			</div>
			<div class="row">
				<table class="table table-hover table-striped text-center table-sm">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">ID</th>
							<th scope="col">Naam</th>
							<th scope="col">Email</th>
							<th scope="col">Projecten</th>
							<th scope="col">Verwijder</th>
						</tr>
					</thead>
					<tbody v-if="users">
						<tr v-bind:key="index" v-for="(user, key ,index) in users">
							<th scope="row">{{index + 1}}</th>
							<td>{{key}}</td>
							<td>
								<template v-if="haveProfile(user.profiel)">
									{{user.profiel.voornaam}} {{user.profiel.tussenvoegsel}} {{user.profiel.achternaam}}
								</template>
							</td>
							<td>
								<template v-if="haveProfile(user.profiel)">
									{{user.profiel.email}}
								</template>
							</td>
							<td :class="{ 'bg-danger': haveWVB(user.alleWVB) < 1, 'bg-success': haveWVB(user.alleWVB) > 0}">
								
								<div class="dropdown">
									<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
									 aria-haspopup="true" aria-expanded="false">
										{{haveWVB(user.alleWVB)}}
									</button>
									<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
										<a class="dropdown-item" v-bind:key="index" v-for="(wvb, index) in user.alleWVB" @click="copyWvb(wvb)">{{wvb.basisgegevens.project}}</a>
									</div>
								</div>
							</td>
							<td class="py-0"><button type="button" class="btn btn-danger btn-sm" @click="deleteUser(key)">X</button></td>
						</tr>
					</tbody>
				</table>

			</div>
		</div>
	</div>
</template>

<script>
	import AdminAmount from './attributes/Admin-amount.vue';
	import AdminProjects from './attributes/Admin-projects.vue';



	export default {
		name: "Admin",
		components: {
			AdminAmount,
			AdminProjects
		},
		data() {
			return {
				users: {}
			}
		},
		computed: {
			userAmount() {
				if (this.users) {
					return Object.keys(this.users).length
				}
			},
			countAllWVB() {
				if (this.users) {
					let amount = 0
					for (const key in this.users) {
						amount += this.haveWVB(this.users[key].alleWVB)
					}
					return amount
				}
			},
		},
		methods: {
			getUsers() {
				let userDatabase = this.$store.state.appData.firebase.database().ref(`users`);

				userDatabase.once('value', (snapshot) => {
					this.users = snapshot.val()
				});
			},
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
			copyWvb(wvb){

				this.$store.state.userData.alleWVB[wvb.basisgegevens.id] = wvb
			}
		},
		created() {
			this.getUsers();
		}
	};
</script>


<style scoped>
	td {
		font-size: 0.9em;
		padding: 0 0 !important;
	}

	.btn.btn-sm,
	.btn-group-sm>.btn,
	.btn-group-sm .btn {
		padding: 0.2rem 1.25rem;
		font-size: 0.9em;
		margin: 0 0;
	}

	.dropdown-item{
		cursor: pointer;
	}
</style>