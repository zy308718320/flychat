<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      clientId: ''
    }
  },
  sockets: {
    connected: function (clientId) {
      if (clientId !== '' && clientId !== this.clientId) {
        this.$eventBus.$emit('setClientId', clientId)
        this.clientId = clientId
      }
    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    background-image: url("assets/background.png");
    background-size: cover;
    /*overflow: hidden;*/
  }
</style>
