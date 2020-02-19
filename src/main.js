import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './routes'
import { store } from './store/store'

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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})
