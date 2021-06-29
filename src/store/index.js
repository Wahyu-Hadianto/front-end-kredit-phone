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
   
  },
  getters: {
   
  },
  actions: {
    
  },
  modules : {
    auth,
    loading,
    products
  }
})
