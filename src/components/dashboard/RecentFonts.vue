<script setup lang="ts">
import { ChevronRight, TypeIcon } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

const recentFonts = [
  {
    id: 1,
    name: 'Inter',
    type: 'Sans Serif',
    previewText: 'The quick brown fox jumps over the lazy dog',
    updatedAt: '1 hour ago',
  },
  {
    id: 2,
    name: 'Outfit',
    type: 'Sans Serif',
    previewText: 'A better way to build interfaces',
    updatedAt: '3 hours ago',
  },
]
</script>

<template>
  <div class="space-y-6 text-gray-900">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-black flex items-center gap-3">
        <div class="p-2 rounded-lg bg-emerald-accent/10 text-emerald-accent">
          <TypeIcon class="size-5" />
        </div>
        Recent Fonts
      </h3>
      <button
        class="text-xs font-black uppercase tracking-widest text-emerald-accent hover:opacity-70 transition-opacity flex items-center gap-1"
      >
        Browse <ChevronRight class="size-4" />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="font in recentFonts"
        :key="font.id"
        class="bg-white border border-gray-200 p-4 rounded-3xl hover:shadow-2xl hover:shadow-gray-200/60 hover:border-emerald-accent/30 transition-all duration-300 group"
      >
        <div class="flex items-center justify-between mb-5">
          <div>
            <h4 class="font-black text-gray-900 group-hover:text-emerald-accent transition-colors">
              {{ font.name }}
            </h4>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              {{ font.type }}
            </p>
          </div>
          <span
            class="text-[10px] bg-emerald-accent/10 text-emerald-accent px-3 py-1.5 rounded-full font-black uppercase tracking-tighter"
            >Active</span
          >
        </div>

        <div
          class="p-4 bg-gray-50 rounded-2xl mb-4 group-hover:bg-emerald-accent/2 transition-colors"
        >
          <p class="text-xs leading-relaxed" :style="{ fontFamily: font.name }">
            {{ font.previewText }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-[10px] text-gray-400 font-medium italic">Added {{ font.updatedAt }}</p>
          <Button
            size="sm"
            variant="ghost"
            class="text-xs font-bold h-9 hover:bg-emerald-accent/10 hover:text-emerald-accent text-gray-500 rounded-xl"
          >
            Preview
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
