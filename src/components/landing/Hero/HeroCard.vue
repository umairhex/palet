<script setup lang="ts">
import { computed } from 'vue'
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
    class="bg-background/85 rounded-3xl p-8 md:p-10 border border-white/5 shadow-2xl backdrop-blur-sm max-w-lg group"
  >
    <div class="flex items-center gap-3 mb-4">
      <div class="p-1.5 bg-white/10 rounded-lg">
        <component :is="config.icon" class="size-6 text-white" />
      </div>
      <h3 class="text-xl md:text-2xl font-semibold tracking-tight">
        {{ config.title }}
      </h3>
    </div>

    <p class="text-sm md:text-base text-white/70 leading-relaxed mb-8">
      {{ config.description }}
    </p>

    <div class="flex flex-wrap gap-4 items-center">
      <Button
        class="bg-emerald-accent hover:bg-emerald-accent-hover text-white rounded-full px-6 py-5 text-sm font-bold flex gap-2 shadow-lg shadow-emerald-accent/10"
      >
        {{ props.activeTab === 'Workspace' ? 'Go to Dashboard' : 'Start Building' }}
        <ArrowRight class="size-4" />
      </Button>
      <div class="flex flex-col gap-1.5 items-start">
        <button class="text-white/60 text-sm font-semibold flex items-center gap-2">
          View Features
          <ArrowRight class="size-4" />
        </button>
      </div>
    </div>
  </div>
</template>
