import Router from 'koa-router'
import sha1 from 'sha1'
import config from '../config'

const router = new Router();

export default function (app) {
  router.get('/wechat-head', (ctx, next) => {
    const token = config.wechat.token
    const {
      signature,
      nonce,
      timestamp,
      echostr
    } = ctx.query
    const str = [token,timestamp, nonce].sort().join('')
    const sha = sha1(str)

    if (sha == signature) {
      console.log('success')
      ctx.body = echostr
    } else {
      ctx.body = 'failed'
    }
  });
  app
    .use(router.routes())
    .use(router.allowedMethods());
}

