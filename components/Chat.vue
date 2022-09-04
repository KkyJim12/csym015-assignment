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
            :disabled="messageBox === ''"
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
  data() {
    return {
      messages: [],
      messageBox: '',
      reply: '',
    }
  },
  methods: {
    sendMessage() {
      // Check if input is empty
      if (this.messageBox === '') {
        return
      }
      this.messages.push({ data: this.messageBox, type: 'user' })
      this.messageBox = ''
      this.botReply()
    },
    botReply() {
      this.loading()
      this.processing()
      this.reply = 'Hi, I am bot'
      this.messages.push({ data: this.reply, type: 'bot' })
      this.reply = ''
    },
    loading() {},
    processing() {},
  },
}
</script>
