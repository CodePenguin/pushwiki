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
    }
  }
}