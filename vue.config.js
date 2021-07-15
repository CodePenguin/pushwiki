const path = require('path')

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    externals: process.env.VUE_APP_BUNDLE_TYPE === 'slim' ? {
      axios: 'axios',
      bootstrap: 'bootstrap',
      bootswatch: 'bootswatch',
      'core-js': 'core-js',
      dompurify: 'DOMPurify',
      'highlight.js': 'hljs',
      marked: 'marked',
      vue: 'Vue',
      'vue-router': 'VueRouter'
    } : {},
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'pushwiki.js',
      chunkFilename: 'pushwiki.js'
    },
    resolve: {
      alias: {
        bootstrapCSS$: path.resolve(__dirname, './node_modules/bootswatch/dist/' + process.env.VUE_APP_BOOTSWATCH_THEME + '/bootstrap.min.css'),
        highlightCSS$: path.resolve(__dirname, './node_modules/highlight.js/styles/' + process.env.VUE_APP_HIGHLIGHTJS_STYLE + '.css'),
        highlightJS$: process.env.VUE_APP_HIGHLIGHTJS_LIB !== 'all' ? path.resolve(__dirname, './node_modules/highlight.js/lib/' + process.env.VUE_APP_HIGHLIGHTJS_LIB) : 'highlight.js'
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'PushWiki'
        if (process.env.VUE_APP_BUNDLE_TYPE === 'slim') {
          args[0].template = args[0].template.replace('.html', '.slim.html')
        }
        return args
      })

    config
      .plugin('copy')
      .tap(([options])=> {
        options[0].ignore.push('index.slim.html')
        return [options]
      })
  }
}