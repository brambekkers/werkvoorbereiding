import Vue from 'vue';
import Vuex from 'vuex';
import uniqid from 'uniqid';
import newWvb from '@/assets/config/newWvb.js';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		fb: null,
		user: null,
		admin: false,

		appData: {
			landingPage: true,
			sidebar: false,
			waitScreen: false,
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
			filter: {
				gegevens: false,
				verkoopprijs: true,
				aantalWerkdagen: true,
				aantalOnderdelen: true,
				favGereedschap: true,
				materiaalKosten: true,
				planningTijd: true,
				agenda: true
			}
		}
	},
	mutations: {
		initializeFbApp(state, fb) {
			state.fb = fb;
			this.dispatch('authStateChange');
		},
		user(state, user) {
			state.user = user;
		},
		admin(state, boolean) {
			state.admin = boolean;
		},
		userData(state, userData) {
			state.userData = userData;
		},
		landingPage(state, boolean) {
			state.appData.landingPage = boolean;
		},
		sidebar(state, boolean) {
			state.appData.sidebar = boolean;
		},
		werkvoorbereiding(state, werkvoorbereiding) {
			// Make new wvb if wvb does not exist or there is no wvb.ID
			if (!state.werkvoorbereiding) state.werkvoorbereiding = this.getters.newWVB;
			else if (!state.werkvoorbereiding.id) state.werkvoorbereiding = this.getters.newWVB;
			// If new WVB is null, set wvb in store to null
			if (werkvoorbereiding === null) state.werkvoorbereiding = null;
			// Merge data to store wvb
			state.werkvoorbereiding = { ...state.werkvoorbereiding, ...werkvoorbereiding };
			this.commit('laatsteBewerking');
		},
		laatsteBewerking(state) {
			const d = new Date();
			const newDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`;

			state.werkvoorbereiding.laatsteBewerking = newDate;
		},
		verhoogStap(state, nextStap) {
			if (!state.werkvoorbereiding.stap) state.werkvoorbereiding.stap = 1;
			if (state.werkvoorbereiding.stap < nextStap) {
				state.werkvoorbereiding.stap = nextStap;
				this.dispatch('dataToFirebase', {
					path: `alleWVB/${state.werkvoorbereiding.id}/stap`,
					data: nextStap
				});
			}
		},
		instellingen(state, instellingen) {
			state.appData.instellingen = instellingen;
		},
		setDashboard(state, { path, value }) {
			state.dashboard[path] = value;
		},
		resetInstellingen(state) {
			state.appData.instellingen = {
				kleur: 'groen',
				modus: 'licht',
				valuta: '€'
			};
			state.dashboard = {
				aantalWerkdagen: 0,
				aantalUren: 0,
				verkoopPrijsInclBtw: 0,
				filter: {
					gegevens: false,
					verkoopprijs: true,
					aantalWerkdagen: true,
					aantalOnderdelen: true,
					favGereedschap: true,
					materiaalKosten: true,
					planningTijd: true,
					agenda: true
				}
			};
			state.admin = false;
		},
		setWaitScreen(state, boolean) {
			state.appData.waitScreen = boolean;
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
			if (getters.userData) return getters.userData.profiel;
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
		newWVB(state, getters) {
			return {
				id: `WVB_${uniqid()}`,
				aangemaaktOp: getters.newDate,
				stap: 1,
				materiaalOpties: newWvb.materiaalOpties,
				planningOpties: newWvb.planningOpties
			};
		},
		alleWerkvoorbereidingen(state, getters) {
			if (getters.userData) return getters.userData.alleWVB;
		},
		werkvoorbereiding(state) {
			return state.werkvoorbereiding;
		},
		werkvoorbereidingsObject: (state, getters) => subObject => {
			if (getters.werkvoorbereiding) return getters.werkvoorbereiding[subObject];
		},
		instellingen(state) {
			return state.appData.instellingen;
		},
		valuta(state, getters) {
			return getters.instellingen.valuta;
		},
		dashboard(state) {
			return state.dashboard;
		},
		newDate() {
			const d = new Date();
			return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`;
		},
		hexColor(state, getters) {
			if (getters.instellingen.kleur === 'roze') return '#e91e63';
			if (getters.instellingen.kleur === 'rood') return '#e53935';
			if (getters.instellingen.kleur === 'geel') return '#ffa726';
			if (getters.instellingen.kleur === 'groen') return '#43a047';
			if (getters.instellingen.kleur === 'blauw') return '#00acc1';
			if (getters.instellingen.kleur === 'paars') return '#8e24aa';
			if (getters.instellingen.kleur === 'grijs') return '#575757';
			else {
				return '#999999';
			}
		}
	},
	actions: {
		authStateChange({ getters, commit, dispatch }) {
			getters.fb.auth().onAuthStateChanged(user => {
				commit('user', user ? user : null);
				if (user) {
					dispatch('FbDatabaseListner', user.uid);
					dispatch('checkRole', user.uid);
				}
			});
		},
		FbDatabaseListner({ getters, commit, dispatch }, userId) {
			const userDatabaseRef = getters.fb.database().ref(`users/${userId}/`);
			userDatabaseRef.on('value', snapshot => {
				const userData = snapshot.val();
				commit('userData', userData);
				dispatch('userSettings');
				dispatch('setLastEditWvb');
			});
		},
		checkRole({ getters, commit }, userId) {
			const checkAdminRef = getters.fb.database().ref(`roles/admin/${userId}`);
			checkAdminRef.on('value', snapshot => {
				if (snapshot.val()) commit('admin', true);
			});
		},
		setLastEditWvb({ commit, getters }) {
			const alleWVBArray = Object.values(getters.alleWerkvoorbereidingen);
			alleWVBArray.sort((a, b) => {
				if (a.laatsteBewerking && b.laatsteBewerking) {
					const aArray = a.laatsteBewerking
						.replace(/\W/g, ' ')
						.split(' ')
						.map(s => Number(s));
					const bArray = b.laatsteBewerking
						.replace(/\W/g, ' ')
						.split(' ')
						.map(s => Number(s));

					return (
						new Date(bArray[2], bArray[1], bArray[0], bArray[3], bArray[4]) -
						new Date(aArray[2], aArray[1], aArray[0], aArray[3], aArray[4])
					);
				}
			});

			if (!getters.werkvoorbereiding) commit('werkvoorbereiding', alleWVBArray[0]);
		},
		login({ getters }, { email, password }) {
			return new Promise(async resolve => {
				try {
					const login = await getters.fb.auth().signInWithEmailAndPassword(email, password);
					resolve(login);
				} catch (error) {
					resolve(error);
				}
			});
		},
		loginWithSocial({ getters }, provider) {
			return new Promise(async resolve => {
				try {
					const login = await getters.fb.auth().signInWithPopup(provider)
					const profileRef = this.$store.getters.fb.database().ref(`users/${register.user.uid}/profiel`);

					// if new, register account in database
					profileRef.on('value', profile => {
						if (!profile.exists()) this.$store.dispatch('newUserFirebase', register.user.uid);
					});
					resolve(login)
				} catch (error) {
					resolve(error);
				}
			});
		},
		register({ getters, dispatch }, { email, password }) {
			return new Promise(async resolve => {
				try {
					const register = await getters.fb.auth().createUserWithEmailAndPassword(email, password);
					register.user.sendEmailVerification();
					dispatch('newUserFirebase', register.user.uid);
					resolve(register);
				} catch (error) {
					resolve(error);
				}
			});
		},
		forgotPassword({ getters }, { email }) {
			return new Promise(async resolve => {
				try {
					const forgotPw = await getters.fb.auth().sendPasswordResetEmail(email);
					resolve(forgotPw);
				} catch (error) {
					resolve(error);
				}
			});
		},
		newUserFirebase({ getters }, userId) {
			const userRef = getters.fb.database().ref(`users/${userId}/profiel`);
			const currentUser = getters.user;

			userRef.set({
				achtergrond: '',
				achternaam: '',
				email: currentUser.email,
				foto: '',
				id: userId,
				klas: '',
				niveau: '',
				over: '',
				tussenvoegsel: '',
				voornaam: ''
			});
		},
		logout({ getters, commit }) {
			return new Promise(async (resolve, reject) => {
				try {
					await getters.fb.auth().signOut();
					commit('resetInstellingen');
					resolve(true);
				} catch (error) {
					reject(error);
				}
			});
		},
		wvbToFirebase({ getters, dispatch }) {
			if (getters.werkvoorbereiding.id) {
				dispatch('dataToFirebase', {
					path: `alleWVB/${getters.werkvoorbereiding.id}`,
					data: getters.werkvoorbereiding
				});
			}
		},
		dataToFirebase({ getters }, { path, data }) {
			if (getters.user) {
				const userId = getters.user.uid;
				const ref = getters.fb.database().ref(`users/${userId}/${path}`);
				ref.set(data);
			}
		},
		deleteDataFirebase({ getters }, path) {
			if (getters.user) {
				const userId = getters.user.uid;
				const ref = getters.fb.database().ref(`users/${userId}/${path}`);
				ref.remove();
			}
		},
		userSettings({ getters, commit }) {
			if (getters.userData.profiel.instellingen) commit('instellingen', getters.userData.profiel.instellingen);
		}
	}
});
