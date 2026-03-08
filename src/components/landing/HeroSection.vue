<script setup lang="ts">
import { ref } from 'vue'
import HeroCard from './Hero/HeroCard.vue'
import HeroVisual from './Hero/HeroVisual.vue'
import { HERO_TABS } from '../../constants/landing'

const activeTab = ref<string>(HERO_TABS[0])
</script>

<template>
  <section
    id="vault"
    class="relative w-full min-h-[calc(100vh-60px)] flex items-center px-6 md:px-12 py-18 overflow-hidden bg-[#f5f5f5]"
  >
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full"
    >
      <div class="flex flex-col gap-6 md:gap-8 z-10">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900"
        >
          Your personal design asset <span class="text-gray-600">vault</span>
        </h1>

        <div class="flex flex-col gap-6">
          <div class="flex gap-8 border-b border-gray-200 overflow-x-auto no-scrollbar pb-1">
            <button
              v-for="tab in HERO_TABS"
              :key="tab"
              @click="activeTab = tab"
              class="pb-3 text-base md:text-lg font-semibold transition-all relative whitespace-nowrap"
              :class="activeTab === tab ? 'text-gray-900' : 'text-gray-400'"
            >
              {{ tab }}
              <div
                v-if="activeTab === tab"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-gray-900 transition-all duration-300"
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
