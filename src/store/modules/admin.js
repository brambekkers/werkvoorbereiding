export default {
    state: {
        admin: false,
    },
    getters: {
        admin(state) {
            return state.admin;
        },
    },
    mutations: {
        admin(state, boolean) {
            state.admin = boolean;
        }
    },
    actions: {
        checkRole({ getters, commit }, userId) {
            const checkAdminRef = getters.fb.database().ref(`roles/admin/${userId}`);
            checkAdminRef.on('value', snapshot => {
                commit('admin', snapshot.val());
            });
        },

    }
}