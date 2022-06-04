<template>
  <div class="text-center">
    <v-dialog
      :value="alert.show"
      width="530"
      persistent
    >
      <v-card>
        <v-card-title class="text-h5 lighten-2">
          {{ alert.title }}
        </v-card-title>

        <v-card-text class="text">
          {{ alert.message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-for="item in alert.actions"
            depressed
            :key="item.text"
            :color="item.color"
            :text="item.btnText ? item.btnText : false"
            @click="item.action"
          >
            {{ item.text }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalAlert',
  props: {
    alert: {
      type: Object,
      default: Object,
    },
  },
  alert: {
    show: false,
    title: '',
    type: '',
    message: '',
    vertical: false,
    actions: [{ color: '', text: '', action: () => {} }],
},
}
</script>

<style scoped>
  .text {
     font-size: 17px !important;
     color: black;
  }
</style>
