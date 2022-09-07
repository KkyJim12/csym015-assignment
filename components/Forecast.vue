<template>
  <v-sheet
    elevation="2"
    class="px-2 py-2 mt-2 overflow-y-auto"
    rounded
    height="40%"
    width="100%"
  >
    <v-row v-for="(forecast, index) in forecasts">
      <v-col md="12"
        ><h1>{{ forecast.name }}</h1></v-col
      >
      <v-col md="3" v-for="(daily, index) in forecast.data.daily">
        <v-card class="px-2 py-2">
          <v-card-title>{{
            $moment().add(index, 'days').format('ddd DD/MM/YY')
          }}</v-card-title>
          <v-divider> </v-divider>
          <v-card-text>{{ daily.weather[0].description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  computed: {
    forecasts() {
      return this.$store.state.forecasts
    },
  },
}
</script>
