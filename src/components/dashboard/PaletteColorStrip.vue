<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next'
import { useClipboard } from '../../composables/useClipboard'
import { getContrastColor } from '../../utils/color/accessibility'

interface Props {
  colors: string[]
  height?: string
}

withDefaults(defineProps<Props>(), {
  height: 'h-36 sm:h-44',
})

const { copy, isCopied } = useClipboard()

const handleCopy = (color: string) => {
  copy(color, `Copied ${color}`)
}
</script>

<template>
  <div :class="['color-strip flex gap-2 p-3 bg-gray-50', height]">
    <div
      v-for="color in colors"
      :key="color"
      class="color-swatch flex-1 rounded-2xl relative group/color flex items-end justify-center overflow-hidden transition-all duration-300 hover:flex-[1.4] cursor-pointer active:scale-95 shadow-sm"
      :style="{ backgroundColor: color }"
      @click="handleCopy(color)"
    >
      <div
        class="color-label absolute inset-x-0 bottom-0 pb-2 pt-4 flex flex-col items-center opacity-0 group-hover/color:opacity-100 transition-opacity"
        :style="{
          background: `linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent)`,
        }"
      >
        <p
          class="text-[9px] font-black uppercase tracking-widest leading-none truncate px-1 w-full text-center"
          :style="{ color: getContrastColor(color) }"
        >
          {{ color }}
        </p>
      </div>

      <div class="absolute inset-0 flex items-center justify-center">
        <Check
          v-if="isCopied(color)"
          class="size-5 transition-all"
          :style="{ color: getContrastColor(color) }"
        />
        <Copy
          v-else
          class="opacity-0 group-hover/color:opacity-100 size-4 transition-opacity"
          :style="{ color: getContrastColor(color) }"
        />
      </div>
    </div>
  </div>
</template>
