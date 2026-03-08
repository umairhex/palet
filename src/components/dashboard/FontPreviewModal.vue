<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { X, Minus, Plus } from 'lucide-vue-next'
import { type FontAsset } from '../../composables/useFonts'
import { sanitizeCSSString } from '@/lib/utils'
import FontWaterfall from '../font-vault/FontWaterfall.vue'

const props = defineProps<{
  font: FontAsset | null
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const previewText = ref('The quick brown fox jumps over the lazy dog')
const fontSize = ref(72)

const sizeSamples = [12, 18, 24, 36, 48, 72, 96]

watch(
  () => props.font,
  (newFont) => {
    if (newFont) previewText.value = newFont.previewText
  },
  { immediate: true },
)

const previewStyle = computed(() => ({
  fontFamily: `'${sanitizeCSSString(props.font?.name ?? '')}', sans-serif`,
  fontSize: `${fontSize.value}px`,
  lineHeight: fontSize.value > 60 ? '1.05' : '1.4',
}))

const stepSize = (delta: number) => {
  fontSize.value = Math.min(120, Math.max(12, fontSize.value + delta))
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen && font" class="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      <div
        class="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-gray-100 shrink-0"
      >
        <div class="flex items-center gap-4 min-w-0">
          <div class="min-w-0">
            <h2
              class="text-xl sm:text-2xl font-black text-gray-900 truncate leading-none"
              :style="{ fontFamily: `'${sanitizeCSSString(font.name)}', sans-serif` }"
            >
              {{ font.name }}
            </h2>
            <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400 mt-1">
              {{ font.category }}&ensp;·&ensp;{{ font.weight
              }}<template v-if="font.size">&ensp;·&ensp;{{ font.size }}</template>
            </p>
          </div>
        </div>

        <button
          @click="$emit('close')"
          class="shrink-0 h-10 w-10 flex items-center justify-center rounded-2xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700 ml-4"
        >
          <X class="size-5" />
        </button>
      </div>

      <div class="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div
          class="shrink-0 w-full lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-gray-100 p-6 sm:p-8 flex flex-col gap-7 overflow-y-auto"
        >
          <div>
            <label
              class="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 mb-2.5 block"
            >
              Preview Text
            </label>
            <textarea
              v-model="previewText"
              rows="3"
              class="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 resize-none transition-all"
              placeholder="Type something…"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-2.5">
              <label class="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                Size
              </label>
              <span class="text-sm font-black text-gray-900 tabular-nums"
                >{{ fontSize }}<span class="text-gray-400 font-medium text-xs">px</span></span
              >
            </div>

            <div class="flex items-center gap-2 mb-3">
              <button
                @click="stepSize(-4)"
                class="h-8 w-8 shrink-0 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
              >
                <Minus class="size-3.5" />
              </button>
              <input
                v-model.number="fontSize"
                type="range"
                min="12"
                max="120"
                class="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary"
              />
              <button
                @click="stepSize(4)"
                class="h-8 w-8 shrink-0 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors text-gray-500"
              >
                <Plus class="size-3.5" />
              </button>
            </div>

            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="s in sizeSamples"
                :key="s"
                @click="fontSize = s"
                class="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
                :class="
                  fontSize === s
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                "
              >
                {{ s }}
              </button>
            </div>
          </div>

          <div class="mt-auto grid grid-cols-2 gap-2.5">
            <div class="bg-gray-50 rounded-2xl p-3.5">
              <p class="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">
                Category
              </p>
              <p class="text-sm font-bold text-gray-800 truncate">{{ font.category }}</p>
            </div>
            <div class="bg-gray-50 rounded-2xl p-3.5">
              <p class="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">
                Weight
              </p>
              <p class="text-sm font-bold text-gray-800 truncate">{{ font.weight }}</p>
            </div>
            <div class="bg-gray-50 rounded-2xl p-3.5">
              <p class="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">
                File size
              </p>
              <p class="text-sm font-bold text-gray-800">{{ font.size || '—' }}</p>
            </div>
            <div class="bg-gray-50 rounded-2xl p-3.5">
              <p class="text-[9px] font-black uppercase tracking-[0.15em] text-gray-400 mb-1">
                Uploaded
              </p>
              <p class="text-sm font-bold text-gray-800">
                {{
                  new Date(font.uploadedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                  })
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex-1 flex flex-col overflow-hidden bg-[#fafafa]">
          <div
            class="flex-1 flex items-center justify-center overflow-auto p-8 sm:p-14 relative"
            style="
              background-image: linear-gradient(rgba(0, 0, 0, 0.04) 1px, transparent 1px);
              background-size: 100% 1.5rem;
            "
          >
            <div
              class="absolute left-8 right-8 sm:left-14 sm:right-14 top-1/2 border-t border-primary/20 pointer-events-none"
            />

            <p
              class="relative text-gray-900 text-center wrap-break-word max-w-full transition-all duration-150 select-none"
              :style="previewStyle"
            >
              {{ previewText || 'Type something…' }}
            </p>
          </div>

          <FontWaterfall :font-name="font.name" :preview-text="previewText" />
        </div>
      </div>
    </div>
  </Transition>
</template>
