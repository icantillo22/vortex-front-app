<template>
  <div>
    <v-row>
      <v-col class="d-flex align-center">
        <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
        <v-skeleton-loader type="text" width="250"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="d-flex align-center">
        <v-skeleton-loader type="text" width="150" class="mr-1"></v-skeleton-loader>
        <v-skeleton-loader type="text" width="150" class="ml-1"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-skeleton-loader type="text@5" style="width: 100%;"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-skeleton-loader type="chip"></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SkeletonQuestion'
}
</script>

<style>

</style>