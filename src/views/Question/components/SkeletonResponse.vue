<template>
  <div class="mt-4">
    <v-row>
      <v-col>
        <div class="d-flex align-center">
          <v-skeleton-loader type="avatar" class="mr-2"></v-skeleton-loader>
          <v-skeleton-loader type="text" width="200"></v-skeleton-loader>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-skeleton-loader type="text@3"></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'SkeletonResponse'
}
</script>

<style>

</style>