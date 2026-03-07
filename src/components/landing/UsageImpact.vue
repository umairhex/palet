<script setup lang="ts">
import { USAGE_STATISTICS } from '../../constants/landing'
</script>

<template>
  <section class="w-full bg-white py-32 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        v-for="(statistic, index) in USAGE_STATISTICS"
        :key="index"
        class="bg-impact-card rounded-3xl p-12"
      >
        <div class="flex items-baseline gap-3 mb-8">
          <span class="text-6xl font-medium text-foreground-muted tracking-tighter">
            {{ statistic.value }}
          </span>
        </div>

        <p class="text-lg text-foreground-subtle leading-relaxed">
          <span class="text-foreground-muted font-bold">
            {{ statistic.description.split(' ')[0] }}
            {{ statistic.description.split(' ')[1] }}
          </span>
          {{ statistic.description.split(' ').slice(2).join(' ') }}
        </p>
      </div>
    </div>
  </section>
</template>
