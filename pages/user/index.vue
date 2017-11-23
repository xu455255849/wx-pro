<template lang="pug">
    .container
        .user-header
            img(:src="authUser.headimgurl")
            .user-header-text {{ authUser.nickname }}
        .user-money
            img(src='~static/images/money.png' )
            span {{ userData.money.toFixed(2) }}
            button(@click="charge") 充值
        .user
            .user-address
                cell(title='收获地址' iconName='place')
                .user-content {{ userData.address }}
            .user-phone
                cell(title='电话' iconName='phone_iphone')
                .user-content {{ userData.phoneNumber }}
            .user-name
                cell(title='姓名' iconName='account_box')
                .user-content {{ userData.name }}
            .user-button
                div(@click="showModal") 编辑收货信息
        modal(name="info" height="auto" width="80%" resizable="true")
            .edit-title 修改收货信息
            .edit-content
                cell(title='收获地址' iconName='place')
                input(v-model='info.address')
            .edit-content
                cell(title='电话' iconName='phone_iphone')
                input(v-model='info.phoneNumber')
            .edit-content
                cell(title='姓名' iconName='account_box')
                input(v-model='info.name')
            .edit-button
                button(@click="charge") 确定
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
    data () {
      return {
        showInfo: false,
        info: {
          name: '',
          phoneNumber: '',
          address: ''
        },
      }
    },
    computed: {
      ...mapState([
        'authUser',
        'imageCDN',
        'payments',
        'userData'
      ])
    },
    methods: {
      showModal () {
        this.info.name = this.userData.name
        this.info.phoneNumber = this.userData.phoneNumber
        this.info.address = this.userData.address
        console.log(this.info)
        this.$modal.show('info')
      },
      charge () {
        this.$store.dispatch('editUserData', type, value)
      }
    },
    beforeCreate () {
      this.$store.dispatch('getUserData')
      //this.$store.dispatch('fetchPayments')
    },
    components: {
      cell
    },
    mounted () {
    
    }
  }
</script>

<style lang="sass" scoped src='../../static/sass/user.sass'></style>

