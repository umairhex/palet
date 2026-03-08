<script setup lang="ts">
import { ref, watch } from 'vue'
import {
  Undo2,
  Redo2,
  Minus,
  Plus,
  Check,
  Copy,
  Settings2,
  Download,
  Bookmark,
  Unlock,
  Lock,
  ChevronDown,
  Glasses,
} from 'lucide-vue-next'
import Button from '../ui/Button.vue'

interface Adjustments {
  brightness: number
  saturation: number
  temperature: number
}

const props = defineProps<{
  historyIndex: number
  historyLength: number
  selectedRule: string
  numColors: number
  copiedHex: string | null
  showMockUi: boolean
  selectedSimulation: string
  baseColor: string
  isBaseLocked: boolean
}>()

const emit = defineEmits<{
  (e: 'undo'): void
  (e: 'redo'): void
  (e: 'update:rule', rule: string): void
  (e: 'update:numColors', delta: number): void
  (e: 'copyAll'): void
  (e: 'applyAdjustments', adjustments: Adjustments): void
  (e: 'setSimulation', sim: string): void
  (e: 'export', format: 'json' | 'css' | 'tailwind'): void
  (e: 'toggleMockUI'): void
  (e: 'lockAll'): void
  (e: 'unlockAll'): void
  (e: 'importPalette', hexes: string): void
  (e: 'toggleContrast'): void
  (e: 'openSave'): void
  (e: 'toggleLayout'): void
  (e: 'toggleMockUi'): void
  (e: 'randomize'): void
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

const localAdj = ref<Adjustments>({ brightness: 0, saturation: 0, temperature: 0 })
const lastApplied = ref<Adjustments>({ brightness: 0, saturation: 0, temperature: 0 })

const handleAdjust = (kind: keyof Adjustments, val: number) => {
  const delta = val - lastApplied.value[kind]
  if (Math.abs(delta) < 0.01) return

  const adjustments = { brightness: 0, saturation: 0, temperature: 0 }
  adjustments[kind] = delta

  emit('applyAdjustments', adjustments)
  lastApplied.value[kind] = val
}

const resetLocalAdjust = () => {
  localAdj.value = { brightness: 0, saturation: 0, temperature: 0 }
  lastApplied.value = { brightness: 0, saturation: 0, temperature: 0 }
}

const getContrastColor = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) || 0
  const g = parseInt(hex.slice(3, 5), 16) || 0
  const b = parseInt(hex.slice(5, 7), 16) || 0
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}
</script>

