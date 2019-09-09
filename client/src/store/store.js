import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    surah: []
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
    }
  }
})
