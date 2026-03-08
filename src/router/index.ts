import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'generator',
          name: 'generator',
          component: () => import('../views/GeneratorView.vue'),
        },
        {
          path: 'palettes',
          name: 'color-library',
          component: () => import('../views/ColorLibraryView.vue'),
        },
        {
          path: 'fonts',
          name: 'font-vault',
          component: () => import('../views/FontVaultView.vue'),
        },
        {
          path: 'privacy',
          name: 'privacy',
          component: () => import('../views/legal/PrivacyPolicyView.vue'),
        },
        {
          path: 'terms',
          name: 'terms',
          component: () => import('../views/legal/TermsView.vue'),
        },
        {
          path: 'cookies',
          name: 'cookies',
          component: () => import('../views/legal/CookiePolicyView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
