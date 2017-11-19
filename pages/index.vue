<template>
  <div>
      qweqweqweq
  </div>
</template>

<script>
 
  
  export default {
  //  middleware: 'wechat-auth',
    head () {
      return {
        // 本页面的<head>中的<title>
        title: '冰火脸谱'
      }
    },
    data () {
      return {
      
      }
    },
    methods: {
      focusHouse (item) {
        // 路由跳转到house，附带查询参数id
        this.$router.push({ path: '/house', query: { id: item._id } })
      },
      focusCharacters (item) {
        // 路由跳转到character，附带查询参数id
        this.$router.push({ path: '/character', query: { id: item._id } })
      }
    },
    
  }
</script>
<!--

<style scoped lang="sass" src='~static/sass/index.sass'></style>
-->
