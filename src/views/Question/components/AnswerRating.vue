<template>
  <div class="d-flex justify-end">
    <div class="text-end">
      <strong>¿Qué tal te pareció este comentario?</strong>
      <v-rating
        v-model="newQualification"
        color="yellow darken-3"
        background-color="grey darken-1"
        :full-icon="icons.mdiStar"
        :empty-icon="icons.mdiStarOutline"
        hover
        large
      ></v-rating>
      <v-btn 
        v-if="qualification === 0"
        depressed 
        small 
        color="info"
        @click="saveQualification"
        :loading="isLoading"
        :disabled="newQualification === 0"
      >
        Guardar calificación
      </v-btn>
      <v-btn 
        v-else
        depressed 
        small 
        color="success"
        @click="saveQualification"
        :loading="isLoading"
        :disabled="newQualification === 0"
      >
        Editar calificación
      </v-btn>
    </div>

    <!-- Alerts -->
    <alert-modal :alert="alert" />
    
  </div>
</template>

<script>
import { mdiStar, mdiStarOutline } from '@mdi/js';
import { mapActions, mapState } from 'vuex';
import AlertModal from '@/components/AlertModal.vue';

export default {
  name: 'AnswerRating',
  components: { AlertModal },
  props: {
    answerId: {
      type: Number,
      default: Number,
    },
    qualification: {
      type: Number,
      default: Number,
    }
  },
  computed: {
		...mapState(['authStore'])
	},
  mounted() {
    this.newQualification = this.qualification
  },
  data: () => ({
    isLoading: false,
    newQualification: 0,
    
    icons: {
      mdiStar, mdiStarOutline
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
    ...mapActions('answersComunications', ['actionGradeAnswer']),
    
    async saveQualification() {
      try {
        const payload = {
          token: this.authStore.token,
          params: { id: this.answerId },
          data: {
            qualification: this.newQualification,
            questionId: this.$route.params.id
          }
        }

        this.isLoading = true
        const res = await this.actionGradeAnswer(payload)
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

        this.isLoading = false;
        this.alert.show = true
        this.alert.type = 'success'
        this.alert.title = '¡En hora buena! 🎊'
        this.alert.message = 'Tu respuesta ha sido guardada con éxito 🥳'
        this.alert.actions = [
          {
            color: 'primary',
            text: 'Ok',
            action: () => {
              this.$emit('get-answers')
              this.alert.show = false
            },
          },
        ]

        return false 
        
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
    }
  }
}
</script>

<style>

</style>