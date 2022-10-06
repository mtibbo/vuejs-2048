// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ReactiveProvide from 'vue-reactive-provide'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Game from './components/GameWidget'

library.add(faMoon, faSun)

Vue.component('v-icon', FontAwesomeIcon)

Vue.prototype.$UP = 38
Vue.prototype.$DOWN = 40
Vue.prototype.$RIGHT = 39
Vue.prototype.$LEFT = 37

Vue.config.productionTip = false
Vue.use(ReactiveProvide)
Vue.component('game', Game)

/* eslint-disable no-new */
new Vue({
  el: '#app'
})
