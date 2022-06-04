<template>
  <div>
    <v-text-field
      v-model="newSearch"
      dense
      rounded
      solo
      :append-icon="icons.mdiMagnify"
      @click:append="setSearch(), searchQuestions()"
      @keyup.enter="setSearch(), searchQuestions()"
    >
    </v-text-field>
    <div v-if="!isLoading">
      <v-chip-group>
        <v-chip
          class="mx-1"
          color="primary"
          :outlined="!isSelectAllCategories"
          link
          @click="selectAllCategories"
        >
          Todo
        </v-chip>
        <v-chip
          class="mx-1"
          color="primary"
          :outlined="!isSelectMyQuestions"
          link
          @click="selectMyQuestions"
        >
          Mis preguntas
        </v-chip>
        <v-chip
          v-for="category in categories"
          :key="category.id"
          class="mx-1"
          color="primary"
          :outlined="!category.isSelect"
          @click="selectCategory(category)"
          link
        >
          {{ category.category }}
        </v-chip>
      </v-chip-group>
    </div>
    <div v-else class="d-flex justify-center">
      <v-chip-group>
        <v-skeleton-loader
          v-for="loader in 6"
          :key="loader"
          type="chip"
          class="mx-1"
        ></v-skeleton-loader>
      </v-chip-group>
    </div>

    <!-- Alerts -->
    <alert-modal :alert="alert" />
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js';
import { mapActions } from 'vuex';
import AlertModal from '@/components/AlertModal.vue';

export default {
  components: { AlertModal },
  name: 'SearchQuestions',
  props: {
    search: {
      type: String,
      default: '',
    }
  },
  mounted() {
    this.newSearch = this.search
  },
  data: () => ({
    // DATA BASE
    isLoading: false,
    newSearch: '',
    isSelectAllCategories: true,
    isSelectMyQuestions: false,

    // DATA API
    categories: [],

    // DATA COMPONENT STATICS
    icons: {
      mdiMagnify
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
  async created() {
    await this.methodGetCategories()
  },
  methods: {
    ...mapActions('questionsComunications', ['actionGetCategories']),

    async methodGetCategories() {
      try {        
        this.isLoading = true
        const res = await this.actionGetCategories()
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
        
        this.categories = res.map(c => {
          const newCategory = c
          
          newCategory.isSelect = false

          return newCategory
        })
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
    },
    
    selectCategory(category) {
      category.isSelect = !category.isSelect
      const existFilter = this.categories.find(c => c.isSelect)
      let arraySelectedCategories = []

      if(existFilter) {
        this.isSelectAllCategories = false
        arraySelectedCategories = this.categories.filter( c => c.isSelect ).map(c => c.id)
      }else {
        this.isSelectAllCategories = true
      }

      this.$emit('set-selected-categories', arraySelectedCategories)
    },
    selectAllCategories() {
      this.isSelectAllCategories = true
      this.categories = this.categories.map(c => {
        const newCategory = c

        newCategory.isSelect = false

        return newCategory
      })

      this.$emit('set-selected-categories', [])
    },
    selectMyQuestions() {
      this.isSelectMyQuestions = !this.isSelectMyQuestions
      this.$emit('set-my-categories', this.isSelectMyQuestions)
    },
    searchQuestions() {
      this.$emit('search-questions', this.search)
    },
    setSearch() {
      this.$emit('set-search', this.newSearch)
    }
  }
}
</script>

<style>
</style>