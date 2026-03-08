<script setup lang="ts">
import { ref, watch } from 'vue'
import { Wand2, Copy, Check, RefreshCw, Info, Palette } from 'lucide-vue-next'
import { generateHarmony, generateScale } from '../../utils/color/generators'
import type { HarmonyMode } from '../../utils/color/generators'
import Button from '../ui/Button.vue'

const baseColor = ref('#10b981')
const mode = ref<HarmonyMode | 'scale'>('analogous')
const generatedColors = ref<string[]>([])
const copiedColor = ref<string | null>(null)

const emit = defineEmits(['save', 'cancel'])

const generate = () => {
  if (mode.value === 'scale') {
    generatedColors.value = generateScale(baseColor.value)
  } else {
    generatedColors.value = generateHarmony(baseColor.value, mode.value as HarmonyMode)
  }
}

const copyColor = (color: string) => {
  navigator.clipboard.writeText(color)
  copiedColor.value = color
  setTimeout(() => (copiedColor.value = null), 2000)
}

const savePalette = () => {
  emit('save', {
    name: 'Generated Palette',
    colors: generatedColors.value,
    mode: mode.value,
  })
}

watch([baseColor, mode], generate, { immediate: true })
</script>

<template>
  <div class="bg-white border border-gray-200 rounded-[2.5rem] p-8 space-y-8 shadow-sm">
    <div class="flex items-center justify-between">
      <div class="space-y-1">
        <h3 class="text-xl font-black text-gray-900 flex items-center gap-2">
          <Wand2 class="size-5 text-primary" />
          Color Engine
        </h3>
        <p class="text-xs text-gray-400 font-medium">Perceptually uniform generation (OKLab)</p>
      </div>
      <button
        @click="generate"
        class="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"
      >
        <RefreshCw class="size-5" />
      </button>
    </div>

    <div class="flex p-1 bg-gray-50 rounded-2xl border border-gray-100">
      <button
        v-for="tab in ['analogous', 'scale']"
        :key="tab"
        @click="mode = tab as any"
        class="flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
        :class="
          mode === tab ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'
        "
      >
        {{ tab }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1"
          >Base Color</label
        >
        <div class="flex gap-2">
          <input
            type="color"
            v-model="baseColor"
            class="size-12 rounded-xl cursor-pointer border-none bg-transparent"
          />
          <input
            type="text"
            v-model="baseColor"
            class="flex-1 h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div class="space-y-3">
        <label class="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1"
          >Detailed Mode</label
        >
        <select
          v-model="mode"
          class="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-600 focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
        >
          <optgroup label="Harmony Rules">
            <option value="analogous">Analogous</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="split-complementary">Split Complementary</option>
            <option value="tetradic">Tetradic</option>
          </optgroup>
          <optgroup label="Mathematically Derived">
            <option value="scale">Semantic Scale (11 Steps)</option>
          </optgroup>
        </select>
      </div>
    </div>

    <div class="space-y-4">
      <div
        class="flex h-32 rounded-3xl overflow-hidden shadow-inner bg-gray-50 p-2 gap-1.5 border border-gray-100"
      >
        <div
          v-for="color in generatedColors"
          :key="color"
          @click="copyColor(color)"
          class="flex-1 relative group cursor-pointer transition-all duration-300 hover:flex-[1.5] active:scale-95 flex items-center justify-center rounded-xl"
          :style="{ backgroundColor: color }"
        >
          <div
            class="absolute inset-x-0 bottom-0 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm rounded-b-xl"
          >
            <p class="text-[8px] font-black text-white text-center uppercase tracking-tighter">
              {{ color }}
            </p>
          </div>
          <Check v-if="copiedColor === color" class="text-white size-5 drop-shadow-md" />
          <Copy
            v-else
            class="text-white opacity-0 group-hover:opacity-100 size-4 transition-opacity drop-shadow-md"
          />
        </div>
      </div>

      <div class="p-4 bg-primary/2 rounded-2xl border border-primary/10 flex items-start gap-3">
        <Info class="size-4 text-primary shrink-0 mt-0.5" />
        <div class="space-y-1">
          <p class="text-[10px] font-black uppercase tracking-widest text-primary">
            Perceptual Insight
          </p>
          <p class="text-[11px] text-gray-500 leading-relaxed">
            <span v-if="mode === 'scale'">
              Generates 11 levels using <strong>exponential lightness</strong> and a
              <strong>quadratic saturation curve</strong> for maximum UI utility.
            </span>
            <span v-else>
              Calculated via <strong>LCH polar rotations</strong> to maintain constant perceptual
              brightness while shifting the hue.
            </span>
          </p>
        </div>
      </div>
    </div>

    <div class="pt-4 flex justify-end gap-3">
      <Button
        variant="ghost"
        @click="$emit('cancel')"
        class="rounded-xl h-12 px-6 font-bold text-gray-400"
        >Cancel</Button
      >
      <Button
        @click="savePalette"
        class="bg-primary hover:bg-primary-hover text-white rounded-xl px-10 h-12 font-bold shadow-lg shadow-primary/20 gap-2"
      >
        <Palette class="size-5" />
        Save to Library
      </Button>
    </div>
  </div>
</template>
