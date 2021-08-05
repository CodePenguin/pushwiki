import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

if (process.env.VUE_APP_BUNDLE_TYPE !== 'slim') {
  require('highlightCSS')
  require('./tailwind.css')
}

createApp(App).use(router).mount('#app')
