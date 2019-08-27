import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router';

import BootstrapVue from 'bootstrap-vue'

const SocialSharing = require('vue-social-sharing');

Vue.use(SocialSharing);
Vue.use(BootstrapVue)

Vue.config.productionTip = true

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
}).$mount('#app')
