export const state = () => ({
  destinations: [
    {
      name: 'Northampton',
      location: { lat: parseFloat(52.23381), lng: parseFloat(-0.88532) },
    },
  ],
  forecasts: [],
})

export const mutations = {
  storeDestinations(state, destinations) {
    state.destinations = destinations
  },
  storeForecasts(state, forecasts) {
    state.forecasts = forecasts
  },
}

export const actions = {
  getDestination(context, destinations) {
    context.commit('storeDestinations', destinations)
  },
  getForecasts(context, forecasts) {
    context.commit('storeForecasts', forecasts)
  },
}
