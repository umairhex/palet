<script setup lang="ts">
import { Type, Upload, Search } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

defineProps<{
  isNoResults?: boolean
  isDragOver?: boolean
}>()

const emit = defineEmits<{
  (e: 'upload'): void
}>()
</script>

<template>
  <div
    v-if="!isNoResults"
    class="border-2 border-dashed rounded-3xl p-12 text-center transition-all"
    :class="
      isDragOver
        ? 'border-primary bg-primary/5 scale-[1.01] shadow-lg shadow-primary/10'
        : 'border-gray-200 hover:border-gray-300'
    "
  >
    <div class="size-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
      <Type class="size-8 text-gray-300" />
    </div>
    <h3 class="text-lg font-black text-gray-900 mb-1">No fonts yet</h3>
    <p class="text-sm text-gray-400 max-w-xs mx-auto mb-6">
      Upload your first font file (.ttf, .otf, .woff, .woff2) or drag and drop here.
    </p>
    <Button
      @click="emit('upload')"
      class="bg-primary hover:bg-primary-hover text-white rounded-2xl px-6 h-11 font-bold shadow-lg shadow-primary/20 gap-2 mx-auto"
    >
      <Upload class="size-4" />
      Upload Font
    </Button>
  </div>

  <div v-else class="flex flex-col items-center justify-center py-20 text-center">
    <div class="size-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-5">
      <Search class="size-8 text-gray-300" />
    </div>
    <h3 class="text-lg font-black text-gray-900 mb-1">No fonts found</h3>
    <p class="text-sm text-gray-400 max-w-xs">Try adjusting your search or category filter.</p>
  </div>
</template>
