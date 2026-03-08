<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import {
  generateHarmony,
  generateScale,
  getContrastRatio,
  adjustPalette,
} from '../utils/color/generators'
import type { HarmonyMode } from '../utils/color/generators'

import GeneratorToolbar from '../components/generator/GeneratorToolbar.vue'
import ColorSlot from '../components/generator/ColorSlot.vue'
import MockUIPreview from '../components/generator/MockUIPreview.vue'
import SimulationFilters from '../components/generator/SimulationFilters.vue'
import ContrastMatrix from '../components/generator/ContrastMatrix.vue'
import SavePaletteModal from '../components/generator/SavePaletteModal.vue'
import { usePaletteStore } from '../stores/palette'

const paletteStore = usePaletteStore()

interface ColorSlotType {
  hex: string
  isLocked: boolean
}

const baseSeed = ref<string>('#FFFFFF')
const colors = ref<ColorSlotType[]>([])
const numColors = ref(5)
const copiedHex = ref<string | null>(null)
const selectedRule = ref<HarmonyMode | 'random' | 'scale'>('random')
const showMockUi = ref(false)
const showContrastMatrix = ref(false)
const showSaveModal = ref(false)
const selectedSimulation = ref('none')

const history = ref<string[][]>([])
const historyIndex = ref(-1)
const recentSessions = ref<string[][]>([])

const generateRandomHex = () => {
  return (
    '#' +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')
      .toUpperCase()
  )
}

const saveToHistory = () => {
  const currentPalette = colors.value.map((s) => s.hex)
  const lastHistory = history.value[historyIndex.value]

  if (lastHistory && JSON.stringify(lastHistory) === JSON.stringify(currentPalette)) return

  if (historyIndex.value < history.value.length - 1) {
    history.value = history.value.slice(0, historyIndex.value + 1)
  }

  history.value.push(currentPalette)
  if (history.value.length > 50) history.value.shift()
  historyIndex.value = history.value.length - 1

  if (!recentSessions.value.some((p) => JSON.stringify(p) === JSON.stringify(currentPalette))) {
    recentSessions.value.unshift(currentPalette)
    if (recentSessions.value.length > 20) recentSessions.value.pop()
  }
}

const undo = () => {
  if (historyIndex.value > 0) {
    historyIndex.value--
    const palette = history.value[historyIndex.value]
    if (palette) {
      colors.value = palette.map((hex, i) => ({
        hex,
        isLocked: colors.value[i]?.isLocked ?? false,
      }))
    }
  }
}

const redo = () => {
  if (historyIndex.value < history.value.length - 1) {
    historyIndex.value++
    const palette = history.value[historyIndex.value]
    if (palette) {
      colors.value = palette.map((hex, i) => ({
        hex,
        isLocked: colors.value[i]?.isLocked ?? false,
      }))
    }
  }
}

const randomize = (overrideBase?: string) => {
  let baseHex: string
  if (overrideBase) {
    baseHex = overrideBase
    baseSeed.value = baseHex
  } else {
    const lockedColor = colors.value.find((s) => s.isLocked)
    baseHex = lockedColor ? lockedColor.hex : generateRandomHex()
    baseSeed.value = baseHex
  }

  if (selectedRule.value === 'random') {
    if (colors.value.length === 0) {
      colors.value = Array.from({ length: numColors.value }, () => ({
        hex: generateRandomHex(),
        isLocked: false,
      }))
    } else {
      colors.value = colors.value.map((s) => ({
        ...s,
        hex: s.isLocked ? s.hex : generateRandomHex(),
      }))
    }
  } else if (selectedRule.value === 'scale') {
    const scale = generateScale(baseHex, numColors.value)
    colors.value = scale.map((hex, i) => {
      const existing = colors.value[i]
      return existing?.isLocked ? existing : { hex, isLocked: false }
    })
  } else {
    const harmony = generateHarmony(baseHex, selectedRule.value as HarmonyMode)
    colors.value = colors.value.map((s, i) => {
      if (s.isLocked) return s
      return { hex: harmony[i % harmony.length] || generateRandomHex(), isLocked: false }
    })

    if (colors.value.length === 0) {
      colors.value = Array.from({ length: numColors.value }, (_, i) => ({
        hex: harmony[i % harmony.length] || generateRandomHex(),
        isLocked: false,
      }))
    }
  }
  saveToHistory()
}

const handleApplyAdjustments = (adj: {
  brightness: number
  saturation: number
  temperature: number
}) => {
  const hexes = colors.value.map((s) => s.hex)
  const adjusted = adjustPalette(hexes, {
    brightness: adj.brightness * 0.05,
    saturation: adj.saturation * 0.05,
    temperature: adj.temperature * 5,
  })

  colors.value = colors.value.map((s, i) => ({
    ...s,
    hex: s.isLocked ? s.hex : adjusted[i] || s.hex,
  }))
  saveToHistory()
}

const toggleLock = (index: number) => {
  if (colors.value[index]) {
    colors.value[index].isLocked = !colors.value[index].isLocked
  }
}

const lockAll = () => {
  colors.value = colors.value.map((s) => ({ ...s, isLocked: true }))
}

const unlockAll = () => {
  colors.value = colors.value.map((s) => ({ ...s, isLocked: false }))
}

const handleSavePalette = (name: string) => {
  paletteStore.savePalette(
    name,
    colors.value.map((s) => s.hex),
  )
  showSaveModal.value = false
}

