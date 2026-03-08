<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { getContrastColor, getContrastRatio } from '../utils/color/accessibility'
import { useClipboard } from '../composables/useClipboard'

import GeneratorToolbar from '../components/generator/GeneratorToolbar.vue'
import ColorSlot from '../components/generator/ColorSlot.vue'
import MockUIPreview from '../components/generator/MockUIPreview.vue'
import SimulationFilters from '../components/generator/SimulationFilters.vue'
import ContrastMatrix from '../components/generator/ContrastMatrix.vue'
import SavePaletteModal from '../components/generator/SavePaletteModal.vue'
import GeneratorHistory from '../components/generator/GeneratorHistory.vue'
import { usePalettes } from '../composables/usePalettes'
import { useToast } from '../composables/useToast'
import { useAuth } from '../composables/useAuth'
import { useGenerator } from '../composables/useGenerator'
import { handlePaletteExport, type ExportFormat } from '../utils/paletteExport'

useAuth()
const { savePalette: savePaletteToDb, allTags } = usePalettes()
const { toast } = useToast()
const { copy, copiedValue } = useClipboard()

const {
  baseSeed,
  colors,
  numColors,
  selectedRule,
  history,
  historyIndex,
  recentSessions,
  undo,
  redo,
  randomize,
  handleApplyAdjustments,
  handleUpdateNumColors,
  importPalette,
  restoreFromHistory,
  toggleLock,
  lockAll,
  unlockAll,
  removeSlot,
  moveSlot,
  loadGeneratorState,
  saveToHistory,
} = useGenerator()

const showMockUi = ref(false)
const showContrastMatrix = ref(false)
const showSaveModal = ref(false)
const selectedSimulation = ref('none')
const showHistory = ref(false)

const handleSavePalette = (payload: { name: string; tags: string[] }) => {
  savePaletteToDb(
    payload.name,
    colors.value.map((s) => s.hex),
    payload.tags,
  )
  showSaveModal.value = false
  toast('Palette saved to library!', 'success')
}

const handleCopyAll = () => {
  const allHex = colors.value.map((s) => s.hex).join(', ')
  copy(allHex, 'All colors copied!')
}

const handleExport = (format: ExportFormat) => {
  const label = handlePaletteExport(
    {
      name: 'Palette',
      colors: colors.value.map((s) => s.hex),
    },
    format,
  )
  toast(`Exported as ${label}`, 'success')
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
  const loaded = loadGeneratorState()
  if (!loaded) randomize()
  else saveToHistory()
  window.addEventListener('keydown', onKey)
})

onUnmounted(() => window.removeEventListener('keydown', onKey))

watch(selectedRule, () => randomize())

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
      :is-copied-all="!!copiedValue"
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
      @toggle-history="showHistory = !showHistory"
    />

    <div
      class="flex-1 relative overflow-hidden rounded-[3rem] border border-gray-100 bg-white flex"
    >
      <GeneratorHistory
        :recent-sessions="recentSessions"
        :is-history-open="showHistory"
        @restore="
          (p) => {
            restoreFromHistory(p)
            showHistory = false
            toast('Palette restored', 'success')
          }
        "
      />
      <div class="flex-1 relative overflow-hidden">
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
            :total="colors.length"
            :contrast-color="getContrastColor(slot.hex)"
            :contrast-badge="getBadge(slot.hex)"
            @toggle-lock="toggleLock"
            @remove="removeSlot"
            @move="(from: number, to: number) => moveSlot(from, to)"
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
      :available-tags="allTags"
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
