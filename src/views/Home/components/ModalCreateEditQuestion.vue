<template>
  <v-dialog
    :value="isOpenModal"
    persistent
    width="1200"
  >
    <v-card class="pa-3">
      <v-container>
        <v-row>
          <v-col>
            <h2>Formulario para la {{ isEdit ? 'edición' : 'creción' }} de preguntas</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col 
            cols="12"
            md="6"
            lg="5"
          >
            <h3 class="mb-1">¿Qué título tendrá?</h3>
            <v-text-field
              v-model="dataCreateEditQuestion.question"
              outlined
              dense
              placeholder="Ingresa aquí el título de tu pregunta..."
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3 class="mb-1">Danos una descripción detallada de tu pregunta</h3>
            <v-textarea
              v-model="dataCreateEditQuestion.description"
              outlined
              dense
              placeholder="Cuentanos mas sobre tu pregunta..."
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <h3 class="mb-1">¿En qué categoría se encuentra tu pregunta?</h3>
            <div v-if="!isLoading">
              <v-chip-group>
                <v-chip
                  v-for="category in categories"
                  :key="category.id"
                  color="primary"
                  :outlined="!category.isSelect ? true : false"
                  @click="selectCategory(category)"
                >
                  {{ category.category }}
                </v-chip>
              </v-chip-group>
            </div>
            <div v-else>
              <v-chip-group>
                <v-skeleton-loader
                  v-for="loader in 6"
                  :key="loader"
                  type="chip"
                  class="mx-1"
                ></v-skeleton-loader>
              </v-chip-group>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center justify-sm-end">
            <v-btn
              v-if="!isEdit"
              color="primary"
              depressed
              class="mr-1"
              :loading="isLoading"
              @click="methodCreateQuestion"
            >
              Crear
            </v-btn>
            <v-btn
              v-else
              color="primary"
              depressed
              class="mr-1"
              :loading="isLoading"
              @click="methodEditQuestion"
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
  name: 'ModalCreateEditQuestion',
  props: {
    isOpenModal: {
      type: Boolean,
      default: Boolean,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
      default: Object,
    }
  },
  async mounted() {
    await this.methodGetCategories()

    if(this.isEdit) {
      this.questionId = this.editData.id
      this.dataCreateEditQuestion.question = this.editData.question
      this.dataCreateEditQuestion.description = this.editData.description
      this.dataCreateEditQuestion.categoryId = this.editData.categoryId

      const index = this.categories.findIndex(c => c.id === this.editData.categoryId)
      this.categories[index].isSelect = true
    }
  },
  computed: {
		...mapState(['authStore'])
	},
  data: () => ({
    isLoading: false,
    questionId: null,
    dataCreateEditQuestion: {
      question: '',
      description: '',
      categoryId: null,
    },
    categories: [],
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
    ...mapActions('questionsComunications', ['actionGetCategories', 'actionCreateQuestion', 'actionEditQuestion']),
    
    async methodGetCategories() {
      try {        
        this.isLoading = true
        const res = await this.actionGetCategories()
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

        this.categories = res.map(c => {
          const newCategory = c
          
          newCategory.isSelect = false

          return newCategory
        })
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
    async methodCreateQuestion() {
      try {        
        const payload = {
          token: this.authStore.token,
          data: this.dataCreateEditQuestion,
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
        const res = await this.actionCreateQuestion(payload)
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

        this.closeModal()
        this.$emit('get-questions')
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
    async methodEditQuestion() {
      try {        
        const payload = {
          token: this.authStore.token,
          params: { id: this.questionId },
          data: this.dataCreateEditQuestion,
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
        const res = await this.actionEditQuestion(payload)
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

        this.closeModal()
        this.$emit('get-questions')
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
      this.$emit('close-modal', { isEdit: true, value: false })
    },
    selectCategory(category) {
      category.isSelect = !category.isSelect

      this.categories = this.categories.map(c => {
        const newCategory = c

        if(c.id !== category.id && c.isSelect) newCategory.isSelect = false

        return newCategory
      })

      if(category.isSelect) {
        this.dataCreateEditQuestion.categoryId = category.id
      } else {
        this.dataCreateEditQuestion.categoryId = null
      }
    },
    resetData() {
      this.dataCreateEditQuestion.question = ''
      this.dataCreateEditQuestion.description = ''
      this.dataCreateEditQuestion.categoryId = null
    },
    validateData() {
      const output = {
        error: false,
        message: ''
      }

      if(this.dataCreateEditQuestion.question.trim() === '') {
        output.error = true
        output.message = 'Creo que se nos está olvidando algo... Ah, sí. ¿Cuál es la pregunta? 🤔'
      } else if (this.dataCreateEditQuestion.description.trim() === '') {
        output.error = true
        output.message = 'Las personas necesitan un mejor contexto para poder resolver tus dudas, escribe una descripción 🙊'
      } else if (!this.dataCreateEditQuestion.categoryId) {
        output.error = true
        output.message = 'Para una mejor categorización de tu pregunta, selecciona una categoría 🙈'
      }

      return output
    }
  }
}
</script>

<style>

</style>