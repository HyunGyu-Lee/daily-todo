// import env, plugins
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import moment from 'moment'

// import app components
import App from '@/App'
import router from '@/modules/router'

Vue.config.productionTip = false

moment.locale('ko')

Vue.prototype.$moment = moment

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
