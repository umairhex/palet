<script setup lang="ts">
const statistics = [
  {
    value: '92%',
    description:
      'reduction in time spent searching for hex codes and font files across scattered project folders.',
  },
  {
    value: 'Instant',
    description:
      'access to frequently used typefaces from any device through a centralized workspace.',
  },
  {
    value: 'Zero',
    description:
      'friction when starting new design projects with a pre-saved visual asset library.',
  },
]
</script>

<template>
  <section class="w-full bg-white py-32 px-6 md:px-12">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div
        v-for="(statistic, index) in statistics"
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
