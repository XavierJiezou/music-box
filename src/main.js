import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import 'bootstrap'
import $ from 'jquery'

Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
