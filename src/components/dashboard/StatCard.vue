<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  name: string
  value: string
  icon: Component
  colorClass: string
}>()
</script>

<template>
  <div
    class="bg-white border border-gray-200 p-6 rounded-4xl hover:border-primary/30 transition-all duration-300 group"
  >
    <div class="flex items-center justify-between mb-5">
      <div
        :class="[
          'p-3 rounded-2xl bg-gray-50 group-hover:bg-white transition-colors duration-300',
          colorClass,
        ]"
      >
        <component :is="icon" class="size-6" />
      </div>
      <span class="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">This month</span>
    </div>
    <div class="space-y-1">
      <h4 class="text-3xl font-black text-gray-900 group-hover:text-primary transition-colors">
        {{ value }}
      </h4>
      <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">{{ name }}</p>
    </div>
  </div>
</template>
