<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

const error = ref<Error | null>(null)
const info = ref<string | null>(null)

function reloadPage() {
  globalThis.location.reload()
}

onErrorCaptured((err, instance, i) => {
  error.value = err as Error
  info.value = i

  return false
})
</script>

<template>
  <div v-if="error" class="h-screen flex items-center justify-center bg-background text-white p-6">
    <div class="max-w-lg text-center space-y-4">
      <h1 class="text-2xl font-bold text-primary">Something went wrong</h1>
      <p class="text-base text-muted-foreground-subtle">{{ error.message }}</p>
      <button
        @click="reloadPage"
        class="mt-4 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold shadow-lg shadow-primary/20 transition-all"
      >
        Reload page
      </button>
    </div>
  </div>
  <slot v-else />
</template>
