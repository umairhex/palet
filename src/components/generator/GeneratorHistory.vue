<script setup lang="ts">
import { History } from 'lucide-vue-next'

defineProps<{
  recentSessions: string[][]
  isHistoryOpen: boolean
}>()

defineEmits<{
  (e: 'restore', palette: string[]): void
}>()
</script>

<template>
  <div
    v-if="isHistoryOpen"
    class="w-64 bg-white rounded-4xl border border-gray-100 flex flex-col overflow-hidden shadow-sm animate-in slide-in-from-left duration-300"
  >
    <div class="p-6 border-b border-gray-100 flex items-center justify-between">
      <h3 class="text-xs font-black uppercase tracking-widest text-gray-400">Recent Sessions</h3>
      <History class="size-4 text-gray-300" />
    </div>
    <div class="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
      <div
        v-for="(p, i) in recentSessions"
        :key="i"
        @click="$emit('restore', p)"
        class="group cursor-pointer space-y-2 p-2 hover:bg-gray-50 rounded-2xl transition-all"
      >
        <div class="flex h-8 rounded-lg overflow-hidden border border-gray-100">
          <div v-for="c in p" :key="c" class="flex-1" :style="{ backgroundColor: c }"></div>
        </div>
        <div class="flex items-center justify-between px-1">
          <span class="text-[8px] font-bold text-gray-400 uppercase tracking-tighter"
            >{{ p.length }} Colors</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
</style>
