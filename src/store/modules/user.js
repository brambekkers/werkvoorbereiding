import router from '@/router'

export default {
    state: {
        user: null,
        userData: {
            alleWVB: [],
        },
    },
    getters: {
        user(state) {
            return state.user;
        },
        userData(state) {
            return state.userData;
        },
        profiel(state, getters) {
            if (getters.userData) return getters.userData.profiel;
        }
    },
    mutations: {
        user(state, user) {
            state.user = user;
        },
        userData(state, userData) {
            state.userData = userData;
        }
    },
    actions: {
        authStateChange({ getters, commit, dispatch }) {
            getters.fb.auth().onAuthStateChanged((user) => {
                commit('user', user ? user : null);
                if (user) dispatch('updateUserData')
            });
        },
        login({ getters, dispatch }, { email, password }) {
            return new Promise(async resolve => {
                try {
                    const login = await getters.fb.auth().signInWithEmailAndPassword(email, password);
                    const profileRef = getters.fb.database().ref(`users/${login.user.uid}/profiel`);

                    // Check user:
                    // if new, register account in database
                    profileRef.on('value', profile => {
                        if (!profile.exists()) dispatch('newUserFirebase', login.user.uid);
                    });
                    dispatch('updateUserMetadata');
                    resolve(login);
                } catch (error) {
                    resolve(error);
                }
            });
        },
        loginWithSocial({ getters, dispatch }, provider) {
            return new Promise(async resolve => {
                try {
                    const login = await getters.fb.auth().signInWithPopup(provider)
                    const profileRef = getters.fb.database().ref(`users/${login.user.uid}/profiel`);

                    // Check user:
                    // if new, register account in database
                    profileRef.on('value', profile => {
                        if (!profile.exists()) dispatch('newUserFirebase', login.user.uid);
                    });
                    dispatch('updateUserMetadata');
                    resolve(login)
                } catch (error) {
                    resolve(error);
                }
            });
        },
        async updateUserData({ getters, commit, dispatch }) {
            const userData = await dispatch('FbDownloadUserData', getters.user.uid);
            commit('userData', userData);
            dispatch('userSettings');
            dispatch('setLastEditWvb');
            dispatch('checkRole', getters.user.uid);
        },
        FbDownloadUserData({ getters }, userId) {
            return new Promise((resolve) => {
                const userDatabaseRef = getters.fb.database().ref(`users/${userId}/`);
                userDatabaseRef.once('value', snapshot => {
                    resolve(snapshot.val())
                });
            });
        },
        userSettings({ getters, commit }) {
            // If user setting loaded from server. Change settings to user settings
            if (getters.userData.profiel.instellingen) commit('instellingen', getters.userData.profiel.instellingen);
        },
        updateUserMetadata({ getters, dispatch }) {
            const user = getters.user;
            dispatch('dataToFirebase', {
                path: `metadata`,
                data: {
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime
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
        logout({ getters, commit }) {
            return new Promise(async (resolve, reject) => {
                try {
                    await getters.fb.auth().signOut();
                    commit('resetInstellingen');
                    commit('userData', { alleWVB: [] });
                    router.push("/");
                    resolve(true);
                } catch (error) {
                    reject(error);
                }
            });
        },
        deleteUser({ getters }, uid) {
            // if UID is given, delete uid 
            // else delete own account
            const user = getters.user
            const id = uid ? uid : user.uid

            // Delete data from the database
            const ref = getters.fb.database().ref(`users/${id}`);
            ref.remove();

            // If its your own account, delete user from Auth
            if (!uid) {
                user.delete().then(() => {
                    console.log('account verwijderd')
                }).catch(e => {
                    console.log('Error', e)
                });
            }

        },


    }
}