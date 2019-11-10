// import env, plugins
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

// import app components
import App from '@/App'
import router from '@/modules/router'

Vue.config.productionTip = false

import moment from 'moment-timezone'
moment.tz.setDefault('Asia/Seoul')

console.log(moment())

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
