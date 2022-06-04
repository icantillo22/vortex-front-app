<template>
  <v-dialog
    :value="isOpenModal"
    persistent
    width="1000"
  >
    <v-card class="pa-3">
      <v-container>
        <v-row>
          <v-col>
            <h2>Formulario para la edición de respuestas</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3 class="mb-1">Escribe tu respuesta para ayudar a la comunidad</h3>
            <v-textarea
              v-model="response"
              outlined
              dense
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-end">
            <v-btn
              color="primary"
              depressed
              class="mr-1"
              :loading="isLoading"
              @click="editAnswer"
            >
              Guardar
            </v-btn>
            <v-btn
              text
              depressed
              class="ml-1"
              :loading="isLoading"
              @click="closeModal"
            >
              Cancelar
            </v-btn>
          </v-col>
        </v-row>

        <!-- Alerts -->
        <alert-modal :alert="alert" />
      </v-container>      
    </v-card>
  </v-dialog>
</template>

<script>
import AlertModal from '@/components/AlertModal.vue'
import { mapActions, mapState } from 'vuex'
export default {
  components: { AlertModal },
  props: {
    isOpenModal: {
      type: Boolean,
      default: Boolean,
    },
    dataEdit: {
      type: Object,
      default: Object,
    }
  },
  name: 'ModalEditAnswer',
  computed: {
    ...mapState(['authStore'])
  },
  
  async created() {
    this.response = this.dataEdit.response
  },
  data: () => ({
    isLoading: false,
    response: '',

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
    ...mapActions('answersComunications', ['actionEditAnswer']),
    
    async editAnswer() {
      try {
        const payload = {
          token: this.authStore.token,
          params: { id: this.dataEdit.id },
          data: { response: this.response }
        }

        const validations = this.validateData()

        if(validations.error) {
          this.isLoading = false;
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.title = '¡Atención! 🚨'
          this.alert.message = validations.message
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

        this.isLoading = true
        const res = await this.actionEditAnswer(payload)
        this.isLoading = false

        this.closeModal()

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

        this.$emit('get-answers')
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

    closeModal() {
      this.resetData()
      this.$emit('close-modal', false)
    },
    resetData() {
      this.response = ''
    },
    validateData() {
      const output = {
        error: false,
        message: ''
      }

      if(this.response.trim() === '') {
        output.error = true
        output.message = 'Creo que si no agregas nada dejarás con muchas más dudas a la persona que realizó la pregunta. Por favor escribe algo 😬'
      }

      return output
    }
  }
}
</script>

<style>

</style>