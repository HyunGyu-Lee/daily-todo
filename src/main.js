import Vue from 'vue'
import App from './App.vue'

import firebaseApp from '@/modules/firebase'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  firebaseApp
}).$mount('#app')
