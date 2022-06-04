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
                class="d-flex align-center"
              >
                <v-img src="@/assets/images/register.svg" />
              </v-col>
              <v-col>
                <v-row>
                  <v-col>
                    <h1>¡Únete y comienza a explorar!</h1>
                    <span>Estás a punto de iniciar una nueva aventura 👽</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="name"
                      label="Nombre" 
                      type="name" 
                      autocomplete="off"
                      dense 
                      outlined 
                    />
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
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field 
                      v-model="cPassword"
                      label="Confirmar contraseña" 
                      :type="isCPasswordVisible ? 'text' : 'password'"
                      autocomplete="off"
                      dense 
                      outlined 
                      :append-icon="isCPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      @click:append="isCPasswordVisible = !isCPasswordVisible"
                      @keyup.enter="signUp"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    ¿Ya tienes una cuenta? <router-link style="text-decoration: none" :to="{name: 'login'}">Inicia sesión</router-link>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="d-flex justify-end">
                    <v-btn 
                      depressed 
                      color="primary"
                      @click="signUp"
                      :loading="isLoading"
                    >
                      Registrarse
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
  name: 'RegisterPage',
  data: () => ({
    isLoading: false,
    isPasswordVisible: false,
    isCPasswordVisible: false,
    name: '',
    username: '',
    password: '',
    cPassword: '',
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
  computed: {
		...mapState(['authStore'])
	},
  mounted() {
    if ( this.authStore.token ) this.$router.push({name: 'home'})      
  },
  methods: {
    ...mapActions('authComunications', ['actionSignUp']),
    ...mapMutations('authStore', ['setAuthData']),
    
    async signUp() {
      try {
        const data = {
          name: this.name,
          username: this.username,
          password: this.password,
        }
  
        const validations = this.validateData()

        if(validations.error) {
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
        const res = await this.actionSignUp({data})
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
  
        this.$router.push({name: 'home'})        
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

      if(this.name.trim() === '') {
        output.error = true
        output.message = 'Solo para saber ¿Cuál es tu nombre?, escríbelo por favor 🤭'
      } else if(this.username.trim() === '') {
        output.error = true
        output.message = 'Para poder crear una cuenta, necesitamos que nos envíes tu usuario 😬'
      } else if (this.password.trim() === '') {
        output.error = true
        output.message = 'Creo que la contraseña es importante, escríbela 🙈'
      } else if (this.cPassword.trim() === '') {
        output.error = true
        output.message = 'Confírmanos cuál es tu contraseña, por favor 👀'
      } else if (this.cPassword.trim() !== this.password.trim()) {
        output.error = true
        output.message = 'Las contraseñas no coinciden 😓'
      }

      return output
    }
  }
}
</script>
