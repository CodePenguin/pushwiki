import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'

if (process.env.VUE_APP_BUNDLE_TYPE !== 'slim') {
  require('highlightCSS')
}

createApp(App).use(router).mount('#app')
