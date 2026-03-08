<script setup lang="ts">
import { Copy, Bookmark, Unlock, Lock, History as HistoryIcon } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

import HistoryActions from './toolbar/HistoryActions.vue'
import RuleSelector from './toolbar/RuleSelector.vue'
import ColorCountAdjuster from './toolbar/ColorCountAdjuster.vue'
import BaseColorInput from './toolbar/BaseColorInput.vue'
import AdjustmentsDropdown from './toolbar/AdjustmentsDropdown.vue'
import SimulationDropdown from './toolbar/SimulationDropdown.vue'
import ExportDropdown from './toolbar/ExportDropdown.vue'

interface Adjustments {
  brightness: number
  saturation: number
  temperature: number
}

defineProps<{
  historyIndex: number
  historyLength: number
  selectedRule: string
  numColors: number
  isCopiedAll: boolean
  showMockUi: boolean
  selectedSimulation: string
  baseColor: string
  isBaseLocked: boolean
}>()

defineEmits<{
  (e: 'undo'): void
  (e: 'redo'): void
  (e: 'update:rule', rule: string): void
  (e: 'update:numColors', delta: number): void
  (e: 'copyAll'): void
  (e: 'applyAdjustments', adjustments: Adjustments): void
  (e: 'setSimulation', sim: string): void
  (e: 'export', format: 'json' | 'css' | 'tailwind'): void
  (e: 'lockAll'): void
  (e: 'unlockAll'): void
  (e: 'importPalette', hexes: string): void
  (e: 'toggleHistory'): void
  (e: 'randomize'): void
  (e: 'toggleMockUi'): void
  (e: 'openSave'): void
  (e: 'toggleContrast'): void
  (e: 'toggleLayout'): void
}>()
</script>

<template>
  <div
    class="flex flex-col xl:flex-row items-center justify-between p-3 lg:p-4 bg-white/90 backdrop-blur-xl rounded-4xl border border-white/50 shadow-sm z-30 gap-4 w-full transition-all duration-300"
  >
    <div class="flex items-center gap-2 sm:gap-4 flex-wrap justify-center xl:justify-start">
      <HistoryActions
        :history-index="historyIndex"
        :history-length="historyLength"
        @undo="$emit('undo')"
        @redo="$emit('redo')"
      />

      <div
        class="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-1 h-11"
      >
        <RuleSelector :selected-rule="selectedRule" @update:rule="$emit('update:rule', $event)" />

        <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>

        <ColorCountAdjuster
          :num-colors="numColors"
          @update:numColors="$emit('update:numColors', $event)"
        />
      </div>
    </div>

    <div class="flex items-center gap-3 w-full sm:w-auto justify-center">
      <button
        @click="$emit('randomize')"
        class="h-12 px-8 bg-primary text-white rounded-2xl text-[10px] font-medium uppercase tracking-[0.2em] transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-95 flex items-center gap-3 shadow-lg shadow-primary/20 flex-1 sm:flex-none justify-center"
      >
        <div
          class="flex items-center gap-1.5 opacity-80 backdrop-blur-sm bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/10"
        >
          <div class="w-6 h-1 bg-white/80 rounded-full"></div>
        </div>
        <span>Generate</span>
      </button>

      <BaseColorInput :base-color="baseColor" @importPalette="$emit('importPalette', $event)" />
    </div>

    <div class="flex items-center gap-3 flex-wrap justify-center xl:justify-end w-full xl:w-auto">
      <div
        class="flex items-center gap-1 px-1.5 py-1 bg-gray-50 rounded-2xl border border-gray-100 h-11 shrink-0"
      >
        <button
          @click="$emit('openSave')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
          title="Save Palette"
        >
          <Bookmark class="size-4" />
        </button>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <button
          @click="$emit('copyAll')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
          title="Copy All"
        >
          <Check v-if="isCopiedAll" class="size-4 text-green-500" />
          <Copy v-else class="size-4" />
        </button>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <button
          @click="$emit('lockAll')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
          title="Lock All"
        >
          <Lock class="size-4" />
        </button>
        <button
          @click="$emit('unlockAll')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
          title="Unlock All"
        >
          <Unlock class="size-4" />
        </button>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <div class="flex items-center gap-1">
          <AdjustmentsDropdown @applyAdjustments="$emit('applyAdjustments', $event)" />
          <SimulationDropdown
            :selected-simulation="selectedSimulation"
            @setSimulation="$emit('setSimulation', $event)"
          />
        </div>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <ExportDropdown @export="$emit('export', $event)" />

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <button
          @click="$emit('toggleHistory')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
          title="Session History"
        >
          <HistoryIcon class="size-4" />
        </button>
      </div>

      <Button
        @click="$emit('toggleMockUi')"
        :class="
          showMockUi
            ? 'bg-gray-900 text-white'
            : 'bg-white border border-gray-100 text-gray-900 hover:bg-gray-50'
        "
        class="h-11 px-6 font-bold uppercase tracking-widest rounded-2xl text-[10px] transition-all min-w-25 shadow-sm flex-1 sm:flex-none"
      >
        {{ showMockUi ? 'Close' : 'Preview' }}
      </Button>
    </div>
  </div>
</template>
