<template>
  <v-card class="px-5 py-2 h-full d-flex flex-column justify-space-between"
    ><h1>Chat Bot</h1>
    <v-sheet
      class="px-5 py-5 d-flex flex-column"
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
      count: 0,
      botLoading: false,
      messages: [],
      messageBox: '',
      reply: '',
      ask: '',
    }
  },
  methods: {
    startAsking() {
      this.botLoading = true
      this.ask =
        'Hi, here is a trip advisor bot. We are here to plan the best trip for you. Firstly Please type the place you want to go. you can place the destinations as many as you want by using "," to seperate each destination.'
      this.messages.push({ data: this.ask, type: 'bot' })
      this.ask = ''
      this.count++
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
      this.reply = 'Hi, I am bot'
      this.messages.push({ data: this.reply, type: 'bot' })
      this.reply = ''
    },
    loading() {},
    processing(message) {
      switch (this.count) {
        case 1:
          this.question1(message)
      }
    },
    async question1(message) {
      try {
        let response = await this.$axios.post('/api/destinations', {
          message: message,
        })
        console.log(response.data)
      } catch (error) {
        console.log(error.response)
      }
    },
  },
}
</script>
