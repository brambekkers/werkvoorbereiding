<template>
	<div class="content">
		<div class="container-fluid">
			<div class="row">
				<AdminAmount :aantal="userAmount" />
				<AdminProjects :aantal="countAllWVB" />
				<AdminFindErrors :users="userArray" />
			</div>
			<div class="row">
				<AdminUserList :users="userArray" />
			</div>
		</div>
	</div>
</template>

<script>
import AdminAmount from "@/components/admin/Admin-amount.vue";
import AdminProjects from "@/components/admin/Admin-projects.vue";
import AdminUserList from "@/components/admin/Admin-userList.vue";
import AdminFindErrors from "@/components/admin/Admin-findErrors.vue";

export default {
	name: "Admin",
	components: {
		AdminAmount,
		AdminProjects,
		AdminUserList,
		AdminFindErrors
	},
	data() {
		return {
			users: {}
		};
	},
	computed: {
		userArray() {
			if (this.users) {
				const dataArray = Object.values(this.users);
				dataArray.map((data, index) => (data.id = this.userKeys[index]));
				return dataArray;
			}
			return [];
		},
		userKeys() {
			return Object.keys(this.users);
		},
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

<style scoped></style>
