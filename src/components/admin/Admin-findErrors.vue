<template>
	<div class="col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-danger card-header-icon">
				<div class="card-icon">
					<i class="fas fa-bug"></i>
				</div>
				<p
					class="card-category my-0 error"
					:key="key"
					v-for="(error, key) in userErrors"
				>
					{{ error }}
				</p>
			</div>
			<div class="card-footer">
				<div class="stats">
					<i class="material-icons text-danger">error_outline</i>
					<a>{{ totalErrors }} Errors found</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminFindErrors",
	props: ["users"],
	data() {
		return {
			errors: {}
		};
	},
	computed: {
		fbDB() {
			return this.$store.getters.fb.database();
		},
		totalErrors() {
			return Object.keys(this.errors).length;
		},
		userErrors() {
			const noProfile = this.noProfile();
			const IDNotTheSame = this.IDNotTheSame();
			const noProjectInfo = this.noProjectInfo();
			const noEmail = this.noEmail();

			return [
				`${noProfile.length} accounts zonder profiel`,
				`${IDNotTheSame.length} accounts met verschillend ID`,
				`${noEmail.length} accounts zonder email`,
				`${noProjectInfo.length} accounts met wvb's zonder gegevens`
			];
		}
	},
	methods: {
		// Check of er een profile aanwezig in de user Object.
		noProfile() {
			const noEProfile = this.users.filter(user => {
				if (!user.profiel) return true;
			});
			this.errorToErrors(noEProfile, "Geen profiel aanwezig");
			return noEProfile;
		},
		// Check of er een email geregistreerd staat bij het profiel.
		noEmail() {
			const noEmail = this.users.filter(user => {
				if (user.profiel) return !user.profiel.email;
			});
			this.errorToErrors(noEmail, "Geen email in het profiel");
			return noEmail;
		},
		// Check of het id van firebase Auth overeenkomt met ID in het profiel.
		IDNotTheSame() {
			const notTheSameID = this.users.filter(user => {
				if (user.profiel) return user.id != user.profiel.id;
			});
			this.errorToErrors(
				notTheSameID,
				"ID in profiel matched niet met Auth ID"
			);
			return notTheSameID;
		},
		noProjectInfo() {
			const noProjectInfo = this.users.filter(user => {
				if (user.alleWVB) {
					const wvbArray = Object.values(user.alleWVB);
					const noProjectInfo = wvbArray.filter(wvb => {
						if (!wvb.basisgegevens) return true;
					});

					if (noProjectInfo.length) return true;
				}
			});
			this.errorToErrors(
				noProjectInfo,
				"Heeft een project zonder project info"
			);
			return noProjectInfo;
		},
		errorToErrors(array, error) {
			for (const user of array) {
				if (!this.errors[user.id]) {
					this.$set(this.errors, user.id, []);
				}
				this.errors[user.id].push(error);
			}
		}
	}
};
</script>

<style scoped>
#findError {
	margin: 25px auto 0 auto;
	display: block;
}

.error {
	font-size: 0.8rem !important;
	line-height: 16px !important;
}
</style>
