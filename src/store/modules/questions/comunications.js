import * as API from '../../../api'

export default {
    namespaced: true,
    actions: {
        // eslint-disable-next-line no-unused-vars
        async actionCreateQuestion({commit}, payload) {
            const res = await API.sendData('POST', 'questions', payload)
            return res
        },
        // eslint-disable-next-line no-unused-vars
        async actionEditQuestion({commit}, payload) {
            const res = await API.sendData('PUT', `questions/${payload.params.id}`, payload)
            return res
        },
        // eslint-disable-next-line no-unused-vars
        async actionDeleteQuestion({commit}, payload) {
            const res = await API.sendData('DELETE', `questions/${payload.params.id}`, payload)
            return res
        },
        // eslint-disable-next-line no-unused-vars
        async actionGetQuestions({commit}, payload) {
            const res = await API.getData('questions', `?${payload}`)
            return res
        },
        // eslint-disable-next-line no-unused-vars
        async actionGetQuestionById({commit}, payload) {
            const res = await API.getData('questions', `/${payload.data.id}`, payload)
            return res
        },
        // eslint-disable-next-line no-unused-vars
        async actionGetAnswers({commit}, payload) {
            const res = await API.getData('questions', `/${payload.data.id}/answers`, payload)
            return res
        },
        // eslint-disable-next-line no-unused-vars
        async actionGetCategories({commit}) {
            const res = await API.getData('categories')
            return res
        },
    },
  }