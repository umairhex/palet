<script setup lang="ts">
import { ref } from 'vue'
import MockupPreview from './MockupPreview.vue'
import { INTERACTIVE_PALETTES } from '../../constants/landing'

const activePalette = ref(INTERACTIVE_PALETTES[0])

const selectPalette = (palette: (typeof INTERACTIVE_PALETTES)[0]) => {
  activePalette.value = palette
}
</script>

<template>
  <section
    id="colors"
    class="w-full bg-impact-card py-32 px-6 md:px-12 text-foreground overflow-hidden"
  >
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div class="space-y-12">
        <div class="space-y-6">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Build palettes that <br />
            <span class="text-emerald-accent-hover">actually work.</span>
          </h2>
          <p class="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-lg">
            Experiment with combinations instantly. See how your colors transform a real component
            before you commit a single line of code.
          </p>
        </div>

        <div class="flex flex-col gap-6">
          <h4 class="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground-subtle">
            Saved Palettes
          </h4>
          <div class="flex flex-wrap gap-4">
            <button
              v-for="palette in INTERACTIVE_PALETTES"
              :key="palette.name"
              @click="selectPalette(palette)"
              :class="[
                'p-4 rounded-3xl border transition-all duration-500 group relative',
                activePalette?.name === palette.name
                  ? 'bg-background-muted border-subtle scale-105'
                  : 'bg-transparent border-lighter hover:bg-background-muted',
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
                class="mt-3 block text-xs font-bold uppercase tracking-widest text-muted-foreground-subtle group-hover:text-foreground transition-colors"
              >
                {{ palette.name }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <MockupPreview v-if="activePalette" :palette="activePalette" />
    </div>
  </section>
</template>
