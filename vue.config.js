const path = require('path')
const fs = require('fs')
const UglifyJS = require("uglify-js")

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
      'highlightJS': 'hljs',
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
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.done.tap('InlinePlugin', (compilation) => {
            //Combine HTML and JS into a single deployment file
            fs.copyFileSync(path.resolve(__dirname, './dist/index.html'), path.resolve(__dirname, './dist/pushwiki.html'))
            const scriptContents = fs.readFileSync(path.resolve(__dirname, './dist/pushwiki.js'), 'utf8')
            const outputScriptContents = UglifyJS.minify(scriptContents).code.replace(/\$/g, '$$$$')
            const htmlContents = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf8')
            const contents = htmlContents
              .replace('<link href="/pushwiki.js" rel="preload" as="script">', '')
              .replace('<script type="text/javascript" src="/pushwiki.js"></script>', '')
              .replace('<!-- built files will be auto injected -->', '<script type="text/javascript">\n      ' + outputScriptContents + '\n    </script>')
            fs.writeFileSync(path.resolve(__dirname, './dist/index.html'), contents)
          })
        }
      }
    ],
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