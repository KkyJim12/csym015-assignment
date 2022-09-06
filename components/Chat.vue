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
  mounted() {
    this.startAsking()
  },
  data() {
    return {
      storeDestination: [],
      storeDate: [],
      step: 0,
      botLoading: false,
      messages: [],
      messageBox: '',
      reply: '',
      ask: '',
    }
  },
  methods: {
    resetBot() {
      this.storeDestination = []
      this.storeDate = []
      this.step = 0
      this.messages = []
    },
    startAsking() {
      this.botLoading = true
      this.ask =
        'Hi, here is a trip advisor bot. We are here to plan the best trip for you. Firstly Please type the place you want to go. you can place the destinations as many as you want by using "," to seperate each destination.'
      this.messages.push({ data: this.ask, type: 'bot' })
      this.ask = ''
      this.step++
      this.botLoading = false
    },
    sendMessage() {
      // Check if input is empty
      if (this.messageBox === '' || this.botLoading) {
        return
      }
      this.messages.push({ data: this.messageBox, type: 'user' })
      this.botReply(this.messageBox)
      this.messageBox = ''
    },
    botReply(message) {
      this.loading()
      this.processing(message)
    },
    loading() {},
    processing(message) {
      switch (this.step) {
        case 1:
          this.question1(message)
          break
        case 2:
          this.question2(message)
          break
        case 3:
          this.question3()
          break
      }
    },
    question1(message) {
      this.storeDestination = message.split(',')
      this.reply =
        'So you are going to ' +
        message +
        '. Now we want the date you want to go. You can use - for if you want to go many days. For ex, 28/10/2022-30/10/2022'
      this.messages.push({ data: this.reply, type: 'bot' })
      this.reply = ''
      this.step++
    },
    question2(message) {
      this.storeDate = message.split('-')
      this.reply =
        'So you are going to ' +
        this.storeDestination.join(',') +
        ' during ' +
        message +
        '. Please type "Confirm" to process the trip. Or type "Reset to start new chat bot.'
      this.messages.push({ data: this.reply, type: 'bot' })
      this.reply = ''
      this.step++
    },
    question3(message) {
      if (message === 'Confirm') {
        console.log('api')
        this.callApi()
      } else if (message === 'Reset') {
        this.resetBot()
      } else {
        this.reply =
          'We cannot understand ' +
          message +
          '. Please type "Confirm" or "Reset correctly"'
        this.messages.push({ data: this.reply, type: 'bot' })
        this.reply = ''
      }
    },
  },
}
</script>
