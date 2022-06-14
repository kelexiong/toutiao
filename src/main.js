import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  created() {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')
