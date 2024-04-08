
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
      name: "home",
      component: () => import("../components/Login-page.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../components/Login-page.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../components/Registe-page.vue"),
    },
  ],
})




export default router
