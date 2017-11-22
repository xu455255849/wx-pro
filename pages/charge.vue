<template>
    <div class="page-charge">
        <ul>
            <li v-for="item in list" :key="item.value">
                <p> {{ item.value }}元</p>
               
                {{ item.label }}
            </li>
        </ul>
        
        
        <div>
        
        </div>
    </div>
   
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
   // middleware: 'wechat-auth',
    head () {
      return {
        title: '充值'
      }
    },
    data () {
      return {
        list: [
          {
            value: 100,
            label: '充一百送一百'
          },
          {
            value: 200,
            label: '充一百送一百'
          },
          {
            value: 300,
            label: '充一百送一百'
          },
          {
            value: 400,
            label: '充一百送一百'
          },
          {
            value: 500,
            label: '充一百送一百'
          },
          {
            value: 600,
            label: '充一百送一百'
          },
        ]
        
      }
    },
    computed: {
      ...mapState({
        imageCDN: 'imageCDN',
        product: 'focusProduct'
      })
    },
    methods: {
      payHandle () {
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
                jsApiList: [ 'chooseWXPay' ]// 需要使用的JS接口列表: 微信支付接口
              })
              wx.ready(() => {
                wx.chooseWXPay({
                  timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
                  package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                  signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  paySign: params.paySign, // 支付签名
                  success: (res) => {
                    try {
                      window.WeixinJSBridge.log(res.err_msg)
                    } catch (e) {
                      console.error(e)
                    }
                    if (res.err_msg === 'get_brand_wcpay_request:ok') {
                      // 支付成功
                    } else {
                    }
                  }
                })
              })
            }
          })
      }
    },
    beforeCreate () {
    }
  }
</script>

<style scoped>
    ul {
        width: 80%;
        margin: 50px auto;
    }
    
    li {
        text-align: center;
        float: left;
        width: 30%;
        padding: 50px;
        margin-bottom: 20px;
        background: #50f433;
    }
    
    li:nth-child(2n) {
        float: right;
    }
    
    li p:first-child {
        color: red;
        font-size: 0.8rem;
    }

</style>
