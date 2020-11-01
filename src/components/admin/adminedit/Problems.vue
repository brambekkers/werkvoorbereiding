<template>
	<div class="card">
		<div class="card-header mb-0">
			<h4 class="card-title">Problems</h4>
		</div>
		<div class="card-body">
			<template v-for="(problem, catKey) in problems.data">
				<b-card
					header-bg-variant="light"
					header-tag="header"
					:key="catKey"
					class="mt-0 border border-light"
					header-class="my-0 border-bottom border-dark"
					v-if="problem.length"
				>
					<!-- Header -->
					<template v-slot:header>
						<h5 class="my-0">{{catKey}}</h5>
						<p class="card-category">{{problem.length}} problemen</p>
					</template>
					<!-- Body -->
					<div class="row my-0">
						<!-- Col left -->
						<b-card-group deck class="col-3">
							<b-card no-body class="mt-0">
								<b-list-group flush>
									<b-list-group-item
										:variant="selected[catKey] && selected[catKey].user && selected[catKey].user.id === user.id ? 'dark' : ''"
										v-for="(user,index) of problem"
										class="button"
										:key="user.id"
										@click="selectUser(catKey, user)"
									>{{ index }} - {{user.id}}</b-list-group-item>
								</b-list-group>
							</b-card>
						</b-card-group>
						<!-- Col right -->
						<b-card class="col-9 mt-0">
							<JSONView v-if="selected[catKey] && selected[catKey].user" :data="selected[catKey].user" />
						</b-card>
					</div>
				</b-card>
			</template>
		</div>
	</div>
</template>

<script>
	import { JSONView } from "vue-json-component";

	export default {
		name: "Problems",
		data() {
			return {
				selected: {}
			};
		},
		components: { JSONView },
		props: ["problems"],
		methods: {
			selectUser(catKey, user) {
				let s = this.selected[catKey];
				if (!s) this.createCat(catKey, user);

				if (s) {
					if (!s.user || s.user != user.id) {
						this.$set(s, "user", user);
					} else {
						this.$set(s, "user", null);
					}
				}
			},
			createCat(catKey, user) {
				this.$set(this.selected, catKey, {});
				this.selectUser(catKey, user);
			}
		}
	};
</script>

<style scoped lang="scss">
	.button {
		cursor: pointer;

		&:hover {
			background: lightgray;
		}
	}
</style>
