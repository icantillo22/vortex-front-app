<template>
  <div>
    <div v-if="!isLoading">
      <v-row>
        <v-col>
          <div class="d-flex align-center">
            <v-avatar
              class="cursor mr-2"
              :color="dataQuestion.UsersCreate.createdBy == authStore.userData.id ? 'primary' : 'success'"
              :title="dataQuestion.UsersCreate.username"
            >
              <span class="white--text">
                {{ dataQuestion.UsersCreate.username.substring(0, 2).toUpperCase() }}
              </span>
            </v-avatar>
            <h1>{{ dataQuestion.question }}</h1>
          </div>
          <small class="px-1">
            <span class="grey--text">Creado el</span>
            {{ moment(dataQuestion.createdAt).format("DD/MM/YYYY hh:mm a") }}
          </small> 
          <small class="px-1" v-show="dataQuestion.updatedAt !== dataQuestion.createdAt">
            <span class="grey--text">Actualizado el</span>
            {{ moment(dataQuestion.updatedAt).format("DD/MM/YYYY hh:mm a") }}
          </small> 

          <v-divider class="mt-2" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p>{{dataQuestion.description}}</p>
          <p class="text-right"><strong>Realizada por: </strong> {{ dataQuestion.UsersCreate.username }}</p>
          <v-chip color="primary">
            {{dataQuestion.Categories.category}}
          </v-chip>
        </v-col>
      </v-row>
    </div>
    <skeleton-question v-else />
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex';
import SkeletonQuestion from './SkeletonQuestion.vue';

export default {
  components: { SkeletonQuestion },
  name: 'QuestionComponent',
  data: () => ({
    isLoading: false,
    moment,
    dataQuestion: {
      id: 1,
      title: 'What is Lorem Ipsum?',
      userName: 'ccantillo',
      creationDate: '30/05/2022 10:50 am',
      updateDate: '30/05/2022 12:00 pm',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
      category: 'Economia',
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
  async created() {
    await this.methodGetQuestionById()
  },
  computed: {
    ...mapState(['authStore'])
  },
  methods: {
    ...mapActions('questionsComunications', ['actionGetQuestionById']),

    async methodGetQuestionById() {
      try {
        const payload = {
          token: this.authStore.token,
          data: {id: this.$route.params.id}
        }

        this.isLoading = true
        const res = await this.actionGetQuestionById(payload)
        this.isLoading = false

        this.dataQuestion = res

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
        console.log(error)
      }
    },
  }
}
</script>

<style>

</style>