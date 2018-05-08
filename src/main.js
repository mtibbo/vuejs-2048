// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Game from './components/GameWidget'

Vue.prototype.$UP = 38
Vue.prototype.$DOWN = 40
Vue.prototype.$RIGHT = 39
Vue.prototype.$LEFT = 37

Vue.config.productionTip = false

Vue.component('game', Game)

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
