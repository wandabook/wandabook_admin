import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/patrons',
      name: 'patrons',
      component: () => import('@/views/PatronsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UserView.vue')
    }, {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingView.vue')
    },
  ]
})

export default router
