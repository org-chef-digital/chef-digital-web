
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/Login-page.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../pages/Register-page.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/Home-page.vue')
    },
    {
      path: '/analysis',
      name: 'analysis',
      component:() => import('../pages/Analys-page.vue')
    }
  ],
})




export default router
