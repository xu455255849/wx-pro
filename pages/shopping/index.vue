<template lang="pug">
    .container
        .shopping
            .shopping-title 水果商城
            .shopping-list(v-if='list.length !== 0')
                .shopping-item(v-for='(item, index) in list' :key='index')
                    img(:src="imageCDN + item.images[0]")
                    .shopping-item-body
                        .title {{ item.title }}
                        .content {{ item.intro }}
                         .footer
                             span X {{ item.count }}
                             img(src='~static/images/clear.png' @click='delProduct(index)')
            .shopping-list(v-else)
                .noproduct
                    img(src='~static/images/cry.png')
                    .nomessage 暂未添加任何商品
    
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
  // middleware: 'wechat-auth',
    head () {
      return {
        title: '水果商城',
      }
    },
    data () {
      return {
        list: []
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
      delProduct (index) {
        // 路由跳转到deal，附带查询参数id
        //this.$router.push({ path: '/deal', query: { id: item._id } })
        this.$store.dispatch('delProduct', index)
      }
    },
    mounted () {
      this.products.forEach( (it) => {
        if (it.count !== 0) {
          this.list.push(it)
        }
      })
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

<style lang="sass" src='../../static/sass/shopping.sass'></style>
