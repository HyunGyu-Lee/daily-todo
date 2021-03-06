// import env, plugins
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'
import moment from 'moment'
import lodash from 'lodash';

// import app components
import AppBiz from '@/modules/app'
import App from '@/App'
import router from '@/modules/router'

import '@/components'

Vue.config.productionTip = false
moment.locale('ko')

Vue.prototype.$moment = moment
Vue.prototype.$app = AppBiz
Vue.prototype.$lds = lodash

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
