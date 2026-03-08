<script setup lang="ts">
import { ref, watch } from 'vue'
import { Wand2, RefreshCw, Info, Palette } from 'lucide-vue-next'
import { generateHarmony, generateScale } from '../../utils/color/generators'
import type { HarmonyMode } from '../../utils/color/generators'
import Button from '../ui/Button.vue'
import PaletteColorStrip from './PaletteColorStrip.vue'

const baseColor = ref('#10b981')
const mode = ref<HarmonyMode | 'scale'>('analogous')
const generatedColors = ref<string[]>([])

const emit = defineEmits(['save', 'cancel'])

const paletteName = ref('My Palette')

const generate = () => {
  if (mode.value === 'scale') {
    generatedColors.value = generateScale(baseColor.value)
  } else {
    generatedColors.value = generateHarmony(baseColor.value, mode.value as HarmonyMode)
  }
}

const savePalette = () => {
  emit('save', {
    name: paletteName.value || 'Untitled Palette',
    colors: generatedColors.value,
    mode: mode.value,
  })
}

watch([baseColor, mode], generate, { immediate: true })
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 lg:space-y-8 shadow-sm max-h-[90vh] overflow-y-auto"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="space-y-0.5 flex-1 min-w-0">
        <h3 class="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2 truncate">
          <Wand2 class="size-4 sm:size-5 text-primary shrink-0" />
          <span class="truncate">Color Engine</span>
        </h3>
        <p class="text-[9px] sm:text-xs text-gray-400 font-medium line-clamp-1">OKLab generation</p>
      </div>
      <button
        @click="generate"
        class="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400"
      >
        <RefreshCw class="size-5" />
      </button>
    </div>

    <div class="flex p-0.5 bg-gray-50 rounded-xl border border-gray-100">
      <button
        v-for="tab in ['analogous', 'scale']"
        :key="tab"
        @click="mode = tab as any"
        class="flex-1 py-1.5 px-2 text-[8px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all"
        :class="
          mode === tab ? 'bg-white shadow-sm text-primary' : 'text-gray-400 hover:text-gray-600'
        "
      >
        {{ tab }}
      </button>
    </div>

    <div class="space-y-1.5">
      <label
        class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1"
        >Palette Name</label
      >
      <input
        type="text"
        v-model="paletteName"
        placeholder="e.g. Brand Primary"
        class="w-full h-10 sm:h-11 px-3 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold focus:ring-2 sm:focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all"
      />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
      <div class="space-y-1.5">
        <label
          class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1"
          >Base</label
        >
        <div class="flex gap-1.5 sm:gap-2">
          <input
            type="color"
            v-model="baseColor"
            class="size-10 sm:size-11 rounded-lg sm:rounded-xl cursor-pointer border-none bg-transparent"
          />
          <input
            type="text"
            v-model="baseColor"
            class="flex-1 h-10 sm:h-11 px-2 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-widest focus:ring-2 sm:focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      <div class="space-y-1.5">
        <label
          class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1"
          >Mode</label
        >
        <select
          v-model="mode"
          class="w-full h-10 sm:h-11 px-2 sm:px-4 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-widest text-gray-600 focus:ring-2 sm:focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
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

    <div class="space-y-2 sm:space-y-3">
      <PaletteColorStrip
        :colors="generatedColors"
        height="h-24 sm:h-32"
        class="rounded-2xl overflow-hidden shadow-inner border border-gray-100 p-0!"
      />

      <div
        class="p-2.5 sm:p-3 lg:p-4 bg-primary/2 rounded-lg sm:rounded-2xl border border-primary/10 flex items-start gap-2 sm:gap-3"
      >
        <Info class="size-3 sm:size-4 text-primary shrink-0 mt-0.5" />
        <div class="space-y-0.5">
          <p
            class="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-primary line-clamp-1"
          >
            Insight
          </p>
          <p
            class="text-[8px] sm:text-[11px] text-gray-500 leading-relaxed line-clamp-2 sm:line-clamp-none"
          >
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

    <div class="pt-2 sm:pt-3 lg:pt-4 flex justify-end gap-2 sm:gap-3">
      <Button
        variant="ghost"
        @click="$emit('cancel')"
        class="rounded-lg sm:rounded-xl h-9 sm:h-10 lg:h-12 px-3 sm:px-6 font-bold text-gray-400 text-xs sm:text-sm"
        >Cancel</Button
      >
      <Button
        @click="savePalette"
        class="bg-primary hover:bg-primary-hover text-white rounded-lg sm:rounded-xl px-4 sm:px-8 lg:px-10 h-9 sm:h-10 lg:h-12 font-bold shadow-lg shadow-primary/20 gap-1.5 sm:gap-2 text-xs sm:text-sm"
      >
        <Palette class="size-3 sm:size-4 lg:size-5" />
        <span class="hidden sm:inline">Save to Library</span>
        <span class="sm:hidden">Save</span>
      </Button>
    </div>
  </div>
</template>
