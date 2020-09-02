import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

import router from './router/router'

import './plugins/element.js'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/reset.css'
import './assets/css/global.less'
import BaseTool from './assets/js/BaseTool'

Vue.use(Element)

Vue.prototype.BaseTool = BaseTool

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
