export default {
  namespaced: true,
  state: {
    token: null,
    userData: {}
  },
  actions: {
    getToken({commit}, ) {
      if ( !JSON.parse(sessionStorage.getItem('auth'))?.token ) {
        sessionStorage.setItem('auth', JSON.stringify({ token: null, userData: {} }))
        commit('setAuthData', { token: null, userData: {} })
      } else {
        const auth = JSON.parse(sessionStorage.getItem('auth'))
        
        commit('setAuthData', auth)
      }
    },
  },
  mutations: {
    setAuthData(state, value) {
      const auth = JSON.parse(sessionStorage.getItem('auth'))

      auth.token = value.token
      auth.userData = value.userData

      sessionStorage.setItem('auth', JSON.stringify(auth))
      state.token = value.token
      state.userData = value.userData
    },
  }
}