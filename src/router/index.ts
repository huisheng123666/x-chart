import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/index.vue'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/g-map',
      component: () => import('@/components/guozi/g-map.vue')
    },
    {
      path: '/min',
      component: () => import('@/views/min/min.vue')
    },
    {
      path: '/ct',
      component: () => import('@/views/ct/ct.vue')
    },
    {
      path: '/ct/min',
      component: () => import('@/views/ct/min.vue')
    },
    {
      path: '/test',
      component: () => import('@/views/test.vue')
    }
  ]
})

router.beforeEach((to, form, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
