/* eslint-disable no-unused-vars */
import * as API from '../../../api'

export default {
  namespaced: true,
  actions: {
    async actionCreateAnswer({commit}, payload) {
      const res = await API.sendData('POST', 'answers', payload)
      return res
    },
    async actionDeleteAnswer({commit}, payload) {
      const res = await API.sendData('DELETE', `answers/${payload.params.id}`, payload)
      return res
    },
    async actionEditAnswer({commit}, payload) {
      const res = await API.sendData('PUT', `answers/${payload.params.id}`, payload)
      return res
    },
    async actionGradeAnswer({commit}, payload) {
      const res = await API.sendData('PUT', `answers/${payload.params.id}/qualify`, payload)
      return res
    },
  },
}