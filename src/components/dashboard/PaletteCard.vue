<script setup lang="ts">
import { ref } from 'vue'
import { Check, Copy, MoreHorizontal, Edit2, Trash2 } from 'lucide-vue-next'

interface Palette {
  id: number
  name: string
  colors: string[]
  updatedAt: string
  tags: string[]
}

defineProps<{
  palette: Palette
}>()

const copiedColor = ref<string | null>(null)

const copyToClipboard = (color: string) => {
  navigator.clipboard.writeText(color)
  copiedColor.value = color
  setTimeout(() => {
    copiedColor.value = null
  }, 2000)
}
</script>

<template>
  <div
    class="group bg-white border border-gray-200 rounded-[2.5rem] overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-500"
  >
    <div class="h-40 flex p-4 gap-2 bg-gray-50 relative">
      <div
        v-for="color in palette.colors"
        :key="color"
        class="flex-1 h-full rounded-2xl relative group/color flex items-center justify-center transition-all duration-300 hover:flex-[1.5] shadow-sm active:scale-95 cursor-pointer"
        :style="{ backgroundColor: color }"
        @click="copyToClipboard(color)"
      >
        <div
          class="absolute inset-x-0 bottom-0 p-2 opacity-0 group-hover/color:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm rounded-b-2xl"
        >
          <p class="text-[10px] font-black text-white text-center uppercase tracking-widest">
            {{ color }}
          </p>
        </div>
        <Check v-if="copiedColor === color" class="text-white size-6 drop-shadow-md" />
        <Copy
          v-else
          class="text-white opacity-0 group-hover/color:opacity-100 size-5 transition-opacity drop-shadow-md"
        />
      </div>
    </div>

    <div class="p-8">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h3
            class="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors cursor-pointer mb-1"
          >
            {{ palette.name }}
          </h3>
          <p class="text-xs text-gray-400 font-medium italic">Edited {{ palette.updatedAt }}</p>
        </div>
        <button
          class="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
        >
          <MoreHorizontal class="size-5" />
        </button>
      </div>

      <div class="flex items-center justify-between mt-auto">
        <div class="flex gap-2">
          <span
            v-for="tag in palette.tags"
            :key="tag"
            class="text-[9px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 px-2.5 py-1 rounded-lg"
          >
            {{ tag }}
          </span>
        </div>
        <div class="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            class="p-2.5 hover:bg-blue-50 hover:text-blue-500 text-gray-400 rounded-xl transition-all"
          >
            <Edit2 class="size-4" />
          </button>
          <button
            class="p-2.5 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-xl transition-all"
          >
            <Trash2 class="size-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
