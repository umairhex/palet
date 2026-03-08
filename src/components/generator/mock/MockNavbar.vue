<script setup lang="ts">
import { Zap } from 'lucide-vue-next'
import { getContrastColor, c } from './utils'

interface ColorSlot {
  hex: string
}

defineProps<{
  colors: ColorSlot[]
}>()
</script>

<template>
  <nav
    class="flex items-center justify-between p-4 bg-white rounded-3xl border border-gray-100 shadow-sm transition-transform"
  >
    <div class="flex items-center gap-3 px-2">
      <div
        class="size-8 rounded-xl flex items-center justify-center shrink-0"
        :style="{ backgroundColor: colors[c(0, colors)]?.hex }"
      >
        <Zap class="size-4" :style="{ color: getContrastColor(colors[c(0, colors)]?.hex) }" />
      </div>
      <span class="font-extrabold text-gray-900 tracking-tight text-lg">PaletCorp</span>
    </div>
    <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
      <a href="#" class="hover:text-gray-900 transition-colors">Products</a>
      <a href="#" class="hover:text-gray-900 transition-colors">Solutions</a>
      <a href="#" class="hover:text-gray-900 transition-colors">Pricing</a>
    </div>
    <div class="flex items-center gap-3">
      <button
        class="hidden sm:block px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
      >
        Log in
      </button>
      <button
        class="px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-transform hover:scale-105"
        :style="{
          backgroundColor: colors[c(1, colors)]?.hex,
          color: getContrastColor(colors[c(1, colors)]?.hex),
        }"
      >
        Get Started
      </button>
    </div>
  </nav>
</template>
