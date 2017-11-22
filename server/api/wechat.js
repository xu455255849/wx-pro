import mongoose from 'mongoose'
import { getWechat, getOAuth } from '../wechat'

const wechatApi = getWechat()

const User = mongoose.model('User')

export async function getSignatureAsync (url) {
  const data = await wechatApi.fetchAccessToken()
  const token = data.access_token
  const ticketData = await wechatApi.fetchTicket(token)
  const ticket = ticketData.ticket
  
  let params = wechatApi.sign(ticket, url)
  params.appId = wechatApi.appID
  
  return params
}

export function getAuthorizeURL (...args) {
  const oauth = getOAuth()
  
  return oauth.getAuthorizeURL(...args)
}

export async function getUserByCode (code) {
  const oauth = getOAuth()
  
  const data = await oauth.fetchAccessToken(code)
   //const user = await oauth.getUserInfo(data.access_token, data.unionid)
  const user = await oauth.getUserInfo(data.access_token, data.openid)
  
  const existUser = await User.findOne({
    openid: data.openid
  }).exec()
  
  if (!existUser) {
    let newUser = new User({
      openid: [data.openid],
      unionid: data.unionid,
      nickname: user.nickname,
      money: 0
    })
    await newUser.save()
  }
  
  return user
}