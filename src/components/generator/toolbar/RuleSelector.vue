<script setup lang="ts">
import { ChevronDown, Check } from 'lucide-vue-next'

defineProps<{
  selectedRule: string
}>()

defineEmits<{
  (e: 'update:rule', rule: string): void
}>()

const rules = [
  {
    id: 'random',
    label: 'Pure Random',
    desc: 'Generate completely random colors with no relation.',
  },
  {
    id: 'analogous',
    label: 'Analogous',
    desc: 'Colors adjacent on the color wheel for harmony.',
  },
  {
    id: 'complementary',
    label: 'Complementary',
    desc: 'Opposite colors creating high contrast.',
  },
  {
    id: 'triadic',
    label: 'Triadic',
    desc: 'Three evenly spaced colors for balanced palettes.',
  },
  {
    id: 'split-complementary',
    label: 'Split-Comp',
    desc: 'Base color plus two adjacent to its complement.',
  },
  {
    id: 'tetradic',
    label: 'Tetradic',
    desc: 'Four colors forming two complementary pairs.',
  },
  {
    id: 'scale',
    label: 'Visual Scale',
    desc: 'Colors spaced evenly across the hue spectrum.',
  },
]
</script>

<template>
  <div class="relative group/rule">
    <button
      class="h-9 px-4 bg-white border border-gray-100/50 rounded-xl text-[10px] font-semibold uppercase tracking-[0.2em] transition-all hover:border-gray-200 flex items-center gap-3 min-w-35 justify-between shadow-sm"
    >
      <span class="truncate">{{ selectedRule.replace('-', ' ') }}</span>
      <ChevronDown class="size-3 text-gray-400 transition-transform group-hover/rule:rotate-180" />
    </button>

    <div
      class="absolute left-0 top-full pt-3 w-56 opacity-0 translate-y-2 pointer-events-none group-hover/rule:opacity-100 group-hover/rule:translate-y-0 group-hover/rule:pointer-events-auto transition-all duration-300 z-50"
    >
      <div class="bg-white rounded-3xl border border-gray-100 shadow-2xl p-2 space-y-1">
        <button
          v-for="rule in rules"
          :key="rule.id"
          @click="$emit('update:rule', rule.id)"
          :class="[
            selectedRule === rule.id
              ? 'bg-gray-900 text-white shadow-xl'
              : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
            'w-full text-left px-4 py-2 rounded-xl text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 flex flex-col justify-between',
          ]"
        >
          <span class="flex items-center justify-between w-full">
            <span>{{ rule.label }}</span>
            <Check v-if="selectedRule === rule.id" class="size-3" />
          </span>
          <span
            class="mt-1 text-[7px] font-normal tracking-[0.15em] text-muted-foreground-subtle normal-case"
          >
            {{ rule.desc }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
