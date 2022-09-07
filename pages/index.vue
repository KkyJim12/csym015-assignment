<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row class="px-5 py-5 h-screen">
          <v-col md="6">
            <h1>Destinations</h1>
            <Map />
            <h1 class="mt-2">Results</h1>
            <Forecast />
          </v-col>
          <v-col md="6">
            <Chat />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.h-screen {
  height: 100vh;
}

.h-full {
  height: 100%;
}
</style>

<script>
export default {}
</script>
