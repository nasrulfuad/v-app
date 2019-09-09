import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    surah: [],
    title: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      state.isUserLoggedIn = token ? !false : false
    },
    setUser (state, user) {
      state.user = user
    },
    setSurah (state, surah) {
      state.surah = surah
    },
    setTitle (state, title) {
      state.title = title
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    },
    setSurah ({ commit }, surah) {
      commit('setSurah', surah)
    },
    setTitle ({ commit }, title) {
      commit('setTitle', title)
    }
  }
})
