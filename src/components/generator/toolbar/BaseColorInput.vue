<script setup lang="ts">
import { ref, watch } from 'vue'
import { Check } from 'lucide-vue-next'

const props = defineProps<{
  baseColor: string
}>()

const emit = defineEmits<{
  (e: 'importPalette', hex: string): void
}>()

const baseInput = ref(props.baseColor.replace('#', ''))
const isValidHex = ref(true)

watch(
  () => props.baseColor,
  (newColor) => {
    if (newColor.replace('#', '') !== baseInput.value) {
      baseInput.value = newColor.replace('#', '')
    }
  },
)

const handleBaseInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value
  const clean = val.replace('#', '').toUpperCase()
  baseInput.value = clean

  isValidHex.value = /^[0-9A-F]{3}$|^[0-9A-F]{6}$/i.test(clean)

  if (isValidHex.value && (clean.length === 3 || clean.length === 6)) {
    emit('importPalette', '#' + clean)
  }
}

const getContrastColor = (hex: string) => {
  if (!hex.startsWith('#')) hex = '#' + hex
  if (hex.length === 4) {
    hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3]
  }
  const r = parseInt(hex.slice(1, 3), 16) || 0
  const g = parseInt(hex.slice(3, 5), 16) || 0
  const b = parseInt(hex.slice(5, 7), 16) || 0
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}
</script>

<template>
  <div
    :class="[
      'flex items-center bg-gray-50 border rounded-2xl overflow-hidden shadow-sm h-12 transition-all hover:bg-white hover:shadow-md w-full max-w-45 sm:w-45',
      isValidHex ? 'border-gray-100' : 'border-red-400 ring-2 ring-red-50',
    ]"
  >
    <div class="relative w-12 h-full border-r border-gray-100 group">
      <div
        class="absolute inset-0 transition-transform group-hover:scale-110"
        :style="{ backgroundColor: '#' + baseInput.replace('#', '') }"
      ></div>
      <input
        type="color"
        :value="'#' + (baseInput.replace('#', '') || 'FFFFFF')"
        @input="handleBaseInput"
        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
      />
      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100"
        :style="{ color: getContrastColor(baseInput) }"
      >
        <Check class="size-4" />
      </div>
    </div>
    <div class="flex flex-col justify-center px-3 flex-1">
      <span class="text-[7px] font-bold uppercase tracking-[0.2em] text-gray-400"># Source</span>
      <input
        type="text"
        v-model="baseInput"
        @input="handleBaseInput"
        maxlength="6"
        class="w-full bg-transparent text-[10px] font-semibold uppercase tracking-widest outline-none text-gray-900"
      />
    </div>
  </div>
</template>
