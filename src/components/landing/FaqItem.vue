<script setup lang="ts">
import { Plus, X } from 'lucide-vue-next'

defineProps<{
  question: string
  answer: string
  isOpen: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <div
    @click="$emit('toggle')"
    :class="[
      'rounded-xl cursor-pointer transition-all duration-300 border',
      isOpen
        ? 'bg-white border-subtle shadow-sm p-8'
        : 'bg-impact-card border-transparent px-8 py-6',
    ]"
  >
    <div class="flex justify-between items-center gap-4">
      <h3
        :class="[
          'text-xl font-bold tracking-tight transition-colors',
          isOpen ? 'text-foreground-muted' : 'text-foreground-lighter',
        ]"
      >
        {{ question }}
      </h3>
      <div class="shrink-0">
        <X v-if="isOpen" class="size-5 text-muted-foreground-subtle" />
        <Plus v-else class="size-6 text-muted-foreground-subtle" />
      </div>
    </div>

    <div v-if="isOpen" class="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <p class="text-muted-foreground leading-relaxed text-lg" v-html="answer"></p>
    </div>
  </div>
</template>
