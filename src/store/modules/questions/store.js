/* eslint-disable no-unused-vars */
export default {
    namespaced: true,
    state: {
      deleteQuestionId: null,
      editQuestionId: null,
    },mutations: {
      setLoading(state, value) {
        console.log(state, value)
      },
      setDeleteQuestion(state, value) {
        state.deleteQuestionId = value
      },
      setQuestions(state, value) {
        console.log(state, value)
      },
    },

  }