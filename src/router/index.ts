import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NotFoundPage from '../views/NotFoundPage.vue'
import SettingsPage from '../views/SettingsPage.vue'
import WikiPage from '../views/WikiPage.vue'

const PAGE_REGEX = '[\\w-/%]+'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: WikiPage
  },
  {
    path: '/pushwiki/settings',
    name: 'settings',
    component: SettingsPage
  },
  {
    path: '/:path(' + PAGE_REGEX + '\\.md)',
    name: 'wiki-page-md',
    component: WikiPage,
  },
  {
    path: '/:path(' + PAGE_REGEX + ')',
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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      const header = document.querySelector('header')
      if (header == null) return false
      const isHeaderSticky = getComputedStyle(header).position === 'sticky'
      const offset = isHeaderSticky ? header.clientHeight : 0
      const element = document.querySelector(to.hash) as HTMLElement
      if (element == null) return
      window.scroll({ top: (element.offsetTop - offset), left: 0, behavior: 'auto' })
    }
    return false
  }
})

export default router
