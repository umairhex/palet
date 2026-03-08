<script setup lang="ts">
import { Star, ArrowRight } from 'lucide-vue-next'
import { getContrastColor, c } from './utils'

interface ColorSlot {
  hex: string
}

defineProps<{
  colors: ColorSlot[]
}>()
</script>

<template>
  <section class="flex flex-col items-center text-center space-y-8 pt-8 md:pt-12">
    <div
      class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border"
      :style="{
        backgroundColor: `${colors[c(2, colors)]?.hex}15`,
        borderColor: `${colors[c(2, colors)]?.hex}30`,
        color: colors[c(2, colors)]?.hex,
      }"
    >
      <Star class="size-3.5" />
      <span>New Features Announced</span>
    </div>

    <h1
      class="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 max-w-4xl leading-[1.1]"
    >
      Build interfaces that <br class="hidden md:block" />
      <span
        class="bg-clip-text text-transparent relative"
        :style="{
          backgroundImage: `linear-gradient(135deg, ${colors[c(0, colors)]?.hex}, ${colors[c(1, colors)]?.hex})`,
        }"
      >
        inspire trust
      </span>
    </h1>

    <p class="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
      The ultimate platform for modern engineering teams. Preview your beautiful color palettes in
      real-time with responsive UI components.
    </p>

    <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
      <button
        class="h-14 px-8 rounded-2xl font-bold text-base shadow-xl flex items-center gap-2 transition-transform hover:-translate-y-1"
        :style="{
          backgroundColor: colors[c(0, colors)]?.hex,
          color: getContrastColor(colors[c(0, colors)]?.hex),
        }"
      >
        Start Building Free
        <ArrowRight class="size-4" />
      </button>
      <button
        class="h-14 px-8 rounded-2xl font-bold text-base border-2 transition-all hover:bg-gray-50 flex items-center gap-2"
        :style="{
          borderColor: colors[c(1, colors)]?.hex,
          color: colors[c(1, colors)]?.hex,
        }"
      >
        View Documentation
      </button>
    </div>
  </section>
</template>
