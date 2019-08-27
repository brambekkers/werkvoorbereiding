import Vue from 'vue'
import Vuex from 'vuex'
import uniqid from "uniqid";
import newWvb from "@/assets/config/newWvb.js";


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		fb: null,
		user: null,
		admin: false,

		appData: {
			landingPage: true,
			sidebar: false,
			waitScreen: false,
			waitScreenText: '',
			instellingen: {
				kleur: 'groen',
				modus: 'licht',
				valuta: '€'
			}
		},
		userData: {},
		werkvoorbereiding: null,
		dashboard: {
			aantalWerkdagen: 0,
			aantalUren: 0,
			verkoopPrijsInclBtw: 0,
		}
	},
	mutations: {
		initializeFbApp(state, fb){
			state.fb = fb;
		},
		user(state, user) {
			state.user = user;
		},
		userData(state, userData){
			state.userData = userData;
		},
		landingPage(state, boolean){
			state.appData.landingPage = boolean
		},
		sidebar(state, boolean){
			state.appData.sidebar = boolean
		},
		werkvoorbereiding (state, werkvoorbereiding) {
			if(!state.werkvoorbereiding){
				state.werkvoorbereiding = {
					id: `WVB_${uniqid()}`,
					aangemaaktOp: this.getters.newDate,
					stap: 1,
					materiaalOpties: newWvb.materiaalOpties,
					planningOpties: newWvb.planningOpties,
				};
			}
			state.werkvoorbereiding = {...state.werkvoorbereiding, ...werkvoorbereiding};
			this.commit('laatsteBewerking')
		},
		laatsteBewerking(state){
			const d = new Date();
			const newDate = `${d.getDate()}-${d.getMonth() +
				1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`;
				
			state.werkvoorbereiding.laatsteBewerking = newDate
		},
		verhoogStap(state, nextStap){
			if(state.werkvoorbereiding.stap < nextStap){
				state.werkvoorbereiding.stap = nextStap

				this.dispatch("dataToFirebase", {
					path: `alleWVB/${state.werkvoorbereiding.id}/stap`,
					data: nextStap
				});
			}
			
		}, 
		instellingen (state, instellingen) {
			state.appData.instellingen = instellingen;
		},
		setDashboard (state, {path, value}) {
			state.dashboard[path] = value;
		},
		resetInstellingen(state){
			state.appData.instellingen = {
				kleur: 'groen',
				modus: 'licht',
				valuta: '€'
			}
		}
	},
	getters: {
		fb(state) {
			return state.fb;
		},
		user(state) {
			return state.user;
		},
		userData(state) {
			return state.userData;
		},
		profiel(state, getters) {
			if(getters.userData) return getters.userData.profiel
		},
		admin(state) {
			return state.admin;
		},
		landingPage(state) {
			return state.appData.landingPage;
		},
		sidebar(state) {
			return state.appData.sidebar;
		},
		alleWerkvoorbereidingen(state, getters) {
			if(getters.userData) return getters.userData.alleWVB
		},
		werkvoorbereiding(state){
			return state.werkvoorbereiding;
		},
		werkvoorbereidingsObject: (state, getters) => (subObject) => {
			if(getters.werkvoorbereiding) return getters.werkvoorbereiding[subObject]
		},
		instellingen(state){
			return state.appData.instellingen
		},
		valuta(state, getters){
			return getters.instellingen.valuta
		},
		dashboard(state){
			return state.dashboard
		},
		newDate() {
			const d = new Date();
			return `${d.getDate()}-${d.getMonth() +
				1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`;
		}
	},
	actions: {
		FbDatabaseListner({getters, commit, dispatch}, userId) {
			const userDatabaseRef = getters.fb.database().ref(`users/${userId}/`);
			userDatabaseRef.on('value', snapshot => {
				const userData = snapshot.val()
				commit("userData", userData);
				dispatch("userSettings");
				dispatch("setFirstWvb")
			});
		},
		setFirstWvb({commit, getters}){
			const userData = getters.userData
			if(userData.alleWVB){
				if(!getters.werkvoorbereiding) commit("werkvoorbereiding", userData.alleWVB[Object.keys(userData.alleWVB)[0]]);
			}
		},
		login({getters}, {email, password}){
			return new Promise(async (resolve, reject) => { 
				try {
					const login = await getters.fb.auth().signInWithEmailAndPassword(email, password)
					resolve(login) 
				} catch(error) {
					resolve(error)
				}
			});
		},
		register({getters, dispatch}, {email, password}){
			return new Promise(async (resolve, reject) => { 
				try {
					const register = await getters.fb.auth().createUserWithEmailAndPassword(email, password)
					register.user.sendEmailVerification();
					dispatch("newUserFirebase", register.user.uid);
					resolve(register) 
				} catch(error) {
					resolve(error)
				}
			});
		},
		newUserFirebase({getters}, userId) {
			const userRef = getters.fb.database().ref(`users/${userId}/profiel`)
			const currentUser = getters.user

			userRef.set({
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
			});
			console.log('new user made')
		},
		logout({getters, commit}) {
			getters.fb.auth().signOut().then(() => {
				commit("resetInstellingen");
				console.log("User Logout");
			}).catch((error) => {
				console.error(error);
			});
		},
		dataToFirebase({getters}, {path, data}){
			if(getters.user){
				const userId = getters.user.uid
				const ref = getters.fb.database().ref(`users/${userId}/${path}`)
				ref.set(data);
			}
		},
		deleteDataFirebase({getters}, path){
			if(getters.user){
				const userId = getters.user.uid
				const ref = getters.fb.database().ref(`users/${userId}/${path}`)
				ref.remove();
			}
		},
		userSettings({getters, commit}){
			if(getters.userData.instellingen) commit("instellingen", getters.userData.instellingen); 
		}
	}
});