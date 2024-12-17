import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

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
      path: '/patrons/:documentId',
      name: 'patronsDetails',
      component: () => import('@/views/PatronDetail.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: {
        dontRequiresAuth: true
      }
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
    {
      path: '/suggestions',
      name: 'suggestions',
      component: () => import('@/views/suggestion/SuggestionView.vue')
    },
  ]
})

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const store = useUserStore()
  if (!to.meta.dontRequiresAuth && !store.isLoggedIn) {
    // Redirect to login if not logged in
    next('/login')
  } else {
    next() // Proceed to the route
  }
})
export default router
