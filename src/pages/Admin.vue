<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<AdminAmount :aantal="userAmount" />
				<AdminProjects :aantal="countAllWVB" />
			</div>
			<AdminUserList :users="users" />
		</div>
	</div>
</template>

<script>
import AdminAmount from "@/components/admin/Admin-amount.vue";
import AdminProjects from "@/components/admin/Admin-projects.vue";
import AdminUserList from "@/components/admin/Admin-userList.vue";

export default {
	name: "Admin",
	components: {
		AdminAmount,
		AdminProjects,
		AdminUserList
	},
	data() {
		return {
			users: {}
		};
	},
	computed: {
		userAmount() {
			if (this.users) {
				return Object.keys(this.users).length;
			}
			return 0;
		},
		countAllWVB() {
			if (this.users) {
				let amount = 0;
				for (const key in this.users) {
					amount += this.haveWVB(this.users[key].alleWVB);
				}
				return amount;
			}
			return 0;
		}
	},
	methods: {
		getUsers() {
			let userDatabase = this.$store.getters.fb.database().ref(`users`);
			userDatabase.once("value", snapshot => {
				this.users = snapshot.val();
			});
		},
		haveWVB(alleWVB) {
			if (alleWVB) {
				return Object.keys(alleWVB).length;
			} else {
				return 0;
			}
		}
	},
	created() {
		this.getUsers();
	}
};
</script>


<style scoped>
</style>