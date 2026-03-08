<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'

defineProps<{
  numColors: number
}>()

defineEmits<{
  (e: 'update:numColors', delta: number): void
}>()
</script>

<template>
  <div class="flex items-center px-1">
    <button
      @click="$emit('update:numColors', -1)"
      class="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"
    >
      <Minus class="size-4" />
    </button>
    <span class="w-8 text-center text-xs font-semibold text-gray-900">{{ numColors }}</span>
    <button
      @click="$emit('update:numColors', 1)"
      class="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"
    >
      <Plus class="size-4" />
    </button>
  </div>
</template>
