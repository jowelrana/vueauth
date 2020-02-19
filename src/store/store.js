import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://vueauth.herokuapp.com/api/auth'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    }
  },
  actions: {
    retrieveName(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      return new Promise((resolve, reject) => {
        axios.get('/user')
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    step(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/first_step', {
          email: data.email
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          code: data.code,
          password: data.password,
        })
          .then(response => {
            const token = response.data.token
            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context) {
      localStorage.removeItem('access_token')
      context.commit('destroyToken')
    },
    retrieveToken(context, data) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: data.email,
          password: data.password,
        })
          .then(response => {
            const token = response.data.token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
            // console.log(response);
            // context.commit('addTodo', response.data)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    }

  }
})
