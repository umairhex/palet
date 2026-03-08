<script setup lang="ts">
import { ChevronRight, PaintBucket, Copy } from 'lucide-vue-next'

const recentPalettes = [
  {
    id: 1,
    name: 'Emerald Forest',
    colors: ['#0f2a22', '#1a2e26', '#10b981', '#4ade80', '#f4f7f2'],
    updatedAt: '2 hours ago',
  },
  {
    id: 2,
    name: 'Sunset Glow',
    colors: ['#0b0f14', '#f49a40', '#fbbf24', '#f97316', '#f87171'],
    updatedAt: '5 hours ago',
  },
  {
    id: 3,
    name: 'Deep Sea',
    colors: ['#0f172a', '#1e293b', '#3b82f6', '#818cf8', '#a855f7'],
    updatedAt: '1 day ago',
  },
]

const copyToClipboard = (hex: string) => {
  navigator.clipboard.writeText(hex)
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-black text-gray-900 flex items-center gap-3">
        <div class="p-2 rounded-lg bg-primary/10 text-primary">
          <PaintBucket class="size-5" />
        </div>
        Recent Palettes
      </h3>
      <button
        class="text-xs font-black uppercase tracking-widest text-primary hover:opacity-70 transition-opacity flex items-center gap-1"
      >
        View All <ChevronRight class="size-4" />
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="palette in recentPalettes"
        :key="palette.id"
        class="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-primary/30 transition-all duration-500"
      >
        <div class="flex h-24 p-2.5 gap-1.5 bg-gray-50/50">
          <div
            v-for="color in palette.colors"
            :key="color"
            class="flex-1 h-full first:rounded-l-3xl last:rounded-r-3xl relative group/color flex items-center justify-center transition-all hover:flex-[1.5]"
            :style="{ backgroundColor: color }"
          >
            <button
              @click="copyToClipboard(color)"
              class="opacity-0 group-hover/color:opacity-100 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-gray-900 shadow-lg transform scale-50 group-hover/color:scale-100 transition-all duration-300"
              title="Copy Hex"
            >
              <Copy class="size-3.5" />
            </button>
          </div>
        </div>

        <div class="p-6 flex items-center justify-between">
          <div>
            <h4 class="font-black text-gray-900 group-hover:text-primary transition-colors">
              {{ palette.name }}
            </h4>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Updated {{ palette.updatedAt }}
            </p>
          </div>
          <button
            class="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <ChevronRight class="size-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
