<script setup lang="ts">
import { getContrastColor, c } from './utils'

interface ColorSlot {
  hex: string
}

defineProps<{
  colors: ColorSlot[]
}>()
</script>

<template>
  <section
    class="rounded-[3rem] p-12 text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
    :style="{
      backgroundColor: colors[c(0, colors)]?.hex,
      color: getContrastColor(colors[c(0, colors)]?.hex),
    }"
  >
    <div class="absolute inset-0 bg-black/10"></div>
    <div class="relative z-10 max-w-2xl space-y-6">
      <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
        Ready to deploy your next big idea?
      </h2>
      <p class="opacity-80 font-medium text-lg max-w-lg mx-auto">
        Join thousands of developers building fast, beautiful, and accessible web experiences today.
      </p>
      <div class="pt-4">
        <button
          class="px-8 py-4 rounded-2xl font-black transition-transform hover:scale-105 shadow-xl"
          :style="{
            backgroundColor: getContrastColor(colors[c(0, colors)]?.hex),
            color: colors[c(0, colors)]?.hex,
          }"
        >
          Sign Up For Free
        </button>
      </div>
    </div>
  </section>
</template>
