<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="11"
        lg="8"
        xl="7"
        class="mx-auto"
      >
        <v-btn
          color="primary"
          depressed
          @click="$router.push('/')"
        >
          Volver
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-2">
      <v-col
        cols="12"
        sm="11"
        lg="8"
        xl="7"
        class="mx-auto"
      >
        <v-card class="pa-4">
          <v-container >
            <question />
            <response-list  />
          </v-container>
        </v-card>
      </v-col>
    </v-row>  
  </v-container>
</template>

<script>
import ResponseList from './components/ResponseList.vue'
import Question from './components/Question.vue';

export default {
  components: { ResponseList, Question},
  name: 'QuestionComponent',
  data: () => ({
  
  })
}
</script>

<style>

</style>