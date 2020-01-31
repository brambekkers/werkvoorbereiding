import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router';
import BootstrapVue from 'bootstrap-vue'
import bootstrap from "bootstrap";

import "bootstrap-vue/dist/bootstrap-vue.css";
import './registerServiceWorker'


const SocialSharing = require('vue-social-sharing');
window.$ = require('jquery')
window.Swal = require('sweetalert2')

Vue.use(SocialSharing);
Vue.use(BootstrapVue)

Vue.config.productionTip = true

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
}).$mount('#app')
