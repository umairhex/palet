<script setup lang="ts">
import { BarChart, Users, Activity } from 'lucide-vue-next'
import { getContrastColor, c } from './utils'

interface ColorSlot {
  hex: string
}

defineProps<{
  colors: ColorSlot[]
}>()
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
    <div
      class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"
        :style="{ backgroundColor: colors[c(2, colors)]?.hex }"
      ></div>
      <div
        class="size-12 rounded-2xl flex items-center justify-center relative z-10"
        :style="{
          backgroundColor: colors[c(2, colors)]?.hex,
          color: getContrastColor(colors[c(2, colors)]?.hex),
        }"
      >
        <BarChart class="size-6" />
      </div>
      <div class="space-y-1 relative z-10">
        <h4 class="text-gray-500 font-semibold text-sm">Total Revenue</h4>
        <p class="text-3xl font-black text-gray-900">$2.4M</p>
      </div>
    </div>

    <div
      class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"
        :style="{ backgroundColor: colors[c(3, colors)]?.hex }"
      ></div>
      <div
        class="size-12 rounded-2xl flex items-center justify-center relative z-10"
        :style="{
          backgroundColor: colors[c(3, colors)]?.hex,
          color: getContrastColor(colors[c(3, colors)]?.hex),
        }"
      >
        <Users class="size-6" />
      </div>
      <div class="space-y-1 relative z-10">
        <h4 class="text-gray-500 font-semibold text-sm">Active Users</h4>
        <p class="text-3xl font-black text-gray-900">84.5k</p>
      </div>
    </div>

    <div
      class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"
        :style="{ backgroundColor: colors[c(4, colors)]?.hex || colors[c(1, colors)]?.hex }"
      ></div>
      <div
        class="size-12 rounded-2xl flex items-center justify-center relative z-10"
        :style="{
          backgroundColor: colors[c(4, colors)]?.hex || colors[c(1, colors)]?.hex,
          color: getContrastColor(colors[c(4, colors)]?.hex || colors[c(1, colors)]?.hex),
        }"
      >
        <Activity class="size-6" />
      </div>
      <div class="space-y-1 relative z-10">
        <h4 class="text-gray-500 font-semibold text-sm">System Health</h4>
        <p class="text-3xl font-black text-gray-900">99.9%</p>
      </div>
    </div>
  </section>
</template>
