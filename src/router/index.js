import { createRouter, createWebHashHistory } from 'vue-router'
import NotFoundPage from '../views/NotFoundPage.vue'
import WikiPage from '../views/WikiPage.vue'

const routes = [
  {
    path: '/',
    name: 'index',
    component: WikiPage
  },
  {
    path: '/:path([\\w-/]+\\.md)',
    name: 'wiki-page-md',
    component: WikiPage,
  },
  {
    path: '/:path([\\w-/]+)',
    name: 'wiki-page',
    component: WikiPage,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      var header = document.querySelector('header')
      var offset = header?.classList?.contains('fixed-top') ? header.clientHeight : 0
      let element = document.querySelector(to.hash)
      window.scroll({ top: (element.offsetTop - offset), left: 0, behavior: 'auto' })
    }
    return false
  }
})

export default router
