import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import Firebase from '@/store/modules/firebase'
import User from '@/store/modules/user'
import Admin from '@/store/modules/admin'
import WVB from '@/store/modules/werkvoorbereiding'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: { Firebase, User, Admin, WVB },
    state: {
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
        dashboard: {
            aantalWerkdagen: 0,
            aantalUren: 0,
            verkoopPrijsInclBtw: 0,
            materiaalStaatType: 'netto',
            filter: {
                gegevens: false,
                verkoopprijs: true,
                aantalWerkdagen: true,
                aantalOnderdelen: true,
                favGereedschap: true,
                materiaalKosten: true,
                planningTijd: true,
                materiaalstaat: false,
                optimalisatie: false,
                agenda: true
            }
        }
    },
    mutations: {
        landingPage(state, boolean) {
            state.appData.landingPage = boolean;
        },
        sidebar(state, boolean) {
            state.appData.sidebar = boolean;
        },

        instellingen(state, instellingen) {
            state.appData.instellingen = instellingen;
        },
        setDashboard(state, { path, value }) {
            state.dashboard[path] = value;
        },
        setAllFilterDashboard(state, boolean) {
            for (const key in state.dashboard.filter) {
                state.dashboard.filter[key] = boolean
            }
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
                materiaalStaatType: 'netto',
                filter: {
                    gegevens: false,
                    verkoopprijs: true,
                    aantalWerkdagen: true,
                    aantalOnderdelen: true,
                    favGereedschap: true,
                    materiaalKosten: true,
                    planningTijd: true,
                    materiaalstaat: false,
                    optimalisatie: false,
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
        landingPage(state) {
            return state.appData.landingPage;
        },
        sidebar(state) {
            return state.appData.sidebar;
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




    }
});
