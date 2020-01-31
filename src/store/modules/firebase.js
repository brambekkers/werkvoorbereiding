export default {
    state: {
        fb: null,
        canUpload: true,

    },
    getters: {
        fb(state) {
            return state.fb;
        },
        canUpload(state) {
            return state.canUpload
        },
    },
    mutations: {
        canUpload(state, boolean) {
            state.canUpload = boolean
        },
        initializeFbApp(state, fb) {
            state.fb = fb;
            this.dispatch('authStateChange');
        },
    },
    actions: {
        newUserFirebase({ getters, dispatch }) {
            const user = getters.user;

            dispatch('dataToFirebase', {
                path: `profiel`,
                data: {
                    achtergrond: '',
                    achternaam: '',
                    email: user.email,
                    foto: '',
                    id: user.uid,
                    klas: '',
                    niveau: '',
                    over: '',
                    tussenvoegsel: '',
                    voornaam: ''
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
        dataToFirebase({ getters, commit }, { path, data }) {
            if (getters.user && getters.canUpload) {
                const userId = getters.user.uid;
                const ref = getters.fb.database().ref(`users/${userId}/${path}`);
                ref.set(data);

                // Set Timeout for upload
                commit('canUpload', false);
                setTimeout(() => commit('canUpload', true), 2000)

            }
        },
        deleteDataFirebase({ getters, dispatch }, path) {
            if (getters.user) {
                const userId = getters.user.uid;
                const ref = getters.fb.database().ref(`users/${userId}/${path}`);
                ref.remove();

                // Update userdata
                dispatch('updateUserData');
            }
        },

    }
}