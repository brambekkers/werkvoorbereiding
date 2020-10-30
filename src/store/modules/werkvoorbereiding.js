import uniqid from 'uniqid';
import newWvb from '@/assets/config/newWvb.js';
import Vue from 'vue'


export default {
    state: {
        currentWvb: null
    },
    getters: {
        werkvoorbereiding(state, getters) {
            return getters.alleWerkvoorbereidingen ? getters.alleWerkvoorbereidingen[state.currentWvb] : false;
        },
        alleWerkvoorbereidingen(state, getters) {
            if (getters.userData) return getters.userData.alleWVB;
        },
        werkvoorbereidingsObject: (state, getters) => subObject => {
            if (getters.werkvoorbereiding) return getters.werkvoorbereiding[subObject];
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
        newDate() {
            const d = new Date();
            return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`;
        },
    },
    mutations: {
        currentWvb(state, id) {
            state.currentWvb = id
        }
    },
    actions: {
        setLastEditWvb({ commit, getters }) {
            if (getters.alleWerkvoorbereidingen) {
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
                if (!getters.werkvoorbereiding && alleWVBArray[0]) {
                    commit('currentWvb', alleWVBArray[0].id)
                    // commit('werkvoorbereiding', alleWVBArray[0])
                }
            }

        },
        werkvoorbereiding({ state, rootState }, werkvoorbereiding) {
            // If no new WVB is given at this function
            // set current wvb in store to null
            if (werkvoorbereiding === null) {
                state.currentWvb = null
                return
            }

            if (!rootState.User.userData.alleWVB) {
                const userData = rootState.User.userData = []
                Vue.set(userData, alleWVB, [])
            }

            // Totaly new WVB becouse there is no ID given
            // Make new wvb if wvb does not exist or there is no wvb.ID
            else if (!werkvoorbereiding.id) {
                const wvb = rootState.User.userData.alleWVB
                const newWVB = { ...this.getters.newWVB, ...werkvoorbereiding }
                Vue.set(wvb, newWVB.id, newWVB)

                state.currentWvb = newWVB.id
                this.dispatch('laatsteBewerking');
                return
            }
            // Update the existing WVB
            // Or on import from file
            else {
                rootState.User.userData.alleWVB[werkvoorbereiding.id] = werkvoorbereiding;
                state.currentWvb = werkvoorbereiding.id
                this.dispatch('laatsteBewerking');
            }
        },
        laatsteBewerking({ state, rootState }) {
            const d = new Date();
            const newDate = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()} ${d.getHours()}.${d.getMinutes()}`;
            const wvb = rootState.User.userData.alleWVB[state.currentWvb]

            Vue.set(wvb, 'laatsteBewerking', newDate)
        },
        verhoogStap({ state, rootState }, nextStap) {
            const wvb = rootState.User.userData.alleWVB[state.currentWvb]
            if (!wvb.stap) wvb.stap = 1;
            if (wvb.stap < nextStap) {
                Vue.set(wvb, 'stap', nextStap)
                this.dispatch('dataToFirebase', {
                    path: `alleWVB/${wvb.id}/stap`,
                    data: nextStap
                });
            }
        },

    }
}