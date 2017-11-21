<template lang="pug">
    #app
        v-header
        #container
            nuxt
</template>

<script>
  import vHeader from '../components/header.vue'

  export default {
    components: {
      vHeader
    }
  }
</script>

<style lang='sass', scoped>
    
    #container
        display: flex

</style>
