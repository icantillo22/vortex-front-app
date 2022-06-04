<template>
  <v-container>
    <v-row>
      <v-col class="d-flex align-center">
        <v-skeleton-loader
          class="mr-2"
          type="avatar"
        ></v-skeleton-loader>
        <v-skeleton-loader
          class=""
          width="240"
          type="text"
        ></v-skeleton-loader>
        <v-spacer />
        <v-skeleton-loader
          class=""
          width="50"
          type="text"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center">
        <v-skeleton-loader
          style="width: 100%;"
          type="text@3"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center">
        <v-skeleton-loader
          class="mx-auto"
          width="200"
          type="text"
        ></v-skeleton-loader>
        <v-spacer />
        <v-skeleton-loader
          class="mx-auto"
          width="200"
          type="text"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SkeletonQuestionComponent',
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
