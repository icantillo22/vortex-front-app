<template>
  <v-app>
    <app-bar v-if="authStore.token" />
    <v-main class="bg-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppBar from './components/AppBar.vue';

export default {
  components: { AppBar },
  name: 'App',
  created() {
    this.getToken()
  },
  computed: {
    ...mapState(['authStore'])
  },
  methods: {
    ...mapActions('authStore', ['getToken']),
  },
  data: () => ({
    //
  }),
};
</script>

<style>
  .bg-main {
    background-color: rgb(247, 247, 247);
  }
  .cursor {
    cursor: pointer;
  }
</style>
