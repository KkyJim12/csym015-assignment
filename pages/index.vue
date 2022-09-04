<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row class="px-5 py-5 h-screen">
          <v-col md="6"></v-col>
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
