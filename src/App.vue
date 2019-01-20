<template>
	<div id="app" class="wrapper">
		<Sidebar/>
		<Main/>
	</div>
</template>

<script>
	import "./assets/css/material-dashboard.css";

	import fb from "firebase";
	import firebaseConfig from "./assets/config/firebaseConfig.js";
	import $ from "jquery";
	import popper from "popper.js";
	import bootstrap from "bootstrap";

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
					console.log("Werkvoorbereiding is aangepast")
				},
				deep: true
			}
		},
		components: {
			Sidebar,
			Main
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
						this.checkIfUserExist()
						this.FbDatabaseListner()
					} else {
						this.$store.state.appData.user = null;
						console.log("User not logged in");
					}
				});
			},
			checkIfUserExist(){
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
				let userDatabase = this.$store.state.appData.firebase.database().ref(`users/${userId}`);
				userDatabase.on('value', function(snapshot) {
					if(snapshot.exists() === false){
						this.setNewDataFb();
					}
				},this);
			},
			setNewDataFb(){
				let currentUser = this.$store.state.appData.firebase.auth().currentUser
				let userId = currentUser.uid;
				this.$store.state.appData.firebase.database().ref(`users/${userId}`).set({
					profiel: {
						aantalProjecten: "",
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
			updateDataFB(){
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid
				this.$store.state.appData.firebase.database().ref(`users/${userId}`).set(this.userData);
			},
			FbDatabaseListner() {
				let userId = this.$store.state.appData.firebase.auth().currentUser.uid;
				let userDatabase = this.$store.state.appData.firebase.database().ref(`users/${userId}/`);

				// User data of single user
				userDatabase.on('value', function(snapshot) {
					this.$store.state.userData = snapshot.val()
				},this);	
			},
		},
		created() {
			this.FbConnection();
			this.FbAuth();
		}
	};
</script>

<style>
</style>