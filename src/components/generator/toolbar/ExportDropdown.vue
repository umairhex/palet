<script setup lang="ts">
import { Download } from 'lucide-vue-next'

defineEmits<{
  (e: 'export', format: 'json' | 'css' | 'tailwind'): void
}>()

const formats = [
  { id: 'json', label: 'JSON' },
  { id: 'css', label: 'CSS Variables' },
  { id: 'tailwind', label: 'Tailwind Config' },
]
</script>

<template>
  <div class="relative group/export">
    <button
      class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
      title="Export palette"
    >
      <Download class="size-4" />
    </button>
    <div
      class="absolute right-0 bottom-full lg:top-full w-44 pt-3 pb-3 opacity-0 translate-y-2 pointer-events-none group-hover/export:opacity-100 group-hover/export:translate-y-0 group-hover/export:pointer-events-auto transition-all duration-300 z-50"
    >
      <div class="bg-white rounded-2xl border border-gray-100 shadow-2xl p-2 space-y-1">
        <button
          v-for="fmt in formats"
          :key="fmt.id"
          @click="$emit('export', fmt.id as 'json' | 'css' | 'tailwind')"
          class="w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all"
        >
          {{ fmt.label }}
        </button>
      </div>
    </div>
  </div>
</template>
