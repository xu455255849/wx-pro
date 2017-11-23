module.exports = {
  head: {
    title: 'loading',
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: '鲜流微信商店' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'static/favicon.ico' }
    ],
    script: [
      { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' }
    ]
  },
  css: [
    {
      src: 'static/sass/base.sass',
      lang: 'sass?indentedSyntax=true'
    },
    {
      src: 'swiper/dist/css/swiper.css'
    },
    {
      src: 'vue-js-modal/dist/ssr.index'
    }
  ],
 plugins: [
   { src: '~plugins/swiper.js', ssr: false },
   { src: '~plugins/flexible.js', ssr: false },
   { src: '~plugins/vue-js-modal', ssr: false }
  ],
  build: {
  loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  },
  loading: { color: '#50f433' },
  performance: {
    prefetch: false
  }
}
