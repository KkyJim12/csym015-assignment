<template>
  <GmapMap
    ref="mapRef"
    :center="{ lat: locations[0].location.lat, lng: locations[0].location.lng }"
    :zoom="14"
    map-type-id="terrain"
    style="width: 100%; height: 40%"
  >
    <GmapMarker
      :key="index"
      v-for="(m, index) in locations"
      :position="m.location"
      :clickable="true"
      @click="center = m.position"
    />
  </GmapMap>
</template>

<script>
export default {
  computed: {
    locations() {
      return this.$store.state.destinations
    },
  },
  mounted() {},
}
</script>
