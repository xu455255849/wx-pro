import axios from 'axios'

const baseUrl = ''

class Services {
  getWechatSignature (url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${encodeURIComponent(url)}`)
  }
  
  getUserByOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${url}`)
  }
  
  getWechatOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }
  
  createOrder ({ productId, name, address, phoneNumber }) {
    return axios.post(`${baseUrl}/wechat-pay`, {
      productId,
      name,
      address,
      phoneNumber
    })
  }
  
  getPayments () {
    return axios.get(`${baseUrl}/admin/payments`)
  }
  
  fetchProducts () {
    return axios.get(`${baseUrl}/api/products`)
  }
  
  fetchProduct (id) {
    return axios.get(`${baseUrl}/api/products/${id}`)
  }
  
  fetchUserAndOrders () {
    return axios.get(`${baseUrl}/api/user`)
  }
}

export default new Services()