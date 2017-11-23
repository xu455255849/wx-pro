<template lang="pug"></template>
<script>
  export default {
    props: ['error'],
    methods: {
      reload () {
        location.reload()
      }
    },
    beforeCreate () {
      location.reload()
    },
  }
</script>
