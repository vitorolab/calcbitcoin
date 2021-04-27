<template>
  <v-app id="home">
    <v-card height="100%">
      <v-container style="width: 100%">
        <v-form>
          <v-combobox @change="calculate()" :items="moedas" v-model="moeda" label="Insira a moeda" placeholder="0" ></v-combobox>
            <v-text-field type="number" @keyup="calculate()" v-model="valorMoeda" :label="'insira um valor em '+ moeda ">
            {{ valorMoeda }}
            </v-text-field>
          <p align="center"><strong>{{ valorBitcoin }} BTC</strong></p>
        </v-form>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
    data(){
      return{

      }
    },
  computed: {
    moeda: {
      get () {
        return this.$store.state.moeda
      },
      set (value) {
        this.$store.commit('setMoeda', value)
      }
    },
    valorMoeda: {
      get () {
        return this.$store.state.moeda
      },
      set (value) {
        this.$store.commit('setValorMoeda', value)
      }
    },
    ...mapGetters([
      'bpi',
      'valorBitcoin',
      'moedas'

    ])
  },
    methods:{
      calculate(){
        this.$store.commit('calculateBitcoin')
      }
      }
    }
</script>