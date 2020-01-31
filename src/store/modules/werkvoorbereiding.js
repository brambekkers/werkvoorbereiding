import uniqid from 'uniqid';
import newWvb from '@/assets/config/newWvb.js';

export default {
    state: {
        werkvoorbereiding: null,
    },
    getters: {
        werkvoorbereiding(state) {
            return state.werkvoorbereiding;
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
        werkvoorbereiding(state, werkvoorbereiding) {
            // If new WVB is null, set wvb in store to null
            if (werkvoorbereiding === null) {
                state.werkvoorbereiding = null
                return
            } else {
                // Make new wvb if wvb does not exist or there is no wvb.ID
                if (!werkvoorbereiding.id) {
                    state.werkvoorbereiding = { ...this.getters.newWVB, ...werkvoorbereiding };
                    this.commit('laatsteBewerking');
                    return
                }

                // Update the WVB
                state.werkvoorbereiding = werkvoorbereiding;
                this.commit('laatsteBewerking');
            }
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
                if (!getters.werkvoorbereiding) commit('werkvoorbereiding', alleWVBArray[0]);

            }

        }

    }
}