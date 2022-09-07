<template>
  <v-card class="px-5 py-2 h-full d-flex flex-column justify-space-between"
    ><h1>Chat Bot</h1>
    <v-sheet
      class="px-5 py-5 d-flex flex-column overflow-y-auto"
      color="secondary"
      elevation="1"
      height="80%"
      width="100%"
      rounded
    >
      <div v-for="(message, index) in messages">
        <Message :message="message" />
      </div>
    </v-sheet>

    <v-form @submit.prevent="sendMessage()">
      <v-row>
        <v-col md="10">
          <v-text-field
            v-model="messageBox"
            solo
            placeholder="Type something..."
          ></v-text-field>
        </v-col>
        <v-col md="2">
          <v-btn
            :disabled="messageBox === '' || botLoading"
            type="submit"
            large
            class="mt-1"
            block
            color="success"
            >Send</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  computed: {
    locations() {
      return this.$store.state.destinations
    },
    forecasts() {
      return this.$store.state.forecasts
    },
    weatherByDestination() {
      return this.$store.state.weatherByDestination
    },
  },
  mounted() {
    this.startAsking()
  },
  data() {
    return {
      step: 0,
      botLoading: false,
      messages: [],
      messageBox: '',
      reply: '',
      ask: '',
    }
  },
  methods: {
    // User send message to bot
    sendMessage() {
      // Check if input is empty
      if (this.messageBox === '' || this.botLoading) {
        return
      }
      this.messages.push({ data: this.messageBox, type: 'user' })
      this.botProcessing(this.messageBox)
      this.messageBox = ''
    },
    // Reinitial chat bot
    resetBot() {
      this.storeDestination = []
      this.storeDate = []
      this.step = 0
      this.messages = []
      this.startAsking()
    },
    // Probe question
    startAsking() {
      this.botLoading = true
      this.ask =
        'Hi, I am a bot climate advisor. I will forecast climate of locations you want to know. You can type the locations on the chat. You can use "," for many locations. For more accurate destination, you can use postcode to find a destination.'
      this.messages.push({ data: this.ask, type: 'bot' })
      this.ask = ''
      this.step++
      this.botLoading = false
    },
    // Loading ui when bot is replying
    botProcessing(message) {
      this.processing(message)
    },
    // Bot replying
    botReply(message) {
      this.reply = message
      this.messages.push({ data: this.reply, type: 'bot' })
      this.reply = ''
    },
    // Case in each step
    processing(message) {
      switch (this.step) {
        case 1:
          this.step1(message)
          break
        case 2:
          this.step2(message)
          break
        case 3:
          this.step3(message)
          break
      }
    },
    // Request Destinations
    async step1(message) {
      try {
        this.storeDestination = message.split(',')
        let response = await this.$axios.post('/api/geocoding', {
          destinations: this.storeDestination,
        })

        let geo = response.data.data
        this.$store.dispatch('getDestination', geo)
        this.botReply(
          `So your destinations are ${message}. If that correct please type "Confirm" to processing or "Reset" to reset the bot.`
        )
        this.step++
      } catch (error) {
        this.botReply('There is something error.')
      }
    },
    // Confirm or Reset
    async step2(message) {
      if (message === 'Confirm') {
        await this.callApi()

        let rainAll = []

        for (let i = 0; i < this.forecasts.length; i++) {
          let rainByDestination = []
          for (let j = 0; j < this.forecasts[i].data.daily.length; j++) {
            if (this.forecasts[i].data.daily[j].weather[0].main === 'Rain') {
              rainByDestination.push('r')
            } else {
              rainByDestination.push('n')
            }
          }
          rainAll.push({
            name: this.forecasts[i].name,
            data: rainByDestination,
          })
        }

        this.$store.dispatch('checkWeather', rainAll)

        for (let x = 0; x < this.weatherByDestination.length; x++) {
          let rain = []

          for (let y = 0; y < this.weatherByDestination[x].data.length; y++) {
            if (this.weatherByDestination[x].data[y] === 'r') {
              rain.push(y)
            }
          }

          let advise = ''

          if (rain.length === this.weatherByDestination[x].data.length) {
            advise = `For ${this.weatherByDestination[x].name}, All upcoming ${
              rain.length - 1
            } are rain as well as today.`
          } else if (rain.length === 0) {
            advise = `For ${
              this.weatherByDestination[x].name
            }, There are no rain for today and upcoming ${
              this.weatherByDestination[x].data.length - 1
            } days.`
          } else {
            if (rain[0] === 'r') {
              advise = `For ${
                this.weatherByDestination[x].name
              }, Only Today and next ${rain.slice(1).join(',')} days are rain.`
            } else {
              advise = `For ${
                this.weatherByDestination[x].name
              }, Today is not raining but there will be rain on next ${rain.join(
                ','
              )} days.`
            }
          }
          this.botReply(advise)
        }

        this.step++
      } else if (message === 'Reset') {
        this.resetBot()
      } else {
        this.botReply(
          `We cannot understand ${message} please type "Confirm" or "Reset" correctly`
        )
      }
    },

    step3(message) {},
    async callApi() {
      try {
        let response = await this.$axios.post('/api/destinations', {
          destinations: this.locations,
        })
        let forecasts = response.data.data
        this.$store.dispatch('getForecasts', forecasts)
      } catch (error) {
        this.botReply('There is something error.')
      }
    },
  },
}
</script>
