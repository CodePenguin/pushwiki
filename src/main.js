import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

if (process.env.VUE_APP_BUNDLE_TYPE !== 'slim') {
  require('highlightCSS')
  require('tailwindcss/dist/tailwind.min.css')
  require('@tailwindcss/typography/dist/typography.min.css')
}

createApp(App).use(router).mount('#app')
