/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path')
const fs = require('fs')
const UglifyJS = require('uglify-js')

module.exports = {
  indexPath: 'pushwiki.html',
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
    plugins: [
      {
        apply: (compiler) => {
          if (process.env.NODE_ENV !== 'production') return
          compiler.hooks.done.tap('InlinePlugin', () => {
            //Combine HTML and JS into a single deployment file
            fs.copyFileSync(path.resolve(__dirname, './dist/pushwiki.html'), path.resolve(__dirname, './dist/index.html'))
            const scriptContents = fs.readFileSync(path.resolve(__dirname, './dist/pushwiki.js'), 'utf8')
            const outputScriptContents = UglifyJS.minify(scriptContents).code.replace(/\$/g, '$$$$')
            const htmlContents = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf8')
            const contents = htmlContents
              .replace('<link href="pushwiki.js" rel="preload" as="script">', '')
              .replace(' src="pushwiki.js"></script>', '>' + outputScriptContents + '</script>')
            fs.writeFileSync(path.resolve(__dirname, './dist/index.html'), contents)
          })
        }
      }
    ]
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'PushWiki'
      return args
    })
  }
}
