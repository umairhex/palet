<script setup lang="ts">
import { Check, Glasses } from 'lucide-vue-next'

defineProps<{
  selectedSimulation: string
}>()

defineEmits<{
  (e: 'setSimulation', sim: string): void
}>()

const simulations = [
  { id: 'none', label: 'None', desc: 'No color‑blindness simulation.' },
  { id: 'protanopia', label: 'Protanopia', desc: 'Red‑weak vision filter.' },
  {
    id: 'deuteranopia',
    label: 'Deuteranopia',
    desc: 'Green‑weak vision filter.',
  },
  { id: 'tritanopia', label: 'Tritanopia', desc: 'Blue‑weak vision filter.' },
  {
    id: 'achromatopsia',
    label: 'Achromatopsia',
    desc: 'Greyscale (no color) vision.',
  },
]
</script>

<template>
  <div class="relative group/sim">
    <button
      class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
    >
      <Glasses class="size-4" />
    </button>
    <div
      class="absolute right-0 bottom-full lg:top-full w-56 pt-4 pb-4 opacity-0 translate-y-2 pointer-events-none group-hover/sim:opacity-100 group-hover/sim:translate-y-0 group-hover/sim:pointer-events-auto transition-all duration-300 z-50"
    >
      <div class="bg-white rounded-3xl border border-gray-100 shadow-2xl p-2 space-y-1">
        <button
          v-for="sim in simulations"
          :key="sim.id"
          @click="$emit('setSimulation', sim.id)"
          :class="[
            selectedSimulation === sim.id
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
            'w-full text-left px-4 py-2 rounded-xl text-[9px] font-semibold uppercase tracking-[0.2em] transition-all flex flex-col justify-between',
          ]"
        >
          <span class="flex items-center justify-between w-full">
            <span>{{ sim.label }}</span>
            <Check v-if="selectedSimulation === sim.id" class="size-3" />
          </span>
          <span
            class="mt-1 text-[7px] font-normal tracking-[0.15em] text-muted-foreground-subtle normal-case"
          >
            {{ sim.desc }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
