<template>
  <v-app>
    <v-card
    height="100%">
    <v-app-bar
        color="blue"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title align="center" v-if="moeda" style="color: white">
        Bitcoin = {{ valorAppBar }}
      </v-toolbar-title>
    </v-app-bar>
      <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary>
        <v-list
        nav
        dense>
        <v-list-item-group
        v-model="group">
          <v-list-item to="/">
            <v-list-item-title>
              Calcular BTC
            </v-list-item-title>
          </v-list-item>
          <v-list-item to="/table">
            <v-list-item-title>
              Verificar datas
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view/>
    </v-card>
  </v-app>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data(){
    return{
      group: null,
      drawer: false,
    }
  },
  computed: {
    ...mapGetters([
        'bpi',
        'moeda',
      'valorAppBar'

    ])
  },

  created() {
    this.$store.dispatch('loadApi')
  }
};
</script>
