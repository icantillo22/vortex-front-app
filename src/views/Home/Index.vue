<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="8"
        md="6"
        xl="4"
        class="mx-auto"
      >
        <search-questions 
          @search-questions="methodGetQuestions"
          @set-search="setSearch"
          @set-selected-categories="setSelectedCategories"
          @set-my-categories="setMyCategories"
        />
      </v-col>
    </v-row>
    <v-row
      class="mt-0"
    >
      <v-col
        cols="12"
        sm="10"
        md="8"
        xl="6"
        class="mx-auto"
      >
        <list-question 
          :dataQuestions="questions" 
          :isLoading="isLoading"
          @set-data-questions="setDataQuestions"
          @edit-question="editQuestion"
          @delete-question="confirmDeleteQuestion"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              elevation="2"
              fab
              fixed right bottom
              v-bind="attrs"
              v-on="on"
              color="primary"
              @click="setValueModalCreateQuestion({value: true})"
            >
              <v-icon>{{ icons.mdiPlus }}</v-icon>
            </v-btn>
          </template>
          <span>
            Crear una pregunta
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <!-- Modals -->
    <modal-create-edit-question 
      v-if="isOpenModalCreateQuestion"
      :is-open-modal="isOpenModalCreateQuestion"
      :isEdit="isEditQuestion"
      :editData="editData"
      @close-modal="setValueModalCreateQuestion"
      @get-questions="methodGetQuestions"
    />

    <!-- Alerts -->
    <alert-modal :alert="alert" />
  </v-container>
</template>

<script>
import { mdiPlus } from '@mdi/js';
import { mapActions, mapState } from 'vuex'
import ListQuestion from './components/ListQuestion.vue'
import SearchQuestions from './components/SearchQuestions.vue'
import ModalCreateEditQuestion from './components/ModalCreateEditQuestion.vue';
import AlertModal from '@/components/AlertModal.vue';


export default {
  components: { ListQuestion, SearchQuestions, ModalCreateEditQuestion, AlertModal },
  name: 'HomeView',
  computed: {
		...mapState(['authStore', 'questionsStore'])
	},
  data: () => ({
    // DATA BASE
    isLoading: false,
    isEditQuestion: false,
    isOpenModalCreateQuestion: false,
    myCategories: false,
    selectedCategories: [],
    editData: {},

    // PARAMS
    search: '',

    // DATA API
    questions: [],

    // DATA COMPONENT STATICS
    icons: {
      mdiPlus
    },
    alert: {
      show: false,
      title: '',
      type: '',
      message: '',
      vertical: false,
      actions: [{ color: '', text: '', action: () => {} }],
    },
    colors: ['#370107', '#40ce8d', '#7739de', '#483177', '#339964']
  }),
  async created( ) {
    if (!this.authStore.token) return this.$router.push({ name: 'login' })
    await this.methodGetQuestions()
  },
  methods: {
    ...mapActions('questionsComunications', ['actionGetQuestions', 'actionDeleteQuestion']),

    async methodGetQuestions() {
      try {
        const categories = JSON.stringify(this.selectedCategories)

        let params = `search=${this.search}`

        if (JSON.parse(categories).length > 0) {
          params += `&categories=${categories}`
        }

        if(this.myCategories) {
          params += `&userId=${this.authStore.userData.id}`
        }

        this.isLoading = true
        const res = await this.actionGetQuestions(params)
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

        this.questions = res.map(q => {
          const newQuestion = q
          newQuestion.color = this.authStore.userData.id == q.createdBy ? 'primary' : `${this.colors[Math.round((Math.random()*4))]}`
          newQuestion.showMore = false
          return newQuestion
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

    async methodDeleteQuestion(id) {
      try {
        const payload = {
          token: this.authStore.token,
          params: { id },
        }

        this.isLoading = true
        const res = await this.actionDeleteQuestion(payload)
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

        await this.methodGetQuestions()

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
    
    confirmDeleteQuestion(id) {
      this.alert.show = true
      this.alert.type = 'error'
      this.alert.title = '¡Atención! 🚨'
      this.alert.message = '¿Estás seguro que deseas eliminar esta pregunta? 🤔'
      this.alert.actions = [
        {
          color: 'error',
          btnText: true,
          text: 'Si, eliminar',
          action: async () => {
              await this.methodDeleteQuestion(id)
              this.alert.show = false
          },
        },
        {
          color: 'primary',
          text: 'No',
          action: async () => {
              this.alert.show = false
          },
        },
      ]
    },
    editQuestion(data){
      this.isEditQuestion = true
      this.editData = data
      this.setValueModalCreateQuestion({value: true})
    },
    setSearch(value) {
      this.search = value
    },
    async setSelectedCategories(value) {
      this.selectedCategories = value
      await this.methodGetQuestions()
    },
    async setMyCategories(value) {
      this.myCategories = value
      await this.methodGetQuestions()
    },
    setDataQuestions(value) {
      this.questions = value
    },
    setValueModalCreateQuestion(data) {
      if (data?.isEdit) {
        this.isEditQuestion = false
        this.editData = {}
      }
      this.isOpenModalCreateQuestion = data.value
    }
  }
}
</script>

<style>

</style>