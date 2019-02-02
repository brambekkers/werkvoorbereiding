<template>
	<div id="app" class="wrapper">
		<Sidebar data-html2canvas-ignore/>
		<Main/>
	</div>
</template>

<script>
	import "./assets/css/material-dashboard.css";

	import fb from "firebase/app";
	import 'firebase/auth';
	import 'firebase/database';
	import firebaseConfig from "./assets/config/firebaseConfig.js";
	import $ from "jquery";
	import popper from "popper.js";
	import bootstrap from "bootstrap";
	import swal from 'sweetalert';

	import Sidebar from "./components/layout/Sidebar";
	import Main from "./components/layout/Main";

	export default {
		name: "app",
		watch: {
			userData: {
				handler(newValue) {
					this.updateDataFB()
				},
				deep: true
			},
			werkvoorbereiding: {
				handler(newValue) {
					this.setWvbTime();
					this.WvbToFb();
				},
				deep: true
			},
		},
		components: {
			Sidebar,
			Main
		},
		computed: {
			werkvoorbereiding() {
				return this.$store.state.werkvoorbereiding
			},
			page() {
				return this.$store.state.appData.page
			}
		},
		methods: {
			FbConnection() {
				this.$store.state.appData.firebase = fb.initializeApp(firebaseConfig);
			},
			FbAuth() {
				this.$store.state.appData.firebase.auth().onAuthStateChanged(user => {
					if (user) {
						this.$store.state.appData.user = user;
						console.log("User logged in as:", user.displayName);
						this.checkIfUserExist();
						this.FbDatabaseListner();
						this.checkRole();
					} else {
						this.$store.state.appData.user = null;
						this.$store.state.userData = null;
						this.$store.state.appData.admin = false
					}
				});
			},
			checkIfUserExist() {
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
				let userDatabase = this.$store.state.appData.firebase.database().ref(`users/${userId}`);
				userDatabase.on('value', function (snapshot) {
					if (snapshot.exists() === false) {
						this.setNewDataFb();
					}
				}, this);
			},
			checkRole(){
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
				let checkAdmin = this.$store.state.appData.firebase.database().ref(`roles/admin/${userId}`);
				checkAdmin.on('value', function (snapshot) {
					if (snapshot.val()) {
						this.$store.state.appData.admin = true
					}else{
						this.$store.state.appData.admin = false
					}
				}, this);
			},
			setNewDataFb() {
				let currentUser = this.$store.state.appData.firebase.auth().currentUser
				let userId = currentUser.uid;
				this.$store.state.appData.firebase.database().ref(`users/${userId}`).set({
					profiel: {
						achtergrond: "",
						achternaam: "",
						email: currentUser.email,
						foto: "",
						id: userId,
						klas: "",
						niveau: "",
						over: "",
						tussenvoegsel: "",
						voornaam: "",
					}
				});
				console.log('new user made')
			},
			updateDataFB() {
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid
				this.$store.state.appData.firebase.database().ref(`users/${userId}`).set(this.userData);
			},
			FbDatabaseListner() {
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
				let userDatabase = this.$store.state.appData.firebase.database().ref(`users/${userId}/`);

				// User data of single user
				userDatabase.on('value', function (snapshot) {
					this.$store.state.userData = snapshot.val()
				}, this);
			},
			setWvbTime() {
				if (this.werkvoorbereiding) {
					let d = new Date()
					let date = `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`

					this.$store.state.werkvoorbereiding.laatsteBewerking = date
				}
			},
			WvbToFb() {
				if (this.$store.state.appData.user && this.werkvoorbereiding) {
					let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
					let userDatabase = this.$store.state.appData.firebase.database().ref(`users/${userId}/`);

					this.$store.state.appData.firebase.database().ref(`users/${userId}/alleWVB/${this.werkvoorbereiding.id}`).set(this
						.werkvoorbereiding);
				}
			},
		},
		created() {
			this.FbConnection();
			this.FbAuth();
		}
	};
</script>

<style>
	html{
		overflow-x: hidden;
	}
	
	.main-panel>.content {
		margin-top: 10px;
		padding: 30px 15px;
		min-height: calc(100vh - 165px);
	}
	.swal-text {
		text-align: center;
	}
	.stats a{
		color: #999999
	}
</style>