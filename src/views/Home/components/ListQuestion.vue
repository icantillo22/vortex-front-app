<template>
  <div>
    <div v-if="!isLoading">    
      <question  
        v-show="dataQuestions.length > 0" 
        v-for="dataQuestion in dataQuestions"
        :key="dataQuestion.id"
        :dataQuestion="dataQuestion" 
        @change-show-more="changeShowMore"
        @edit-question="editQuestion"
        @delete-question="deleteQuestion"
      />
      <h4 class="text-center mt-4" v-show="dataQuestions.length === 0"> No se han econtrado resultados 😪</h4>
    </div>
    <skeleton-question   
      v-else
      v-for="(dataQuestion, i) in 5"
      :key="i * 10"
    />
  </div>
</template>

<script>
import Question from './Question.vue'
import SkeletonQuestion from './SkeletonQuestion.vue';
export default {
  components: { Question, SkeletonQuestion },
  props: {
    isLoading: {
      type: Boolean,
      default: Boolean,
    },
    dataQuestions: {
      type: Array,
      default: Array,
    },
  },
  name: 'ListQuestion',
  data: () => ({
  }),
  methods: {
    changeShowMore(data) {
      const newDataQuestions = this.dataQuestions
      const questionIndex = newDataQuestions.findIndex(q => q.id === data.id)

      newDataQuestions[questionIndex].showMore = data.value

      this.$emit('set-data-questions', newDataQuestions)
    },
    editQuestion(data){
      this.$emit('edit-question', data)
    },
    deleteQuestion(id){
      this.$emit('delete-question', id)
    }
  }
}
</script>

<style>

</style>