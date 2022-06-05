<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="d-flex align-center">
          <v-avatar
            class="cursor mr-2"
            :color="dataResponse.createdBy === authStore.userData.id ? 'primary' : 'success'"
            :title="dataResponse.UserCreate.username"
          >
            <span class="white--text">
              {{ dataResponse.UserCreate.username.substring(0, 2).toUpperCase() }}
            </span>
          </v-avatar>
          <h3 class="mr-1">{{ dataResponse.UserCreate.username }}</h3>
          <div v-if="dataResponse.Questions.createdBy !== authStore.userData.id">
            ({{ dataResponse.qualification }}<v-icon color="yellow darken-3" size="13">{{ icons.mdiStar }}</v-icon>)
          </div>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            left
            v-if="dataResponse.createdBy === authStore.userData.id"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>{{ icons.mdiDotsVertical }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link @click="editAnswer(dataResponse)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteAnswer(dataResponse.id)">
                <v-list-item-title>Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <small class="mx-1" v-if="dataResponse.createdAt === dataResponse.updatedAt"> 
          <span class="grey--text"> Creado el </span>              
          {{ moment(dataResponse.createdAt).format("DD/MM/YYYY hh:mm a") }}
        </small>
        <small class="mx-1" v-else> 
          <span class="grey--text">Editado el </span>              
          {{ moment(dataResponse.updatedAt).format("DD/MM/YYYY hh:mm a") }}
        </small>
        <v-divider class="mt-2" />
      </v-col>
    </v-row>
    <v-row class="py-0">
      <v-col class="py-0">
        <p v-if="dataResponse.response.length <= 200">{{ dataResponse.response }}</p>
        <div v-else>
          <p v-show="!dataResponse.showMore">
            {{ dataResponse.response.substring(0, 200).trim() }}...
            <a
              @click="changeShowMore(dataResponse.id, !dataResponse.showMore)"
            >
              Ver mas.
            </a>
          </p>
          <p v-show="dataResponse.showMore">
            {{ dataResponse.response }}
            <a
              @click="changeShowMore(dataResponse.id, !dataResponse.showMore)"
            >
              Ocultar
            </a>
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="dataResponse.Questions.createdBy === authStore.userData.id" class="py-0">
      <v-col class="py-0">
        <answer-rating 
          :answerId="dataResponse.id"
          :qualification="dataResponse.qualification === null ? 0 : dataResponse.qualification" 
          @get-answers="getAnswers"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mdiStar, mdiDotsVertical } from '@mdi/js';
import AnswerRating from './AnswerRating.vue';
import { mapState } from 'vuex';

export default {
  components: { AnswerRating },
  name: 'ResponseComponent',
  props: {
    dataResponse: {
      type: Object,
      default: Object
    }
  },
  computed: {
    ...mapState(['authStore'])
  },
  data: () => ({
    isLoading: false,
    moment,
    icons: {
      mdiStar,
      mdiDotsVertical
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

    changeShowMore(id, value) {
      this.$emit('change-show-more', { id, value })
    },
    editAnswer(data) {
      this.$emit('edit-answer', data)
    },
    deleteAnswer(id) {
      this.$emit('delete-answer', id)
    },
    getAnswers() {
      this.$emit('get-answers')
    }
  }
}
</script>

<style>

</style>