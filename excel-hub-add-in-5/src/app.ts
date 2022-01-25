import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
