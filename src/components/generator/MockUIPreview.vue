<script setup lang="ts">
import { X } from 'lucide-vue-next'
import MockNavbar from './mock/MockNavbar.vue'
import MockHero from './mock/MockHero.vue'
import MockStats from './mock/MockStats.vue'
import MockFeature from './mock/MockFeature.vue'
import MockCTA from './mock/MockCTA.vue'

interface ColorSlot {
  hex: string
  isLocked: boolean
}

defineProps<{
  colors: ColorSlot[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-100 bg-[#F9FAFB] flex flex-col overflow-y-auto animate-in fade-in duration-500 custom-scrollbar"
  >
    <button
      @click="emit('close')"
      class="fixed top-6 right-6 z-110 size-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:scale-110 transition-transform"
    >
      <X class="size-6" />
    </button>

    <div class="max-w-6xl mx-auto w-full p-6 md:p-10 space-y-16 lg:space-y-24">
      <MockNavbar :colors="colors" />
      <MockHero :colors="colors" />
      <MockStats :colors="colors" />
      <MockFeature :colors="colors" />
      <MockCTA :colors="colors" />
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
