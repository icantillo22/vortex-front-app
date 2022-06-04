<template>
  <div>
    <v-row>
      <v-col>
        <h4>Escribe una respuesta</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-textarea
          v-model="dataCreateAnswer.answer"
          outlined
          rows="3"
          placeholder="Escribe aquí tu respuesta para esta pregunta..."
        ></v-textarea>
        <div class="d-flex justify-end">
          <v-btn 
            depressed 
            small 
            color="primary"
            :disabled="!dataCreateAnswer.answer"
            :loading="isLoading"
            @click="methodCreateAnswer"
          >
            Responder
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Alerts -->
    <alert-modal :alert="alert" />
  </div>
</template>

<script>
import AlertModal from '@/components/AlertModal.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { AlertModal },
  name: 'AnswerComponent',
  computed: {
		...mapState(['authStore'])
	},
  data: () => ({
    isLoading: false,
    dataCreateAnswer: {
      answer: ''
    },

    alert: {
      show: false,
      title: '',
      type: '',
      message: '',
      vertical: false,
      actions: [{ color: '', text: '', action: () => {} }],
    },
  }),
  methods: {
    ...mapActions('answersComunications', ['actionCreateAnswer']),

    async methodCreateAnswer() {
      try {
        const payload = {
          token: this.authStore.token,
          data: {
            response: this.dataCreateAnswer.answer,
            questionId: this.$route.params.id
          }
        }
        this.isLoading = true
        const res = await this.actionCreateAnswer(payload)
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

        this.alert.show = true
        this.alert.type = 'success'
        this.alert.title = '¡Felicidades! 🎊'
        this.alert.message = 'La respuesta se ha creado con éxito 💖'
        this.alert.actions = [
          {
            color: 'primary',
            text: 'Ok',
            action: () => {
              this.getAnswers()
              this.alert.show = false
            },
          },
        ]
      } catch (error) {
        this.isLoading = false;
        this.alert.show = true
        this.alert.type = 'error'
        this.alert.title = '¡Atención! 🚨'
        this.alert.message = 'Estamos presentando problemas, por favor intentelo mas tardes 🙏'
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

    getAnswers() {
      this.$emit('get-answers')
    }
  }
}
</script>

<style>

</style>