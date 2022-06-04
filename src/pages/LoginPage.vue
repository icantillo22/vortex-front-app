<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col
        cols="12"
        sm="10"
        md="8"
        class="mx-auto"
      >
        <v-card>
          <v-container class="px-10 py-15">
            <v-row>
              <v-col 
                cols="12"
                lg="7"
              >
                <v-img src="@/assets/images/login.svg" />
              </v-col>
              <v-col>
                <v-row>
                  <v-col>
                    <h1>Iniciar sesión</h1>
                    <span>Bienvenido a la aplicación 👋</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="username"
                      label="Usuario" 
                      type="username" 
                      autocomplete="off"
                      dense 
                      outlined 
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="password"
                      label="Contraseña" 
                      :type="isPasswordVisible ? 'text' : 'password'"
                      autocomplete="off"
                      dense 
                      outlined 
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      @click:append="isPasswordVisible = !isPasswordVisible"
                      @keyup.enter="signIn"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    ¿Aún no tienes una cuenta? <router-link style="text-decoration: none" :to="{name: 'register'}">Ingresa aquí</router-link>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end">
                    <v-btn 
                      depressed 
                      color="primary"
                      @click.prevent="signIn"
                      :loading="isLoading"
                    > 
                      Ingresar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Alerts -->
    <alert-modal :alert="alert" />
  </v-container>
</template>

<script>

import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { mapActions, mapMutations, mapState } from 'vuex'
import AlertModal from '@/components/AlertModal.vue'

export default {
  components: { AlertModal },
  name: 'LoginPage',
  data: () => ({
    isLoading: false,
    isPasswordVisible: false,
    username: '',
    password: '',
    icons: {
      mdiEyeOutline,
      mdiEyeOffOutline,
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
  mounted() {
    if ( this.authStore.token ) this.$router.push({name: 'home'})      
  },
  computed: {
		...mapState(['authStore'])
	},
  methods: {
    ...mapActions('authComunications', ['actionSignIn']),
    ...mapMutations('authStore', ['setAuthData']),
    
    async signIn() {
      try {        
        const data = {
          username: this.username,
          password: this.password,
        }

        const validations = this.validateData()

        if (validations.error) {
          this.isLoading = false;
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.title = '¡Atención! 🚨'
          this.alert.message = validations.message
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

        this.isLoading = true
        const res = await this.actionSignIn({data})
        this.isLoading = false

        if(res.error) {
          this.isLoading = false;
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.title = '¡Atención! 🚨'
          this.alert.message = `${res.message} 😓`
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
        
        this.setAuthData(res)

        return this.$router.push({name: 'home'})
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

    validateData() {
      const output = {
        error: false,
        message: ''
      }

      if(this.username.trim() === '') {
        output.error = true
        output.message = 'Para poder ingresar, necesitamos que nos envíes tu usuario 😬'
      } else if (this.password.trim() === '') {
        output.error = true
        output.message = 'Creo que la contraseña es importante, escríbela 🙈'
      }

      return output
    }
  }
}
</script>
