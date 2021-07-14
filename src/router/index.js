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
  routes
})

export default router
