<script setup lang="ts">
import { ref } from 'vue'

const palettes = [
  {
    name: 'Emerald Forest',
    colors: ['#0e231c', '#24b47e', '#f49a40', '#ffffff'],
    preview: {
      primary: 'bg-[#24b47e]',
      secondary: 'bg-[#f49a40]',
      bg: 'bg-[#0e231c]',
      border: 'border-white/10',
    },
  },
  {
    name: 'Nordic Sky',
    colors: ['#0f172a', '#3b82f6', '#f3f4f6', '#1d4ed8'],
    preview: {
      primary: 'bg-[#3b82f6]',
      secondary: 'bg-[#1d4ed8]',
      bg: 'bg-[#0f172a]',
      border: 'border-white/10',
    },
  },
  {
    name: 'Sunset Rose',
    colors: ['#1e1b4b', '#f43f5e', '#fbbf24', '#fdf2f8'],
    preview: {
      primary: 'bg-[#f43f5e]',
      secondary: 'bg-[#fbbf24]',
      bg: 'bg-[#1e1b4b]',
      border: 'border-[#f43f5e]/20',
    },
  },
  {
    name: 'Modern Crisp',
    colors: ['#ffffff', '#6366f1', '#1e293b', '#f8fafc'],
    preview: {
      primary: 'bg-[#6366f1]',
      secondary: 'bg-[#1e293b]',
      bg: 'bg-[#ffffff]',
      border: 'border-slate-200',
    },
  },
]

const activePalette = ref(palettes[0])

const selectPalette = (palette: (typeof palettes)[0]) => {
  activePalette.value = palette
}
</script>

<template>
  <section class="w-full bg-impact-card py-32 px-6 md:px-12 text-slate-900 overflow-hidden">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div class="space-y-12">
        <div class="space-y-6">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Build palettes that <br />
            <span class="text-emerald-600">actually work.</span>
          </h2>
          <p class="text-slate-500 text-lg md:text-xl leading-relaxed max-w-lg">
            Experiment with combinations instantly. See how your colors transform a real component
            before you commit a single line of code.
          </p>
        </div>

        <!-- Palette Selector -->
        <div class="flex flex-col gap-6">
          <h4 class="text-sm font-bold uppercase tracking-[0.3em] text-slate-400">
            Saved Palettes
          </h4>
          <div class="flex flex-wrap gap-4">
            <button
              v-for="palette in palettes"
              :key="palette.name"
              @click="selectPalette(palette)"
              :class="[
                'p-4 rounded-3xl border transition-all duration-500 group relative',
                activePalette?.name === palette.name
                  ? 'bg-slate-50 border-slate-200 scale-105 shadow-2xl shadow-emerald-500/10'
                  : 'bg-transparent border-slate-100 hover:bg-slate-50',
              ]"
            >
              <div class="flex gap-2">
                <div
                  v-for="color in palette.colors.slice(0, 3)"
                  :key="color"
                  class="size-8 rounded-full border border-black/5"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
              <span
                class="mt-3 block text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors"
              >
                {{ palette.name }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Live Mockup UI -->
      <div
        v-if="activePalette"
        :class="[
          'rounded-[3rem] p-12 md:p-16 border transition-all duration-700 shadow-2xl relative group',
          activePalette.preview.bg,
          activePalette.preview.border,
        ]"
      >
        <div
          :class="[
            'absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] rounded-[3rem]',
          ]"
        ></div>

        <div class="relative space-y-8">
          <div class="flex items-center justify-between">
            <div class="flex gap-2">
              <div class="size-3 rounded-full bg-red-400"></div>
              <div class="size-3 rounded-full bg-yellow-400"></div>
              <div class="size-3 rounded-full bg-green-400"></div>
            </div>
          </div>

          <div class="space-y-4">
            <div
              :class="[
                'w-1/2 h-4 rounded-full opacity-20 transition-all duration-500',
                activePalette.preview.primary,
              ]"
            ></div>
            <h3
              :class="[
                'text-3xl md:text-5xl font-black leading-tight transition-all duration-500',
                activePalette.name === 'Modern Crisp' ? 'text-slate-900' : 'text-white',
              ]"
            >
              Designing with <br />
              purpose.
            </h3>
            <p
              :class="[
                'text-lg opacity-40 max-w-sm transition-all duration-500',
                activePalette.name === 'Modern Crisp' ? 'text-slate-700' : 'text-white',
              ]"
            >
              Visual asset management is the key primitives of brand identity.
            </p>
          </div>

          <div class="flex gap-4 pt-4">
            <div
              :class="[
                'px-8 py-4 rounded-full font-black text-sm transition-all duration-500 text-white shadow-xl',
                activePalette.preview.primary,
              ]"
            >
              Action
            </div>
            <div
              :class="[
                'px-8 py-4 rounded-full font-black text-sm border transition-all duration-500',
                activePalette.name === 'Modern Crisp'
                  ? 'border-slate-200 text-slate-800'
                  : 'border-white/10 text-white opacity-40',
              ]"
            >
              Cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
