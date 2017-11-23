import axios from 'axios'
import Services from './services'

export default {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.user) {
      const { email, nickname, avatarUrl } = req.session.user
      const user = {
        email,
        nickname,
        avatarUrl
      }
      
      commit('SET_USER', user)
    }
  },
  
  getWechatSignature ({ commit }, url) {
    return Services.getWechatSignature(url)
  },
  
  getWechatOAuth ({ commit }, url) {
    return Services.getWechatOAuth(url)
  },
  
  setAuthUser ({ commit }, authUser) {
    commit('SET_AUTHUSER', authUser)
  },
  
  async login ({ commit }, { email, password }) {
    try {
      let res = await axios.post('/api/login', {
        email,
        password
      })
      
      let { data } = res
      if (!data.ret) commit('SET_USER', data.user)
      
      return data
    } catch (e) {
      if (e.response.status === 401) {
        throw new Error('You can\'t do it')
      }
    }
  },
  
  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },
  
  async fetchProducts ({ state }) {
    if (state.products.length !== 0) {
      return
    }
    let data = []
    const res = await Services.allProducts()
    res.data.forEach( (it)=> {
      it.count = 0
      data.push(it)
    })
    state.products = data
    return data
  },
  
  async fetchPayments ({ state }) {
    let { data } = await Services.getPayments()
    console.log(data)
    state.payments = data
    return data
  },
  
  async saveProduct ({ state, dispatch }, product) {
    await axios.post('/api/products', product)
    let res = await dispatch('fetchProducts')
    
    return res.data
  },
  
  async getUserData ({ state }) {
    const openid = state.authUser.openid
    let { data } = await Services.getUserData(openid)
    //console.log('getchar', data)
    
    state.userData = data
   
    return data
  },
  
  async editUserData ({ state }, type, value){
    switch (type) {
      case 'address':
        await axios.put('/user/address', {
          openid: state.authUser.openid,
          value: 500
        })
      case '':
        await axios.put('/api/user', {
          openid: state.authUser.openid,
          value: 500
        })
      case '':
        await axios.put('/api/user', {
          openid: state.authUser.openid,
          value: 500
        })
    }
   
    //let res = await dispatch('getCharge')
    
    //return res.data
  },
  
  async putProduct ({ state, dispatch }, product) {
    await axios.put('/api/products', product)
    let res = await dispatch('fetchProducts')
    
    return res.data
  },
  
  homePageScroll ({ state }, { home, house }) {
    state.homePageScroll = {
      home: home,
      house: house
    }
  },
  
  shoppingScroll ({ state }, payload) {
    state.shoppingScroll = payload
  },
  
  finishExam ({ state }, obj) {
    return Services.finishExam(obj)
  }
}
