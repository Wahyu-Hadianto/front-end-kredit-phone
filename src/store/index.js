import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import loading from './loading'
import products from './products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      errorConn : false
  },
  mutations: {
    errorConn : state => {
          state.errorConn = true
    }
  },
  getters: {
    getErrorConn : state => {
      return state.errorConn
    }
  },
  actions: {
    
  },
  modules : {
    auth,
    loading,
    products
  }
})
