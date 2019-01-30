import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		appData: {
			user: null,
			page: 1,
			firebase: null,
			sidebarOpen: false,
			admin: false
		},
		userData: {},
		werkvoorbereiding: {},
		dashboard: {
			aantalWerkdagen: 0,
			aantalUren: 0,
			verkoopPrijsInclBtw: 0,
		}
	}
});