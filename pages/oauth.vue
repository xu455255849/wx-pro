<template>
    <section class="container">
        <nuxt-link class="button" to="/">
            Home page
        </nuxt-link>
    </section>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    asyncData ({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    },
    head () {
      return {
        title: `oauth`
      }
    },
    beforeMount () {
      const url = window.location.href
    
      this.$store.dispatch('getWechatOAuth', url)
      .then(res => {
        if (res.data.success) {
          console.log(res)
        }
      })
    }
  }
</script>

<style scoped>
    .title
    {
        margin-top: 50px;
    }
    .info
    {
        font-weight: 300;
        color: #9aabb1;
        margin: 0;
        margin-top: 10px;
    }
    .button
    {
        margin-top: 50px;
    }
</style>
