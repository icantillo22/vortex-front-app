<template>
  <v-card
    elevation="1"
    class="mb-3"
  >
    <v-container>
      <v-row>
        <v-col class="d-flex align-center">
          <v-avatar
            class="cursor mr-2"
            :color="dataQuestion.color"
            :title="dataQuestion.UsersCreate.username"
          >
            <span class="white--text">
              {{ dataQuestion.UsersCreate.username.substring(0, 2).toUpperCase() }}
            </span>
          </v-avatar>
          <router-link
              :to="`/question/${dataQuestion.id}`"
              class="link"
            >
            <h2>
              {{ dataQuestion.question }}
            </h2>
          </router-link>
          <v-spacer></v-spacer>
          <v-menu
            bottom
            left
            v-if="dataQuestion.createdBy === authStore.userData.id"
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
              <v-list-item link @click="editQuestion(dataQuestion)">
                <v-list-item-title>Editar</v-list-item-title>
              </v-list-item>
              <v-list-item link @click="deleteQuestion(dataQuestion.id)">
                <v-list-item-title>Eliminar</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div v-if="dataQuestion.description.length <= 200">
            <p>{{ dataQuestion.description }}</p>
          </div>
          <div v-else>
            <p v-show="!dataQuestion.showMore">
              {{ dataQuestion.description.substring(0, 200).trim() }}...
              <a
                @click="changeShowMore(dataQuestion.id, !dataQuestion.showMore)"
              >
                Ver mas.
              </a>
            </p>
            <p v-show="dataQuestion.showMore">
              {{ dataQuestion.description }}
              <a
                @click="changeShowMore(dataQuestion.id, !dataQuestion.showMore)"
              >
                Ocultar
              </a>
            </p>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="d-block d-sm-flex pt-0">
          <v-chip 
            color="primary"
            small
          >
            {{dataQuestion.Categories.category}}
          </v-chip>
          <v-spacer class="mb-3"></v-spacer>
          <strong class="pr-1">Fecha:</strong> {{ moment(dataQuestion.createdAt).format("DD/MM/YYYY hh:mm a") }}
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mdiDotsVertical } from '@mdi/js';
import moment from 'moment';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'QuestionComponent',
  props: {
    dataQuestion: {
      type: Object,
      default: Object,
    }
  },
  computed: {
		...mapState(['authStore'])
	},
  data: () => ({
    moment,
    icons: {
      mdiDotsVertical
    }
  }),
  methods: {
    ...mapMutations('questionsStore', ['setDeleteQuestion']),

    changeShowMore(id, value) {
      this.$emit('change-show-more', { id, value })
    },
    editQuestion(data){
      this.$emit('edit-question', data)
    },
    deleteQuestion(id){
      this.$emit('delete-question', id)
    }
  }
};
</script>

<style scoped>
  .link {
    color: rgb(51, 50, 50);
    text-decoration: none;
  }

  .link:hover {
    color: black;
    text-decoration: underline;
  }
</style>
