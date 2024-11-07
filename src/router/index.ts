import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menus',
      name: 'menu',
      component: () => import('../views/MenuView/MenuView.vue')
    },
    {
      path: '/menus/:menucode/:action',
      name: 'menuaction',
      component: () => import('@/views/MenuView/MenuDetails.vue'),
      meta: {
        title: 'Users',
      }
    },
    {
      path: '/plates',
      name: 'plate',
      component: () => import('../views/PlateView/PlateView.vue')
    },
    {
      path: '/products',
      name: 'product',
      component: () => import('../views/ProductView/ProductView.vue')
    }
  ]
})

export default router
