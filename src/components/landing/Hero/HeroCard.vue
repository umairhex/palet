<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'
import Button from '../../ui/Button.vue'
import { HERO_FEATURE_CONFIG } from '../../../constants/landing'

const props = defineProps<{
  activeTab: string
}>()

const config = computed(
  () => HERO_FEATURE_CONFIG[props.activeTab as keyof typeof HERO_FEATURE_CONFIG],
)
</script>

<template>
  <div
    class="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 max-w-lg group shadow-lg shadow-gray-100/50"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="p-1.5 bg-primary/10 rounded-lg">
        <component :is="config.icon" class="size-6 text-primary" />
      </div>
      <h3 class="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
        {{ config.title }}
      </h3>
    </div>

    <p class="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
      {{ config.description }}
    </p>

    <div class="flex flex-wrap gap-4 items-center">
      <RouterLink to="/generator">
        <Button
          class="bg-primary hover:bg-primary-hover text-white rounded-full px-6 py-5 text-sm font-bold flex gap-2"
        >
          {{ props.activeTab === 'Workspace' ? 'Go to Dashboard' : 'Start Building' }}
          <ArrowRight class="size-4" />
        </Button>
      </RouterLink>
      <div class="flex flex-col gap-1.5 items-start">
        <a
          href="#features"
          class="text-gray-600 text-sm font-semibold flex items-center gap-2 hover:text-gray-900 transition-colors"
        >
          View Features
          <ArrowRight class="size-4" />
        </a>
      </div>
    </div>
  </div>
</template>
