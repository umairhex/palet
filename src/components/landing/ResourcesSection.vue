<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section class="w-full bg-background py-32 px-6 md:px-12 text-white">
    <div class="max-w-7xl mx-auto flex flex-col items-center">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-24 max-w-3xl leading-tight">
        Resources to help you flow, grow & make progress.
      </h2>

      <div class="flex flex-col gap-32 w-full">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div class="rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-video">
            <img
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop"
              alt="Color Palettes"
              class="w-full h-full object-cover opacity-80"
            />
          </div>
          <div class="flex flex-col items-start gap-6">
            <span
              class="px-3 py-1 rounded bg-emerald-accent/20 text-emerald-accent text-xs font-bold uppercase tracking-wider"
            >
              Color Palettes
            </span>
            <h3 class="text-3xl md:text-4xl font-bold leading-tight">
              Build palettes that look like the best brands in the business.
            </h3>
            <p class="text-white/60 text-lg leading-relaxed max-w-md">
              Choose from a huge library of curated, conversion-focussed color combinations to build
              stunning designs faster.
            </p>
            <button
              class="flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 font-bold text-sm transition-all hover:bg-white/5"
            >
              Browse Color Palettes <ArrowRight class="size-4" />
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div class="flex flex-col items-start gap-6 order-2 md:order-1">
            <span
              class="px-3 py-1 rounded bg-[#6366f1]/20 text-[#818cf8] text-xs font-bold uppercase tracking-wider"
            >
              Typography Library
            </span>
            <h3 class="text-3xl md:text-4xl font-bold leading-tight">
              Create font systems that users can't wait to read.
            </h3>
            <p class="text-white/60 text-lg leading-relaxed max-w-md">
              Get started faster with gorgeous, pre-curated font pairings, ready to export straight
              to your design tool.
            </p>
            <button
              class="flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 font-bold text-sm transition-all hover:bg-white/5"
            >
              Browse Typography <ArrowRight class="size-4" />
            </button>
          </div>
          <div
            class="rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-video order-1 md:order-2"
          >
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop"
              alt="Typography Systems"
              class="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
