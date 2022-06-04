import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import authComunications from './modules/auth/comunications'
import authStore from './modules/auth/store'
import answersComunications from './modules/answers/comunications'
import questionsComunications from './modules/questions/comunications'
import questionsStore from './modules/questions/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    authComunications,
    authStore,
    answersComunications,
    questionsComunications,
    questionsStore
  }
})
