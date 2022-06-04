<template>
  <div>
    <answer 
      v-if="!isLoading" 
      @get-answers="methodGetAnswers"
    />
    <v-row>
      <v-col>
        <div v-if="!isLoading">
          <h3>{{dataAnswers.length}} respuesta{{dataAnswers.length !== 1 ? 's' : ''}}</h3>
          <response 
            v-for="response in dataAnswers"
            :key="response.id"
            :dataResponse="response"
            @change-show-more="changeShowMore"
            @edit-answer="openModalEditAnswer"
            @delete-answer="confirmDeleteAnswer"
            @get-answers="methodGetAnswers"
          />
        </div>
        <div v-else>
          <skeleton-response 
            v-for="skeleton in 4"
            :key="skeleton"
          />
        </div>
      </v-col>
    </v-row>

    <!-- Modals -->
    <modal-edit-answer 
      v-if="isOpenModalEditAnswer" 
      :isOpenModal="isOpenModalEditAnswer" 
      :dataEdit="dataEditAnswer" 
      @close-modal="setValueModalEditAnswer"
      @get-answers="methodGetAnswers"
    />

    <!-- Alerts -->
    <alert-modal :alert="alert" />
  </div>
</template>

<script>
import AlertModal from '@/components/AlertModal.vue';
import { mapActions, mapState } from 'vuex';
import Answer from './Answer.vue';
import Response from './Response.vue'
import SkeletonResponse from './SkeletonResponse.vue'
import ModalEditAnswer from './ModalEditAnswer.vue';
export default {
  components: { Response, SkeletonResponse, Answer, AlertModal, ModalEditAnswer },
  data: () => ({
    isLoading: false,
    isOpenModalEditAnswer: false,
    dataEditAnswer: {},
    dataAnswers: [],
    alert: {
      show: false,
      title: '',
      type: '',
      message: '',
      vertical: false,
      actions: [{ color: '', text: '', action: () => {} }],
    },
  }),
  async created() {
    await this.methodGetAnswers()
  },
  computed: {
    ...mapState(['authStore'])
  },
  mounted() {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  },
  methods: {
    ...mapActions('questionsComunications', ['actionGetAnswers']),
    ...mapActions('answersComunications', ['actionDeleteAnswer']),

    async methodGetAnswers() {
      try {
        const payload = {
          token: this.authStore.token,
          data: {id: this.$route.params.id}
        }

        this.isLoading = true
        const res = await this.actionGetAnswers(payload)
        this.isLoading = false

        this.dataAnswers = res.map(a => {
          const newAnswer = a

          newAnswer.showMore = false

          return newAnswer
        })

        if(res.error) {
          this.isLoading = false;
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.title = '¡Atención! 🚨'
          this.alert.message = `${res.message} 😓.`
          this.alert.actions = [
              {
                  color: 'primary',
                  text: 'Ok',
                  action: () => {
                      this.alert.show = false
                  },
              },
          ]

          return false 
        }      
      } catch (error) {
        this.isLoading = false;
        this.alert.show = true
        this.alert.type = 'error'
        this.alert.title = '¡Atención! 🚨'
        this.alert.message = 'Estamos presentando problemas, por favor intentelo mas tardes.'
        this.alert.actions = [
            {
                color: 'primary',
                text: 'Ok',
                action: () => {
                    this.alert.show = false
                },
            },
        ]
        console.log(error)
      }
    },
    async methodDeleteAnswer(id) {
      try {
        const payload = {
          token: this.authStore.token,
          params: { id },
        }

        this.isLoading = true
        const res = await this.actionDeleteAnswer(payload)
        this.isLoading = false

        if(res.error) {
          this.isLoading = false;
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.title = '¡Atención! 🚨'
          this.alert.message = `${res.message} 😓.`
          this.alert.actions = [
            {
              color: 'primary',
              text: 'Ok',
              action: () => {
                  this.alert.show = false
              },
            },
          ]

          return false 
        }  

        await this.methodGetAnswers()

      } catch (error) {
        this.isLoading = false;
        this.alert.show = true
        this.alert.type = 'error'
        this.alert.title = '¡Atención! 🚨'
        this.alert.message = 'Estamos presentando problemas, por favor intentelo mas tardes.'
        this.alert.actions = [
          {
            color: 'primary',
            text: 'Ok',
            action: () => {
                this.alert.show = false
            },
          },
        ]
      }
    },
    
    changeShowMore(data) {
      const responseIndex = this.dataAnswers.findIndex(q => q.id === data.id)
      this.dataAnswers[responseIndex].showMore = data.value
    },
    confirmDeleteAnswer(id) {
      this.alert.show = true
      this.alert.type = 'error'
      this.alert.title = '¡Atención! 🚨'
      this.alert.message = '¿Estás seguro que deseas eliminar esta respuesta? 🤔'
      this.alert.actions = [
        {
          color: 'error',
          btnText: true,
          text: 'Si, eliminar',
          action: async () => {
              await this.methodDeleteAnswer(id)
              this.alert.show = false
          },
        },
        {
          color: 'primary',
          text: 'No',
          action: () => {
              this.alert.show = false
          },
        },
      ]
    },
    openModalEditAnswer(data) {
      this.dataEditAnswer = data
      this.setValueModalEditAnswer(true)
    },
    setValueModalEditAnswer(value) {
      this.isOpenModalEditAnswer = value
    },
  }
}
</script>

<style>

</style>