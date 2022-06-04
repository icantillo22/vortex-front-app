import * as API from '../../../api'

export default {
  namespaced: true,
  actions: {
    // eslint-disable-next-line no-unused-vars
    async actionSignIn({commit}, payload) {
      const res = await API.sendData('POST', 'auth/signin', payload)
      return res
    },

    // eslint-disable-next-line no-unused-vars
    async actionSignUp({commit}, payload) {
      const res = await API.sendData('POST', 'auth/signup', payload)
      return res
    },
  },
}