<script setup lang="ts">
import { Undo2, Redo2 } from 'lucide-vue-next'

defineProps<{
  historyIndex: number
  historyLength: number
}>()

defineEmits<{
  (e: 'undo'): void
  (e: 'redo'): void
}>()
</script>

<template>
  <div
    class="flex items-center gap-1 bg-gray-50 rounded-xl border border-gray-100 p-1 shrink-0 h-11"
  >
    <button
      @click="$emit('undo')"
      :disabled="historyIndex <= 0"
      class="p-2 lg:p-2.5 hover:text-primary disabled:opacity-20 transition-all rounded-lg hover:bg-white"
      title="Undo (Ctrl+Z)"
    >
      <Undo2 class="size-4" />
    </button>
    <button
      @click="$emit('redo')"
      :disabled="historyIndex >= historyLength - 1"
      class="p-2 lg:p-2.5 hover:text-primary disabled:opacity-20 transition-all rounded-lg hover:bg-white"
      title="Redo (Ctrl+Shift+Z)"
    >
      <Redo2 class="size-4" />
    </button>
  </div>
</template>
