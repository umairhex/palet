<script setup lang="ts">
import { computed } from 'vue'
import { ChevronRight, TypeIcon } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import Button from '../ui/Button.vue'
import { useFonts } from '../../composables/useFonts'
import { sanitizeCSSString } from '@/lib/utils'
import { formatTimeAgo } from '../../composables/usePalettes'

const router = useRouter()
const { fonts } = useFonts()

const recentFonts = computed(() =>
  [...fonts.value]
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
    .slice(0, 2),
)
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
        @click="router.push('/fonts')"
        class="text-xs font-black uppercase tracking-widest text-emerald-accent hover:opacity-70 transition-opacity flex items-center gap-1"
      >
        Browse <ChevronRight class="size-4" />
      </button>
    </div>

    <div v-if="recentFonts.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              {{ font.category }}
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
          <p class="text-xs leading-relaxed" :style="{ fontFamily: sanitizeCSSString(font.name) }">
            {{ font.previewText }}
          </p>
        </div>

        <div class="flex items-center justify-between">
          <p class="text-[10px] text-gray-400 font-medium italic">
            Added {{ formatTimeAgo(font.addedAt) }}
          </p>
          <Button
            size="sm"
            variant="ghost"
            @click="router.push('/fonts')"
            class="text-xs font-bold h-9 hover:bg-emerald-accent/10 hover:text-emerald-accent text-gray-500 rounded-xl"
          >
            Preview
          </Button>
        </div>
      </div>
    </div>

    <div v-else class="py-12 text-center">
      <div class="size-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <TypeIcon class="size-7 text-gray-300" />
      </div>
      <p class="text-sm font-bold text-gray-400 mb-1">No fonts uploaded</p>
      <p class="text-xs text-gray-300">Upload fonts from the Font Vault.</p>
    </div>
  </div>
</template>
