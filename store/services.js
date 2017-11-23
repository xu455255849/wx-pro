import axios from 'axios'

const baseUrl = ''

class Services {
  
  getUserData (openid) {
    return axios.get(`${baseUrl}/api/user/${openid}`)
  }
  
  /**
   * 查询所有手办商品
   * @return {Promise}
   */
  allProducts () {
    return axios.get(`${baseUrl}/api/products`)
  }
  
  /**
   * 查询单个手办商品详情
   * @param {Number} id
   * @return {Promise}
   */
  focusProduct (id) {
    return axios.get(`${baseUrl}/api/products/${id}`)
  }
  
  /**
   * 这里发一个异步请求到 /wechat-signature，拿到签名回填初始化
   * 生成合法签名，需要依赖传递过去当前页面的完整 URL
   * Koa 通过 ctx.url 获取未必准确
   * 本地测试，可以修改  config/development 中 appId/appSecret/token
   * @return {
   *   success: 1,
   *   params: {
   *     timestamp,
   *     noncestr,
   *     signature
   *   }
   * }
   */
  getWechatSignature (url) {
    return axios.get(`${baseUrl}/wechat-signature?url=${encodeURIComponent(url)}`)
  }
  
  /**
   * 这里发一个异步请求到 /wechat-oauth，拿到服务器获得的用户资料
   * @return {
   *   success: true,
   *   user: {
   *     nickname,
   *     headurl,
   *     ...
   *   }
   * }
   */
  getWechatOAuth (url) {
    return axios.get(`${baseUrl}/wechat-oauth?url=${encodeURIComponent(url)}`)
  }
  
  getPayments () {
    return axios.get('/api/payments')
  }
  /**
   * 测试完成获取结果
   * @param  {String} openid
   * @param  {String} house
   * @param  {String} profession
   *
   * @return {
   *  house: '',
   *  profession: '',
   *  intro: ''
   * }
   */
  finishExam ({ openid, house, profession }) {
    return axios.post('/api/exam', {
      openid: openid,
      house: house,
      profession: profession
    })
  }
}

export default new Services()
