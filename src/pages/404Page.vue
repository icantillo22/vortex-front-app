<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
        class="mx-auto"
      >
        <v-img style="width: 70%;" class="mx-auto" src="@/assets/images/404.svg" />
        <p class="mt-5 text-center">
          No hemos podido encontrar la pagina que buscabas 😓
          <br />
          <v-btn
            class="mt-3"
            color="primary"
            text
            @click="goToBack"
          >
            Volver
          </v-btn>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundPage',
  methods: {
    goToBack() {
      this.$router.back()
    }
  }
}
</script>

<style>

</style>