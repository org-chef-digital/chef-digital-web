
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
      path: "/",
      name: "login",
      component: () => import("../components/Login-page.vue"),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register-page.vue')
    },
    {
      path: "/home",
      name: "home",
      component:() => import("../components/Home-page.vue"),
    },
  ],
})




export default router
