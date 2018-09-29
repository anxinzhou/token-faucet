// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './axios'
import Snotify, {
	SnotifyPosition
} from 'vue-snotify'
import 'vue-snotify/styles/material.css'
Vue.use(Snotify)
// Vue.use(VueParticles)
Vue.config.productionTip = false
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})