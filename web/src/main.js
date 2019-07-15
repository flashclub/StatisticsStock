import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import http from './http'
import * as d3 from 'd3'
import echarts from 'echarts'
import VCharts from 'v-charts'
Vue.config.productionTip = false

Vue.prototype.$http=http
Vue.prototype.$d3 = d3;
Vue.prototype.$echarts = echarts
Vue.use(VCharts)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
