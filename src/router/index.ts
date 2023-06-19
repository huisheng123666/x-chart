import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'
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
      path: '/tgf',
      name: 'tgf',
      component: () => import('@/views/tgf/tgf.vue')
    },
    {
      path: '/tgf/kanban',
      name: 'tgf-kanban',
      component: () => import('@/views/tgf-kanban/tgf-kanban.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/admin.vue'),
      children: [
        {
          path: "kanban",
          component: () => import('@/views/admin/kanban.vue')
        }
      ]
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
