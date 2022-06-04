<template>
  <v-app-bar
    app 
    color="transparent"
    dense
    class="pa-2"
    elevation="0"
  >
    <v-spacer></v-spacer>

    <v-menu
      offset-y
      left
      nudge-bottom="14"
      min-width="230"
      content-class="user-profile-menu-content"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-badge
          bottom
          color="success"
          overlap
          offset-x="12"
          offset-y="12"
          class="ms-4"
          dot
        >
          <v-avatar
            size="40px"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            <span class="white--text">
              {{avatarUsername}}
            </span>
          </v-avatar>
        </v-badge>
      </template>
      <v-list>
        <div class="pb-3 pt-2">
          <v-badge
            bottom
            color="success"
            overlap
            offset-x="12"
            offset-y="12"
            class="ms-4"
            dot
          >
            <v-avatar size="40px" color="primary">
              <span class="white--text">
                {{avatarUsername}}
              </span>
            </v-avatar>
          </v-badge>
          <div
            class="d-inline-flex flex-column justify-center ms-3"
            style="vertical-align:middle"
          >
            <span class="text--primary font-weight-semibold mb-n1">
              {{this.authStore.userData.username}}
            </span>
            <small class="text--disabled text-capitalize">
              {{this.authStore.userData.Roles.rol}}
            </small>
          </div>
        </div>

        <v-divider class="my-2"></v-divider>

        <!-- Logout -->
        <v-list-item 
          link
          @click="logOut"
        >
          <v-list-item-icon class="me-2">
            <v-icon size="22">
              {{ icons.mdiLogoutVariant }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Cerrar sesión</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mdiLogoutVariant } from '@mdi/js'
import { mapMutations, mapState } from 'vuex'
  export default {
    name: 'HelloWorld',
    data: () => ({
      icons: { mdiLogoutVariant }
    }),
    computed: {
      ...mapState(['authStore']),

      avatarUsername() {
        return this.authStore.userData.username.substring(0, 2).toUpperCase()
      }
    },
    methods: {
      ...mapMutations('authStore', ['setAuthData']),
      
      logOut() {
        this.setAuthData({token: null, userData: null})
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>
