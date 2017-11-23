<template lang="pug">
    .container
        .shopping
            .shopping-title 水果商城
            .shopping-list
                .shopping-item(v-for='(item, index) in products' :key='index')
                    img(:src="imageCDN + item.images[0]")
                    .shopping-item-body
                        .title {{ item.title }}
                        .content {{ item.intro }}
                            .footer
                                span X {{ item.count }}
                                img(src='~static/images/shopping.png' @click='focusProduct(item)')
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    middleware: 'wechat-auth',
    head () {
      return {
        title: '水果商城'
      }
    },
    computed: {
      ...mapState([
        'imageCDN',
        'products',
        'shoppingScroll'
      ])
    },
    methods: {
      focusProduct (item) {
        //this.$router.push({ path: '/deal', query: { id: item._id } })
        item.count ++
      }
    },
    beforeCreate () {
      this.$store.dispatch('fetchProducts')
    },
    mounted () {
      // 滚动条滚动至上次离开前的位置
      setTimeout(() => {
        this.$el.scrollTop = this.shoppingScroll
      }, 50)
    },
    beforeDestroy () {
      // 离开前保存滚动条位置
      this.$store.dispatch('shoppingScroll', this.$el.scrollTop)
    }
  }
</script>

<style lang="sass" src='../static/sass/shopping.sass'></style>
