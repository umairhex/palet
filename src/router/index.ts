import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import MainLayout from '../layouts/MainLayout.vue'
import type { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    description?: string
    image?: string
    keywords?: string[]
    noindex?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: 'Design Asset Vault for Colors & Typography',
          description:
            'A personal design asset vault for colors, palettes, and typography. Centralize scattered assets, sync across devices, and build stunning designs faster.',
          keywords: [
            'color palette generator',
            'design system',
            'typography manager',
            'color vault',
            'design tools',
            'asset management',
          ],
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Login',
      description: 'Sign in to your Palet account to access your design assets.',
      noindex: true,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta: {
      title: 'Sign Up',
      description: 'Create a new Palet account to start managing your design assets.',
      noindex: true,
    },
  },
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: 'generator',
        name: 'generator',
        component: () => import('../views/GeneratorView.vue'),
        meta: {
          title: 'Color Palette Generator',
          description:
            'Generate beautiful color palettes with our AI-powered color palette generator. Create harmonious color schemes instantly.',
          keywords: ['color generator', 'palette creator', 'color scheme', 'color harmony'],
        },
      },
      {
        path: 'palettes',
        name: 'color-library',
        component: () => import('../views/ColorLibraryView.vue'),
        meta: {
          title: 'Color Palette Library',
          description:
            'Browse and manage your saved color palettes. Organize, search, and export color combinations for your design projects.',
          keywords: ['color library', 'palette collection', 'saved palettes', 'color management'],
        },
      },
      {
        path: 'fonts',
        name: 'font-vault',
        component: () => import('../views/FontVaultView.vue'),
        meta: {
          title: 'Font Vault',
          description:
            'Upload, organize, and manage your custom typefaces. Preview font variations and build complete typography systems.',
          keywords: [
            'font library',
            'typography',
            'font management',
            'font vault',
            'typeface storage',
          ],
        },
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('../views/legal/PrivacyPolicyView.vue'),
        meta: {
          title: 'Privacy Policy',
          description: 'Read our privacy policy to understand how Palet handles your data.',
          noindex: false,
        },
      },
      {
        path: 'terms',
        name: 'terms',
        component: () => import('../views/legal/TermsView.vue'),
        meta: {
          title: 'Terms of Service',
          description: 'Review the terms and conditions for using Palet.',
          noindex: false,
        },
      },
      {
        path: 'cookies',
        name: 'cookies',
        component: () => import('../views/legal/CookiePolicyView.vue'),
        meta: {
          title: 'Cookie Policy',
          description: 'Learn about how Palet uses cookies and similar tracking technologies.',
          noindex: false,
        },
      },
    ],
  },
  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: () => import('../views/AuthCallbackView.vue'),
    meta: {
      noindex: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist.',
      noindex: true,
    },
  },
]

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
  routes,
})

export default router
