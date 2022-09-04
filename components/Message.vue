<template>
  <v-alert
    :class="message.type === 'user' ? 'mr-auto' : 'ml-auto'"
    :icon="message.type === 'user' ? 'mdi-account' : 'mdi-robot'"
    text
    outlined
    :type="message.type === 'user' ? 'accent' : 'success'"
    width="fit-content"
    >{{ message.data }}
  </v-alert>
</template>

<script>
export default {
  props: ['message'],
}
</script>
