export const state = () => ({
  destinations: [
    {
      name: 'Northampton',
      location: { lat: parseFloat(52.23381), lng: parseFloat(-0.88532) },
    },
  ],
  forecasts: [],
  weatherByDestination: [],
})

export const mutations = {
  storeDestinations(state, destinations) {
    state.destinations = destinations
  },
  storeForecasts(state, forecasts) {
    state.forecasts = forecasts
  },
  storeWeather(state, weather) {
    state.weatherByDestination = weather
  },
}

export const actions = {
  getDestination(context, destinations) {
    context.commit('storeDestinations', destinations)
  },
  getForecasts(context, forecasts) {
    context.commit('storeForecasts', forecasts)
  },
  checkWeather(context, weather) {
    context.commit('storeWeather', weather)
  },
}