const importPalette = (str: string) => {
  const matches = str.match(/#[a-fA-F0-9]{3,6}/g)

  if (matches) {
    if (matches.length >= 2) {
      colors.value = matches.map((hex) => ({ hex: hex.toUpperCase(), isLocked: false }))
      numColors.value = colors.value.length
    } else if (matches.length === 1) {
      const newBase = matches[0].toUpperCase()
      if (colors.value.length === 0) {
        colors.value = [{ hex: newBase, isLocked: false }]
      } else if (colors.value[0]) {
        colors.value[0].hex = newBase
      }
      randomize(newBase)
    }
    saveToHistory()
  }
}

const handleCopy = (hex: string) => {
  navigator.clipboard.writeText(hex)
  copiedHex.value = hex
  setTimeout(() => (copiedHex.value = null), 2000)
}

const handleCopyAll = () => {
  const allHex = colors.value.map((s) => s.hex).join(', ')
  navigator.clipboard.writeText(allHex)
  copiedHex.value = 'all'
  setTimeout(() => (copiedHex.value = null), 2000)
}

const handleUpdateNumColors = (delta: number) => {
  const next = Math.max(2, Math.min(10, numColors.value + delta))
  if (next === numColors.value) return

  if (delta > 0) {
    for (let i = 0; i < delta; i++) {
      colors.value.push({ hex: generateRandomHex(), isLocked: false })
    }
  } else {
    for (let i = 0; i < Math.abs(delta); i++) {
      colors.value.pop()
    }
  }
  numColors.value = next
  randomize()
}

const handleExport = (format: 'json' | 'css' | 'tailwind') => {
  const hexes = colors.value.map((s) => s.hex)
  let content = ''
  if (format === 'json') content = JSON.stringify(hexes, null, 2)
  else if (format === 'css') content = hexes.map((h, i) => `--color-${i + 1}: ${h};`).join('\n')
  else if (format === 'tailwind') {
    content = `colors: {\n  palette: {\n${hexes.map((h, i) => `    ${i + 1}00: "${h}",`).join('\n')}\n  }\n}`
  }

  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `palette.${format === 'json' ? 'json' : format === 'css' ? 'css' : 'js'}`
  a.click()
  URL.revokeObjectURL(url)
}

const onKey = (e: KeyboardEvent) => {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
  if (e.code === 'Space') {
    e.preventDefault()
    randomize()
  }
  if (e.ctrlKey && e.code === 'KeyZ') {
    e.preventDefault()
    if (e.shiftKey) redo()
    else undo()
  }
}

onMounted(() => {
  randomize()
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => window.removeEventListener('keydown', onKey))
watch(selectedRule, () => randomize())

const getContrastColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) || 0
  const g = parseInt(hex.slice(3, 5), 16) || 0
  const b = parseInt(hex.slice(5, 7), 16) || 0
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}

const getBadge = (hex: string) => {
  const contrast = Math.max(getContrastRatio(hex, '#FFFFFF'), getContrastRatio(hex, '#000000'))
  return { score: contrast.toFixed(1), pass: contrast >= 4.5 }
}

const simulationStyle = computed(() => {
  const sim = selectedSimulation.value
  if (sim === 'achromatopsia') return { filter: 'grayscale(1)' }
  if (sim !== 'none') return { filter: `url(#${sim})` }
  return {}
})
</script>

<template>
  <div class="h-[calc(100vh-8rem)] flex flex-col space-y-6">
    <GeneratorToolbar
      :history-index="historyIndex"
      :history-length="history.length"
      :selected-rule="selectedRule"
      :num-colors="numColors"
      :copied-hex="copiedHex"
      :show-mock-ui="showMockUi"
      :selected-simulation="selectedSimulation"
      :base-color="baseSeed"
      :is-base-locked="colors[0]?.isLocked || false"
      @undo="undo"
      @redo="redo"
      @update:rule="selectedRule = $event as any"
      @update:num-colors="handleUpdateNumColors"
      @copy-all="handleCopyAll"
      @apply-adjustments="handleApplyAdjustments"
      @set-simulation="selectedSimulation = $event"
      @export="handleExport"
      @toggle-mock-ui="showMockUi = !showMockUi"
      @lock-all="lockAll"
      @unlock-all="unlockAll"
      @import-palette="importPalette"
      @toggle-contrast="showContrastMatrix = !showContrastMatrix"
      @open-save="showSaveModal = true"
      @randomize="randomize"
    />

    <div class="flex-1 relative overflow-hidden rounded-[3rem] border border-gray-100 bg-white">
      <div
        v-if="!showMockUi"
        class="absolute inset-0 flex flex-col lg:flex-row gap-1.5 lg:gap-2 p-1.5 lg:p-2 transition-all duration-500 overflow-y-auto lg:overflow-hidden"
        :style="simulationStyle"
      >
        <ColorSlot
          v-for="(slot, i) in colors"
          :key="i"
          :color="slot"
          :index="i"
          :copied-hex="copiedHex"
          :contrast-color="getContrastColor(slot.hex)"
          :contrast-badge="getBadge(slot.hex)"
          @toggle-lock="toggleLock"
          @copy="handleCopy"
          @update:hex="
            (h) => {
              slot.hex = h
              if (i === 0) baseSeed = h
              saveToHistory()
            }
          "
        />
      </div>
    </div>

    <MockUIPreview v-if="showMockUi" :colors="colors" @close="showMockUi = false" />

    <ContrastMatrix
      :colors="colors"
      :is-open="showContrastMatrix"
      @close="showContrastMatrix = false"
    />

    <SavePaletteModal
      :is-open="showSaveModal"
      :colors="colors.map((s) => s.hex)"
      @close="showSaveModal = false"
      @save="handleSavePalette"
    />

    <SimulationFilters />
  </div>
</template>

<style scoped>
.flex-1 {
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}
</style>