<template>
  <div
    class="flex flex-col xl:flex-row items-center justify-between p-3 lg:p-4 bg-white/90 backdrop-blur-xl rounded-4xl border border-white/50 shadow-sm z-30 gap-4 w-full transition-all duration-300"
  >
    <div class="flex items-center gap-2 sm:gap-4 flex-wrap justify-center xl:justify-start">
      <div
        class="flex items-center gap-1 bg-gray-50 rounded-xl border border-gray-100 p-1 shrink-0 h-11"
      >
        <button
          @click="$emit('undo')"
          :disabled="historyIndex <= 0"
          class="p-2 lg:p-2.5 hover:text-primary disabled:opacity-20 transition-all rounded-lg hover:bg-white"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 class="size-4" />
        </button>
        <button
          @click="$emit('redo')"
          :disabled="historyIndex >= historyLength - 1"
          class="p-2 lg:p-2.5 hover:text-primary disabled:opacity-20 transition-all rounded-lg hover:bg-white"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 class="size-4" />
        </button>
      </div>

      <div
        class="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-2xl border border-gray-100 p-1 h-11"
      >
        <div class="relative group/rule">
          <button
            class="h-9 px-4 bg-white border border-gray-100/50 rounded-xl text-[10px] font-semibold uppercase tracking-[0.2em] transition-all hover:border-gray-200 flex items-center gap-3 min-w-[140px] justify-between shadow-sm"
          >
            <span class="truncate">{{ selectedRule.replace('-', ' ') }}</span>
            <ChevronDown
              class="size-3 text-gray-400 transition-transform group-hover/rule:rotate-180"
            />
          </button>

          <div
            class="absolute left-0 top-full pt-3 w-56 opacity-0 translate-y-2 pointer-events-none group-hover/rule:opacity-100 group-hover/rule:translate-y-0 group-hover/rule:pointer-events-auto transition-all duration-300 z-50"
          >
            <div class="bg-white rounded-3xl border border-gray-100 shadow-2xl p-2 space-y-1">
              <button
                v-for="rule in [
                  {
                    id: 'random',
                    label: 'Pure Random',
                    desc: 'Generate completely random colors with no relation.',
                  },
                  {
                    id: 'analogous',
                    label: 'Analogous',
                    desc: 'Colors adjacent on the color wheel for harmony.',
                  },
                  {
                    id: 'complementary',
                    label: 'Complementary',
                    desc: 'Opposite colors creating high contrast.',
                  },
                  {
                    id: 'triadic',
                    label: 'Triadic',
                    desc: 'Three evenly spaced colors for balanced palettes.',
                  },
                  {
                    id: 'split-complementary',
                    label: 'Split-Comp',
                    desc: 'Base color plus two adjacent to its complement.',
                  },
                  {
                    id: 'tetradic',
                    label: 'Tetradic',
                    desc: 'Four colors forming two complementary pairs.',
                  },
                  {
                    id: 'scale',
                    label: 'Visual Scale',
                    desc: 'Colors spaced evenly across the hue spectrum.',
                  },
                ]"
                :key="rule.id"
                @click="$emit('update:rule', rule.id)"
                :class="[
                  selectedRule === rule.id
                    ? 'bg-gray-900 text-white shadow-xl'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                  'w-full text-left px-4 py-2 rounded-xl text-[9px] font-semibold uppercase tracking-[0.2em] transition-all duration-200 flex flex-col justify-between',
                ]"
              >
                <span class="flex items-center justify-between w-full">
                  <span>{{ rule.label }}</span>
                  <Check v-if="selectedRule === rule.id" class="size-3" />
                </span>
                <span
                  class="mt-1 text-[7px] font-normal tracking-[0.15em] text-muted-foreground-subtle normal-case"
                >
                  {{ rule.desc }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="h-4 w-px bg-gray-200 hidden sm:block"></div>

        <div class="flex items-center px-1">
          <button
            @click="$emit('update:numColors', -1)"
            class="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"
          >
            <Minus class="size-4" />
          </button>
          <span class="w-8 text-center text-xs font-semibold text-gray-900">{{ numColors }}</span>
          <button
            @click="$emit('update:numColors', 1)"
            class="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-gray-500"
          >
            <Plus class="size-4" />
          </button>
        </div>
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

      <div
        :class="[
          'flex items-center bg-gray-50 border rounded-2xl overflow-hidden shadow-sm h-12 transition-all hover:bg-white hover:shadow-md w-full max-w-[180px] sm:w-[180px]',
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
            :style="{ color: getContrastColor('#' + baseInput.replace('#', '')) }"
          >
            <Check class="size-4" />
          </div>
        </div>
        <div class="flex flex-col justify-center px-3 flex-1">
          <span class="text-[7px] font-bold uppercase tracking-[0.2em] text-gray-400"
            ># Source</span
          >
          <input
            type="text"
            v-model="baseInput"
            @input="handleBaseInput"
            maxlength="6"
            class="w-full bg-transparent text-[10px] font-semibold uppercase tracking-widest outline-none text-gray-900"
          />
        </div>
      </div>
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
          <Check v-if="copiedHex === 'all'" class="size-4 text-green-500" />
          <Copy v-else class="size-4" />
        </button>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <button
          @click="$emit('lockAll')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
        >
          <Lock class="size-4" />
        </button>
        <button
          @click="$emit('unlockAll')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
        >
          <Unlock class="size-4" />
        </button>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <div class="flex items-center gap-1">
          <div class="relative group/adjust">
            <button
              @click="resetLocalAdjust"
              class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
              title="Global Adjustments (Click to reset)"
            >
              <Settings2 class="size-4" />
            </button>
            <div
              class="absolute right-0 bottom-full lg:top-full w-72 pt-4 pb-4 opacity-0 translate-y-2 pointer-events-none group-hover/adjust:opacity-100 group-hover/adjust:translate-y-0 group-hover/adjust:pointer-events-auto transition-all duration-300 z-50 focus-within:opacity-100 focus-within:translate-y-0 focus-within:pointer-events-auto"
            >
              <div class="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6">
                <h3 class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">
                  Fine Tuning
                </h3>
                <div class="space-y-6">
                  <div
                    v-for="kind in ['brightness', 'saturation'] as const"
                    :key="kind"
                    class="space-y-3"
                  >
                    <div
                      class="flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-widest"
                    >
                      <span>{{ kind }}</span>
                      <span class="text-primary font-black"
                        >{{ localAdj[kind] > 0 ? '+' : '' }}{{ localAdj[kind] }}</span
                      >
                    </div>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="0.5"
                      :value="localAdj[kind]"
                      @input="
                        (e) => {
                          const val = parseFloat((e.target as HTMLInputElement).value)
                          localAdj[kind] = val
                          handleAdjust(kind, val)
                        }
                      "
                      class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <div class="space-y-3">
                    <div
                      class="flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-widest"
                    >
                      <span>Temperature</span>
                      <span class="text-primary font-black"
                        >{{ localAdj.temperature > 0 ? '+' : '' }}{{ localAdj.temperature }}</span
                      >
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      step="1"
                      :value="localAdj.temperature"
                      @input="
                        (e) => {
                          const val = parseFloat((e.target as HTMLInputElement).value)
                          localAdj.temperature = val
                          handleAdjust('temperature', val)
                        }
                      "
                      class="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <div class="pt-2 border-t border-gray-50">
                    <button
                      @click="resetLocalAdjust"
                      class="w-full py-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-400 transition-all border border-gray-100"
                    >
                      Reset adjustments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="relative group/sim">
            <button
              class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
            >
              <Glasses class="size-4" />
            </button>
            <div
              class="absolute right-0 bottom-full lg:top-full w-56 pt-4 pb-4 opacity-0 translate-y-2 pointer-events-none group-hover/sim:opacity-100 group-hover/sim:translate-y-0 group-hover/sim:pointer-events-auto transition-all duration-300 z-50"
            >
              <div class="bg-white rounded-3xl border border-gray-100 shadow-2xl p-2 space-y-1">
                <button
                  v-for="sim in [
                    { id: 'none', label: 'None', desc: 'No color‑blindness simulation.' },
                    { id: 'protanopia', label: 'Protanopia', desc: 'Red‑weak vision filter.' },
                    {
                      id: 'deuteranopia',
                      label: 'Deuteranopia',
                      desc: 'Green‑weak vision filter.',
                    },
                    { id: 'tritanopia', label: 'Tritanopia', desc: 'Blue‑weak vision filter.' },
                    {
                      id: 'achromatopsia',
                      label: 'Achromatopsia',
                      desc: 'Greyscale (no color) vision.',
                    },
                  ]"
                  :key="sim.id"
                  @click="$emit('setSimulation', sim.id)"
                  :class="[
                    selectedSimulation === sim.id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700',
                    'w-full text-left px-4 py-2 rounded-xl text-[9px] font-semibold uppercase tracking-[0.2em] transition-all flex flex-col justify-between',
                  ]"
                >
                  <span class="flex items-center justify-between w-full">
                    <span>{{ sim.label }}</span>
                    <Check v-if="selectedSimulation === sim.id" class="size-3" />
                  </span>
                  <span
                    class="mt-1 text-[7px] font-normal tracking-[0.15em] text-muted-foreground-subtle normal-case"
                  >
                    {{ sim.desc }}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="h-4 w-px bg-gray-200 mx-0.5"></div>

        <button
          @click="$emit('export', 'json')"
          class="size-8 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white rounded-lg transition-all"
        >
          <Download class="size-4" />
        </button>
      </div>

      <Button
        @click="$emit('toggleMockUi')"
        :class="
          showMockUi
            ? 'bg-gray-900 text-white'
            : 'bg-white border border-gray-100 text-gray-900 hover:bg-gray-50'
        "
        class="h-11 px-6 font-bold uppercase tracking-widest rounded-2xl text-[10px] transition-all min-w-[100px] shadow-sm flex-1 sm:flex-none"
      >
        {{ showMockUi ? 'Close' : 'Preview' }}
      </Button>
    </div>
  </div>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: white;
  border: 2px solid #10b981;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>
