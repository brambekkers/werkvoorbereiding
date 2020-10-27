import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router';
import BootstrapVue from 'bootstrap-vue'
import bootstrap from "bootstrap";

import "bootstrap-vue/dist/bootstrap-vue.css";
import './registerServiceWorker'

import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

window.$ = require('jquery')
window.Swal = require('sweetalert2')

Vue.use(BootstrapVue)

Vue.config.productionTip = true

new Vue({
	el: '#app',
	store,
	router,
	render: h => h(App),
}).$mount('#app')
