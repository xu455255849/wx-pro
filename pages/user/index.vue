<template lang="pug">
    .container
        .user-header
            img(:src="authUser.headimgurl")
            .user-header-text {{ authUser.nickname }}
        .user-money
            img(src='~static/images/money.png' )
            span {{ money.toFixed(2) }}
            button(@click="charge") 充值
        .user
            .user-address
                cell(title='收获地址' iconName='place' @click.native='address')
                .user-content {{ authUser.nickname }}
            .user-phone
                cell(title='电话' iconName='phone_iphone')
                .user-content {{ authUser.phoneNumber }}
            .user-name
                cell(title='姓名' iconName='account_box')
                .user-content {{ authUser.name }}
            .user-order
                cell(title='我的订单' iconName='list')
                .user-order-item(v-for='(item, index) in payments' :key='index')
                    img(:src='imageCDN + item.product.images[0]')
                    .user-order-intro
                        .title {{ item.product.title }}
                        .content {{ item.product.intro }}
                    .user-order-price
                        span ¥{{ item.product.price.toFixed(2) }}
</template>

<script>
  import cell from '../../components/cell.vue'
  import { mapState } from 'vuex'
  
  export default {
    middleware: 'wechat-auth',
    head () {
      return {
        title: '个人中心'
      }
    },
    computed: {
      ...mapState([
        'authUser',
        'imageCDN',
        'payments',
        'money'
      ])
    },
    methods: {
      charge () {
        this.$store.dispatch('putCharge')
      },
      address () {
        wx.openAddress({
          trigger: function (res) {
            alert('用户开始拉出地址');
          },
          success: function (res) {
            alert('用户成功拉出地址');
            alert(JSON.stringify(res));
          },
          cancel: function (res) {
            alert('用户取消拉出地址');
          },
          fail: function (res) {
            alert(JSON.stringify(res));
          }
        });
      }
    },
    beforeCreate () {
      this.$store.dispatch('getCharge')
      //this.$store.dispatch('fetchPayments')
    },
    components: {
      cell
    },
    mounted () {
      const wx = window.wx
      const url = window.location.href
  
      this.$store.dispatch('getWechatSignature', url).then(res => {
        if (res.data.success === 1) {
          const params = res.data.params
          wx.config({
            debug: true, // 调试模式
            appId: params.appId, // 公众号的唯一标识
            timestamp: params.timestamp, // 生成签名的时间戳
            nonceStr: params.noncestr, // 生成签名的随机串
            signature: params.signature, // 签名
            jsApiList: [ 'openAddress' ]// 需要使用的JS接口列表: 微信支付接口
          })
          wx.ready(() => {
         
          })
        }
      })
    }
  }
</script>

<style lang="sass" scoped src='../../static/sass/user.sass'></style>

