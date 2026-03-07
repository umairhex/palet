<script setup lang="ts">
import { ref } from 'vue'
import HeroCard from './Hero/HeroCard.vue'
import HeroVisual from './Hero/HeroVisual.vue'

const activeTab = ref('Colours')
const tabs = ['Colours', 'Fonts', 'Workspace'] as const
</script>

<template>
  <section
    class="relative w-full min-h-[calc(100vh-80px)] flex items-center px-6 md:px-12 py-18 overflow-hidden"
  >
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full"
    >
      <div class="flex flex-col gap-6 md:gap-8 z-10">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-white"
        >
          Your personal design asset <span class="text-white/90">vault</span>
        </h1>

        <div class="flex flex-col gap-6">
          <div class="flex gap-8 border-b border-white/10 overflow-x-auto no-scrollbar pb-1">
            <button
              v-for="tab in tabs"
              :key="tab"
              @click="activeTab = tab"
              class="pb-3 text-base md:text-lg font-semibold transition-all relative whitespace-nowrap"
              :class="activeTab === tab ? 'text-white' : 'text-white/40'"
            >
              {{ tab }}
              <div
                v-if="activeTab === tab"
                class="absolute bottom-0 left-0 w-full h-[2px] bg-white transition-all duration-300"
              />
            </button>
          </div>

          <HeroCard :active-tab="activeTab" />
        </div>
      </div>

      <HeroVisual />
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
