import Router from 'koa-router'
import config from '../config'
import reply from '../wechat/reply'
import wechatMiddle from '../wechat-lib/middleware'
import { signature, redirect, oauth } from '../controllers/wechat'
export const router = app => {
  const router = new Router();
  router.all('/wechat-hear', wechatMiddle(config.wechat, reply))
  router.get('/wechat-signature', signature )
  router.get('/wechat-redirect', redirect)
  router.get('/wechat-oauth', oauth)
  
  
  app
  .use(router.routes())
  .use(router.allowedMethods());
}

