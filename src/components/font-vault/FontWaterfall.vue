<script setup lang="ts">
interface Props {
  fontName: string
  previewText: string
  sizes?: number[]
}

withDefaults(defineProps<Props>(), {
  sizes: () => [10, 14, 20, 32, 48],
})
</script>

<template>
  <div class="shrink-0 border-t border-gray-100 bg-white px-8 sm:px-14 py-6 overflow-x-auto">
    <p class="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-4">Waterfall</p>
    <div class="space-y-1.5 min-w-max">
      <div v-for="s in sizes" :key="s" class="flex items-baseline gap-4">
        <span class="text-[9px] font-black text-gray-300 w-8 shrink-0 tabular-nums">{{ s }}px</span>
        <span
          class="text-gray-800 truncate"
          :style="{ fontFamily: `'${fontName}', sans-serif`, fontSize: `${s}px` }"
        >
          {{ previewText || 'The quick brown fox' }}
        </span>
      </div>
    </div>
  </div>
</template>
