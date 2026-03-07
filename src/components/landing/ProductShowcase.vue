<script setup lang="ts">
import { Layout, Palette, Type } from 'lucide-vue-next'
import ProductCard, { type ProductProps } from './ProductCard.vue'

const products: ProductProps[] = [
  {
    variant: 'hero',
    badge: { text: 'Unified Workspace', icon: Layout, colorClass: 'bg-emerald-500' },
    title:
      'A Personal Design Asset Vault for <br class="hidden md:block" /> Your Colors and Typography',
    description:
      'Centralize scattered assets into a single organized workspace. A permanent visual reference library that removes friction from starting new work.',
    features: ['Persistent Cloud Storage', 'Accessible Across Devices'],
    image: {
      src: 'https://images.unsplash.com/photo-1643485839726-c9d4fac1c9bd?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Workspace Dashboard',
      transformClass: '-skew-x-1 -rotate-1',
    },
    gradientFrom: '#f0f9f4',
    gradientTo: '#f2f8f5',
    borderColor: 'border-emerald-500/10',
    primaryBtn: {
      text: 'Enter Vault',
      colorClass: 'bg-emerald-500',
      shadowClass: 'shadow-lg shadow-emerald-500/20',
    },
    secondaryBtn: true,
  },
  {
    variant: 'side',
    badge: { text: 'Palette Library', icon: Palette, colorClass: 'bg-blue-500' },
    title: 'Create & Store Multiple <br /> Project Color Systems',
    description:
      'Add colors using hex or visual selection. Organize palettes by brand and copy codes instantly for development.',
    features: ['Hex, RGB & Visual Selection', 'Quick combination previews'],
    image: {
      src: 'https://images.unsplash.com/photo-1695634365014-7debec896789?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Color Grid',
      transformClass: 'skew-y-2 translate-y-4',
    },
    gradientFrom: '#f0f4f9',
    gradientTo: '#edf2f7',
    borderColor: 'border-blue-500/10',
    primaryBtn: {
      text: 'Browse Palettes',
      colorClass: 'bg-blue-500',
      shadowClass: 'shadow-lg shadow-blue-500/20',
    },
    secondaryBtn: true,
  },
  {
    variant: 'side',
    badge: { text: 'Personalized Font Vault', icon: Type, colorClass: 'bg-purple-500' },
    title: 'Upload & Preview Your <br /> Favorite Typefaces',
    description:
      'Upload .ttf files directly. Maintain a personal library of frequently used fonts with automatic visual previews.',
    features: ['Automatic inner preview', 'Secure .ttf file storage'],
    image: {
      src: 'https://images.unsplash.com/photo-1609605348579-3123e3d40eb8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Typography Layout',
      transformClass: '-skew-y-2 translate-y-4',
    },
    gradientFrom: '#f5f0f9',
    gradientTo: '#f0e8f5',
    borderColor: 'border-purple-500/10',
    primaryBtn: {
      text: 'Manage Fonts',
      colorClass: 'bg-purple-500',
      shadowClass: 'shadow-lg shadow-purple-500/20',
    },
    secondaryBtn: true,
  },
]
</script>

<template>
  <section class="w-full bg-white pt-16 pb-32 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-800 leading-tight">
        Simple tools for <span class="text-[rgb(99,102,241)]">beautiful</span> workflows.
      </h2>

      <div class="space-y-8">
        <ProductCard v-if="products[0]" v-bind="products[0]" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductCard
            v-for="(product, index) in products.slice(1)"
            :key="index"
            v-bind="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* No additional scoped styles needed as Tailwind handles everything through props */
</style>
