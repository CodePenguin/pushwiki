module.exports = {
  publicPath: '',
  css: {
    extract: false
  },
  configureWebpack: {
    externals:
      process.env.VUE_APP_BUNDLE_TYPE === 'slim'
        ? {
            axios: 'axios',
            'core-js': 'core-js',
            dompurify: 'DOMPurify',
            'highlight.js/lib/common': 'hljs',
            marked: 'marked',
            vue: 'Vue',
            'vue-router': 'VueRouter'
          }
        : {},
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'pushwiki.js',
      chunkFilename: 'pushwiki.js'
    },
    resolve: {
      alias: {
        'highlight.js/lib/common': process.env.VUE_APP_BUNDLE_TYPE === 'core' ? 'highlight.js/lib/core' : 'highlight.js/lib/common'
      }
    }
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].minify = false
      args[0].title = 'PushWiki'
      args[0].xhtml = true
      return args
    })
  }
}
