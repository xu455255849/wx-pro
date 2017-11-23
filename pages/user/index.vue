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
                .user-content(v-if='editType') {{ userData.address }}
                .user-input(v-else)
                    input(v-model='info.address')
            .user-phone
                cell(title='电话' iconName='phone_iphone')
                .user-content(v-if='editType') {{ userData.phoneNumber }}
                .user-input(v-else)
                    input(v-model='info.phoneNumber')
            .user-name
                cell(title='姓名' iconName='account_box')
                .user-content(v-if='editType') {{ userData.name }}
                .user-input(v-else)
                    input(v-model='info.name')
            .user-button(v-if='editType')
                div(@click="editChange") 编辑收货信息
            .user-button(v-else)
                div(@click="editChange") 取消
                div(@click="saveChange") 保存收货信息
                
      
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
        editType: true,
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
      editChange () {
        this.info.name = this.userData.name
        this.info.phoneNumber = this.userData.phoneNumber
        this.info.address = this.userData.address
        console.log(this.info)
  
        this.editType = !this.editType
        //this.$modal.show('info')
      },
      saveChange () {
        console.log('save')
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

