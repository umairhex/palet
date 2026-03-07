<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { LANDING_RESOURCES } from '../../constants/landing'
</script>

<template>
  <section class="w-full bg-background py-32 px-6 md:px-12 text-white">
    <div class="max-w-7xl mx-auto flex flex-col items-center">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-24 max-w-3xl leading-tight">
        Resources to help you flow, grow & make progress.
      </h2>

      <div class="flex flex-col gap-32 w-full">
        <div
          v-for="(resource, index) in LANDING_RESOURCES"
          :key="index"
          class="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center"
        >
          <div
            :class="[
              'rounded-3xl overflow-hidden bg-white/5 border border-white/10 aspect-video',
              index % 2 === 0 ? '' : 'order-1 md:order-2',
            ]"
          >
            <img
              :src="resource.imageSrc"
              :alt="resource.imageAlt"
              class="w-full h-full object-cover opacity-80"
            />
          </div>
          <div
            :class="[
              'flex flex-col items-start gap-6',
              index % 2 === 0 ? '' : 'order-2 md:order-1',
            ]"
          >
            <span
              :class="[
                'px-3 py-1 rounded text-xs font-bold uppercase tracking-wider',
                resource.badgeClass,
              ]"
            >
              {{ resource.badge }}
            </span>
            <h3 class="text-3xl md:text-4xl font-bold leading-tight">
              {{ resource.title }}
            </h3>
            <p class="text-white/60 text-lg leading-relaxed max-w-md">
              {{ resource.description }}
            </p>
            <button
              class="flex items-center gap-2 border border-white/20 rounded-full px-8 py-4 font-bold text-sm transition-all hover:bg-white/5"
            >
              {{ resource.buttonText }} <ArrowRight class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
