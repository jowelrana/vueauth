import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'

const toastrConfigs = {
  position: 'bottom right',
  showDuration: 2000,
  timeOut: 5000,
  progressBar: true,
}

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})



new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>'
})
