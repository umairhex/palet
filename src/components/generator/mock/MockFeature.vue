<script setup lang="ts">
import { Check, ShieldCheck } from 'lucide-vue-next'
import { getContrastColor, c } from './utils'

interface ColorSlot {
  hex: string
}

defineProps<{
  colors: ColorSlot[]
}>()
</script>

<template>
  <section
    class="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col lg:flex-row"
  >
    <div class="p-10 lg:p-14 lg:w-1/2 space-y-8 flex flex-col justify-center">
      <h2 class="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
        Design at the speed of thought.
      </h2>
      <p class="text-gray-500 leading-relaxed font-medium text-lg">
        Every component is crafted carefully to map directly to your brand's unique color palette
        identity automatically.
      </p>

      <ul class="space-y-4 pt-2">
        <li class="flex items-center gap-3" v-for="i in 3" :key="i">
          <div
            class="size-6 rounded-full flex items-center justify-center shrink-0"
            :style="{
              backgroundColor: colors[c(1, colors)]?.hex,
              color: getContrastColor(colors[c(1, colors)]?.hex),
            }"
          >
            <Check class="size-3" />
          </div>
          <span class="font-bold text-gray-700">
            {{
              i === 1
                ? 'Automated contrast checking'
                : i === 2
                  ? 'Accessible by default'
                  : 'Perfect color harmony scales'
            }}
          </span>
        </li>
      </ul>
    </div>

    <div class="lg:w-1/2 bg-gray-50 border-l border-gray-100 p-8 flex items-center justify-center">
      <div class="w-full max-w-sm space-y-4">
        <div
          class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
        >
          <div class="flex items-center gap-3">
            <div
              class="size-10 rounded-xl"
              :style="{ backgroundColor: colors[c(2, colors)]?.hex }"
            ></div>
            <div>
              <div class="h-3 w-24 bg-gray-200 rounded-full mb-1"></div>
              <div class="h-2 w-16 bg-gray-100 rounded-full"></div>
            </div>
          </div>
          <div class="flex gap-2">
            <div
              class="h-2 flex-1 rounded-full opacity-40"
              :style="{ backgroundColor: colors[c(0, colors)]?.hex }"
            ></div>
            <div
              class="h-2 flex-1 rounded-full opacity-40"
              :style="{ backgroundColor: colors[c(1, colors)]?.hex }"
            ></div>
            <div
              class="h-2 flex-1 rounded-full opacity-40"
              :style="{ backgroundColor: colors[c(2, colors)]?.hex }"
            ></div>
          </div>
        </div>

        <div
          class="p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold"
          :style="{
            backgroundColor: `${colors[c(1, colors)]?.hex}15`,
            color: colors[c(1, colors)]?.hex,
          }"
        >
          <ShieldCheck class="size-5 shrink-0" />
          Your settings have been saved to the cloud successfully.
        </div>

        <div
          class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between"
        >
          <div class="font-bold text-gray-700">Dark Mode</div>
          <div
            class="w-12 h-6 rounded-full relative transition-colors duration-300"
            :style="{ backgroundColor: colors[c(0, colors)]?.hex }"
          >
            <div class="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
