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
        highlightCSS: path.resolve(__dirname, './node_modules/highlight.js/styles/' + process.env.HIGHLIGHTJS_STYLE + '.css'),
      }
    }
  }
}