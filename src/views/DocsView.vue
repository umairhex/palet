<script setup lang="ts">
import { BookOpen, Palette, TypeIcon, Cloud, Zap } from 'lucide-vue-next'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const sections = [
  {
    title: 'Color Management',
    icon: Palette,
    items: [
      'Create custom palettes via hex codes or the visual color picker.',
      'Organize palettes by project or brand folder.',
      'One-click copy for CSS, SCSS, and Tailwind configurations.',
      'Dynamic preview of color combinations on UI mockups.',
    ],
  },
  {
    title: 'Personal Font Vault',
    icon: TypeIcon,
    items: [
      'Upload .ttf files directly from your local machine.',
      'Automatic generation of waterfall previews (12px to 72px).',
      'Browser-based testing of custom typefaces without local installation.',
      'Secure download access for your stored font assets.',
    ],
  },
  {
    title: 'Cloud & Persistence',
    icon: Cloud,
    items: [
      'Local-first storage: Your assets stay on your machine by default.',
      'Optional Cloud Sync: Sign in to sync assets across all your devices.',
      'Export your entire vault as a single JSON file for offline backups.',
      'Persistent sessions: Your workspace is exactly as you left it.',
    ],
  },
]
</script>

<template>
  <DashboardLayout>
    <div class="max-w-4xl mx-auto py-12 px-6">
      <div class="flex items-center gap-4 mb-12">
        <div class="p-3 bg-primary/10 rounded-2xl">
          <BookOpen class="size-8 text-primary" />
        </div>
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">Platform Documentation</h1>
          <p class="text-gray-500">Learn how to maximize your Palet workspace.</p>
        </div>
      </div>

      <div class="grid gap-12">
        <section v-for="section in sections" :key="section.title" class="space-y-6">
          <div class="flex items-center gap-3">
            <component :is="section.icon" class="size-6 text-gray-400" />
            <h2 class="text-xl font-bold tracking-tight text-gray-900">{{ section.title }}</h2>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="item in section.items"
              :key="item"
              class="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary/20 transition-colors"
            >
              <div class="flex gap-4">
                <div class="size-2 rounded-full bg-primary/40 mt-2 shrink-0"></div>
                <p class="text-sm text-gray-600 leading-relaxed">{{ item }}</p>
              </div>
            </div>
          </div>
        </section>

        <section
          class="bg-gray-900 rounded-[2.5rem] p-10 md:p-14 text-white overflow-hidden relative"
        >
          <div class="relative z-10 space-y-6">
            <div class="flex items-center gap-3">
              <Zap class="size-6 text-emerald-accent" />
              <h2 class="text-2xl font-bold tracking-tight">Pro Tip: Workflow Speed</h2>
            </div>
            <p class="text-white/60 text-lg max-w-2xl leading-relaxed">
              Use the
              <kbd
                class="px-2 py-1 bg-white/10 rounded border border-white/10 font-mono text-sm inline-block mx-1"
                >SPACE</kbd
              >
              key in the generator to rapidly explore random combinations, then lock the colors you
              love.
            </p>
          </div>
          <div
            class="absolute -right-20 -bottom-20 size-80 bg-primary/20 blur-[100px] rounded-full"
          ></div>
        </section>
      </div>

      <footer
        class="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400 uppercase tracking-widest font-bold"
      >
        <span>Palet Asset Vault Documentation</span>
        <span>Version 1.0.0</span>
      </footer>
    </div>
  </DashboardLayout>
</template>
