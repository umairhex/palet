<script setup lang="ts">
import { Lock, Unlock, Copy, Check, CircleAlert, Wand2 } from 'lucide-vue-next'
import { ref, computed } from 'vue'
import namer from 'color-namer'
import ColorSlotVariations from './ColorSlotVariations.vue'

import { useClipboard } from '../../composables/useClipboard'

interface ColorSlotType {
  hex: string
  isLocked: boolean
}

interface ContrastBadge {
  score: string
  pass: boolean
}

const props = defineProps<{
  color: ColorSlotType
  index: number
  total: number
  contrastColor: string
  contrastBadge: ContrastBadge
}>()

const showTools = ref(false)
const { copy, isCopied } = useClipboard()

defineEmits<{
  (e: 'toggleLock', index: number): void
  (e: 'update:hex', hex: string): void
}>()

const colorName = computed(() => {
  try {
    const names = namer(props.color.hex, { pick: ['ntc', 'pantone'] })
    return names.ntc[0]?.name || names.pantone[0]?.name || 'Unknown'
  } catch {
    return 'Unknown'
  }
})
</script>

<template>
  <div
    class="flex-1 relative group flex lg:flex-col items-center justify-center transition-all duration-700 rounded-3xl lg:rounded-4xl border border-white/5 overflow-hidden min-h-17.5 lg:min-h-0"
    :style="{ backgroundColor: color.hex }"
  >
    <div
      class="absolute inset-0 opacity-10 bg-white group-active:opacity-20 transition-opacity"
      v-if="showTools"
    ></div>

    <div
      class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      :class="{ 'opacity-0 pointer-events-none': showTools }"
    >
      <div
        class="flex lg:flex-col items-center gap-2 lg:gap-3 bg-white/15 backdrop-blur-2xl p-2 lg:p-3 rounded-4xl border border-white/20 shadow-2xl scale-95 group-hover:scale-100 transition-transform duration-500"
      >
        <button
          @click="$emit('toggleLock', index)"
          class="p-2.5 lg:p-4 rounded-full transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
          :style="{ color: contrastColor }"
        >
          <Unlock v-if="!color.isLocked" class="size-4 lg:size-6" />
          <Lock v-else class="size-4 lg:size-6" />
        </button>

        <div class="w-px h-4 bg-white/10 lg:w-4 lg:h-px hidden lg:block"></div>

        <button
          @click="copy(color.hex)"
          class="p-2.5 lg:p-4 rounded-full transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
          :style="{ color: contrastColor }"
        >
          <Check v-if="isCopied(color.hex)" class="size-4 lg:size-6 text-green-400" />
          <Copy v-else class="size-4 lg:size-6" />
        </button>

        <div class="w-px h-4 bg-white/10 lg:w-4 lg:h-px hidden lg:block"></div>

        <button
          @click="showTools = true"
          class="p-2.5 lg:p-4 rounded-full transition-all hover:bg-white/20 hover:scale-110 active:scale-95"
          :style="{ color: contrastColor }"
        >
          <Wand2 class="size-4 lg:size-6" />
        </button>
      </div>
    </div>

    <ColorSlotVariations
      v-if="showTools"
      :hex="color.hex"
      @update:hex="$emit('update:hex', $event)"
      @close="showTools = false"
    />

    <div
      class="absolute bottom-20 lg:bottom-32 left-0 right-0 text-center select-none z-0 px-4 transition-all duration-500 flex flex-col items-center gap-1 lg:gap-2"
      :style="{ color: contrastColor }"
    >
      <span
        class="text-[9px] lg:text-[11px] font-bold tracking-[0.2em] uppercase opacity-60 transition-opacity group-hover:opacity-100"
      >
        {{ colorName }}
      </span>

      <div class="relative inline-block group/hex">
        <h3
          class="text-sm lg:text-3xl font-black tracking-widest lg:tracking-tighter cursor-pointer hover:bg-white/10 px-3 py-1 rounded-2xl transition-all"
        >
          {{ color.hex }}
        </h3>
        <input
          type="color"
          :value="color.hex"
          @input="$emit('update:hex', ($event.target as HTMLInputElement).value)"
          class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-95"
    >
      <div
        v-if="color.isLocked"
        @click.stop="$emit('toggleLock', index)"
        class="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/10 backdrop-blur-xl border border-white/10 shadow-lg cursor-pointer hover:bg-black/20 transition-all group/lock"
        :style="{ color: contrastColor }"
      >
        <Lock class="size-4 group-hover/lock:scale-110 transition-transform" />
        <span class="text-[10px] font-black uppercase tracking-widest hidden sm:block">Locked</span>
      </div>
    </Transition>

    <div
      class="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"
      :class="{ 'opacity-0 pointer-events-none': showTools }"
    >
      <div
        class="px-4 py-2 rounded-2xl flex items-center gap-2 backdrop-blur-xl border border-white/20 shadow-xl text-center"
        :style="{ backgroundColor: color.hex + '40', color: contrastColor }"
      >
        <span class="text-[8px] font-black uppercase tracking-widest opacity-60">WCAG</span>
        <div class="w-px h-3 bg-white/20"></div>
        <div class="flex items-center gap-1.5">
          <Check v-if="contrastBadge.pass" class="size-3 text-green-400" />
          <CircleAlert v-else class="size-3 text-red-400 shadow-sm" />
          <span class="text-sm font-black tracking-tighter leading-none">{{
            contrastBadge.score
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
