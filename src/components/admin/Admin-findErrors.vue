<template>
	<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card card-stats">
			<div class="card-header card-header-danger card-header-icon">
				<div class="card-icon">
					<i class="fas fa-bug"></i>
				</div>
				<button
					id="findError"
					v-if="!totalErrors"
					class="btn btn-outline-danger shadow-none"
					@click="findErrors()"
				>
					Zoek errors
				</button>
				<button
					id="findError"
					v-if="totalErrors"
					class="btn btn-outline-success shadow-none"
					@click="fixErrors()"
				>
					Fix errors
				</button>
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
		totalErrors() {
			return Object.keys(this.errors).length;
		}
	},
	methods: {
		findErrors() {
			const noProfile = this.noProfile();
			const IDNotTheSame = this.IDNotTheSame();
			const noEmail = this.noEmail();

			window.Swal.fire({
				title: "Errors gevonden",
				html: `${noProfile.length} accounts zonder profiel<br> ${IDNotTheSame.length} accounts met verschillend ID<br> ${noEmail.length} accounts zonder email<br>`,
				confirmButtonColor: "#F33527",
				confirmButtonText: "Ik begrijp het!",
				type: "error"
			});
		},
		fixErrors() {
			this.fixNoProfile();
			this.fixIDNotTheSame();

			this.errors = {};
		},
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
		errorToErrors(array, error) {
			for (const user of array) {
				if (!this.errors[user.id]) {
					this.$set(this.errors, user.id, []);
				}
				this.errors[user.id].push(error);
			}
		},
		fixNoProfile() {
			for (const user of this.noProfile()) {
				if (user.id) {
					const userRef = this.$store.getters.fb
						.database()
						.ref(`users/${user.id}/profiel`);

					userRef.set({
						achtergrond: "",
						achternaam: "",
						email: "",
						foto: "",
						id: user.id,
						klas: "",
						niveau: "",
						over: "",
						tussenvoegsel: "",
						voornaam: ""
					});
				}
			}
		},
		fixIDNotTheSame() {
			for (const user of this.IDNotTheSame()) {
				if (user.id) {
					const userRef = this.$store.getters.fb
						.database()
						.ref(`users/${user.id}/profiel/id`);

					userRef.set(user.id);
				}
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
</style>
