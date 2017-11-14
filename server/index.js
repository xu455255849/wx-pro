import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'
import { resolve } from 'path'
import R from 'ramda'

const r = path => resolve(__dirname, path)
const MIDDLEWARE = ['database', 'router']
const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

const useMiddleware = (app) => {
    // 中间件的个数不定，通过 Ramda 的特性，从右往左进行函数组合，右侧函数的返回结果总是左侧函数的输入参数
    // R.map(console.log)([1, 2, 3])
    // MIDDLEWARE 数组交给了 R.map
    // 分别拿到的单个数组中的值，我们可以通过 R.compose 再次进行组合。
    return R.map(R.compose(
        R.map(i => i(app)),
        require,
        i => `${r('./middleware')}/${i}`)
    )
}

const start = async () => {
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')
  const nuxt = await new Nuxt(config)

// Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build().catch(e => {
      console.error(e) // eslint-disable-line no-console
      process.exit(1)
    })
  }
    await useMiddleware(app)(MIDDLEWARE)

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()