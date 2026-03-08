<script setup lang="ts">
import { ref } from 'vue'
import { Settings2 } from 'lucide-vue-next'

interface Adjustments {
  brightness: number
  saturation: number
  temperature: number
}

const emit = defineEmits<{
  (e: 'applyAdjustments', adjustments: Adjustments): void
}>()

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
</script>

<template>
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
          <div v-for="kind in ['brightness', 'saturation'] as const" :key="kind" class="space-y-3">
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
