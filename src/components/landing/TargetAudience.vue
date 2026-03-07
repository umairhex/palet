<script setup lang="ts">
import { TARGET_AUDIENCES } from '../../constants/landing'
</script>

<template>
  <section class="w-full bg-white py-32 px-6 md:px-12">
    <div
      class="max-w-7xl mx-auto bg-background rounded-[2.5rem] p-16 md:p-32 flex flex-col items-center text-center shadow-2xl relative z-10"
    >
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-20 tracking-tight">
        Palet is built for <span class="text-emerald-accent">you.</span>
      </h2>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 w-full max-w-5xl">
        <div
          v-for="audience in TARGET_AUDIENCES"
          :key="audience.label"
          class="flex flex-col items-center gap-4"
        >
          <component :is="audience.icon" class="size-16 md:size-24 text-white stroke-[1.2]" />
          <span class="text-sm md:text-base font-medium text-white tracking-tight">
            {{ audience.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
