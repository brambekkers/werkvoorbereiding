import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router';

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = true

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
}).$mount('#app')
