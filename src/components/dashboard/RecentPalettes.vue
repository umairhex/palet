<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, PaintBucket, Copy, Check } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { usePalettes, formatTimeAgo } from '../../composables/usePalettes'

import { useClipboard } from '../../composables/useClipboard'

const router = useRouter()
const { palettes } = usePalettes()
const { copy, isCopied } = useClipboard()

const recentPalettes = computed(() =>
  [...palettes.value]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 3),
)

const copyToClipboard = (hex: string) => {
  copy(hex, `Copied ${hex}`)
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
        @click="router.push('/palettes')"
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
              <Check v-if="isCopied(color)" class="size-3.5 text-green-500" />
              <Copy v-else class="size-3.5" />
            </button>
          </div>
        </div>

        <div class="p-6 flex items-center justify-between">
          <div>
            <h4 class="font-black text-gray-900 group-hover:text-primary transition-colors">
              {{ palette.name }}
            </h4>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
              Updated {{ formatTimeAgo(palette.updatedAt) }}
            </p>
          </div>
          <button
            @click="router.push('/palettes')"
            class="size-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-300"
          >
            <ChevronRight class="size-5" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="recentPalettes.length === 0" class="py-12 text-center">
      <div class="size-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <PaintBucket class="size-7 text-gray-300" />
      </div>
      <p class="text-sm font-bold text-gray-400 mb-1">No palettes yet</p>
      <p class="text-xs text-gray-300">Create one from the Generator or Color Library.</p>
    </div>
  </div>
</template>
