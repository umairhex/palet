<script setup lang="ts">
import { ref } from 'vue'
import { X, Bookmark } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

defineProps<{
  isOpen: boolean
  colors: string[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', name: string): void
}>()

const paletteName = ref('')

const handleSave = () => {
  if (paletteName.value.trim()) {
    emit('save', paletteName.value.trim())
    paletteName.value = ''
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-70 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl space-y-8 animate-in zoom-in-95 duration-300"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-black tracking-tighter">Save Palette</h3>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400"
        >
          <X class="size-5" />
        </button>
      </div>

      <div class="space-y-6">
        <div class="flex gap-1.5 h-12">
          <div
            v-for="c in colors"
            :key="c"
            class="flex-1 rounded-xl shadow-sm border border-black/5"
            :style="{ backgroundColor: c }"
          ></div>
        </div>

        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
            Palette Name
          </p>
          <input
            v-model="paletteName"
            type="text"
            placeholder="e.g. Moonlight Dreams"
            autofocus
            class="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all"
            @keydown.enter="handleSave"
          />
        </div>

        <Button
          @click="handleSave"
          :disabled="!paletteName.trim()"
          class="w-full bg-primary hover:bg-primary-hover text-white rounded-2xl h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3 disabled:opacity-50"
        >
          <Bookmark class="size-5" />
          Save to Library
        </Button>
      </div>
    </div>
  </div>
</template>
