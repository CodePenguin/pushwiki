const path = require('path')

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    optimization: {
      splitChunks: false
    },
    output: {
      filename: 'pushwiki.js',
      chunkFilename: 'pushwiki.js'
    },
    resolve: {
      alias: {
        bootstrapCSS: path.resolve(__dirname, './node_modules/bootswatch/dist/' + process.env.BOOTSWATCH_THEME + '/bootstrap.min.css'),
        highlightCSS: path.resolve(__dirname, './node_modules/highlight.js/styles/' + process.env.HIGHLIGHTJS_STYLE + '.css'),
      }
    }
  }
}