<template>
  <v-app id="table">
    <v-container>
      <v-row>
        <v-col
            cols="12"
            sm="6"
        >
          <v-date-picker
              v-model="dates"
              range
          ></v-date-picker>
        </v-col>
        <v-col
            cols="12"
            sm="6"
        >
          <v-text-field
              v-model="dateRangeText"
              label="Data"
              prepend-icon="mdi-calendar"
              readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
    <v-btn style="align-content: center" @click="fetchHistoricalData()">Buscar</v-btn>

    <v-container>
      <v-col>
        <v-row style="size: 300px" align="center">
          <v-simple-table style="width: 400px" v-model="bpiDate">
            <template>
              <thead>
              <tr>
                <th>
                  Data
                </th>
                <th>
                  valor
                </th>
              </tr>
              </thead>
              <tr v-for="item in bpiDate" :key="item.date">
                <td>{{ item.date }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </template>
          </v-simple-table>
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import api from "../services/api";

export default {
  name: 'Table',
  data: () => ({
    dates: [],
    bpiDate:[]
  }),
  methods: {
    async fetchHistoricalData() {
      const response = await api.get('historical/close.json', {
        params:{
          start: this.dates[0],
          end: this.dates[1],
        }
      });
      if (response.status !== 200) {
        console.log('no')
        return
      }
      this.bpiDate=Object.entries(response.data.bpi).map(e => ({date: e[0],value: e[1]}))
    }
  },
  computed: {
    dateRangeText() {
      return this.dates.join(' ~ ')
    },
  },
  async created() {
    const response = await api.get('historical/close.json');
    if (response.status !== 200) {
      return
    }
    this.bpiDate=Object.entries(response.data.bpi).map(e => ({date: e[0],value: e[1]}))
  }
}
</script>