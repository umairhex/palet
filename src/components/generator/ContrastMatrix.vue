<script setup lang="ts">
import { X, Check, XCircle } from 'lucide-vue-next'
import { getContrastRatio } from '../../utils/color/generators'

interface ColorSlotType {
  hex: string
}

defineProps<{
  colors: ColorSlotType[]
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const getScore = (c1: string, c2: string) => {
  const ratio = getContrastRatio(c1, c2)
  return {
    ratio: ratio.toFixed(2),
    pass: ratio >= 4.5,
    largePass: ratio >= 3.0,
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-60 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-[3rem] p-12 max-w-4xl w-full shadow-2xl space-y-10 max-h-[90vh] overflow-y-auto"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-3xl font-black tracking-tighter">Contrast Matrix</h3>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
            Inter-palette readability check (WCAG 2.1)
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="p-4 hover:bg-gray-100 rounded-full transition-all text-gray-400 hover:text-gray-900"
        >
          <X class="size-6" />
        </button>
      </div>

      <div class="overflow-x-auto rounded-3xl border border-gray-100 p-1">
        <table class="w-full border-collapse">
          <thead>
            <tr>
              <th class="p-4 bg-gray-50/50"></th>
              <th
                v-for="(col, j) in colors"
                :key="j"
                class="p-4 text-[9px] font-black uppercase tracking-widest text-gray-400 min-w-24"
              >
                <div
                  class="w-full h-8 rounded-lg mb-2 shadow-sm"
                  :style="{ backgroundColor: col.hex }"
                ></div>
                Slot {{ j + 1 }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in colors" :key="i" class="border-t border-gray-50">
              <th
                class="p-4 text-[9px] font-black uppercase tracking-widest text-gray-400 text-left bg-gray-50/50"
              >
                <div
                  class="w-8 h-8 rounded-lg mb-2 shadow-sm"
                  :style="{ backgroundColor: row.hex }"
                ></div>
                Slot {{ i + 1 }}
              </th>
              <td v-for="(col, j) in colors" :key="j" class="p-2">
                <div
                  v-if="i === j"
                  class="flex items-center justify-center p-4 rounded-2xl bg-gray-50 text-[10px] font-bold text-gray-300 italic"
                >
                  Self
                </div>
                <div
                  v-else
                  :class="[
                    getScore(row.hex, col.hex).pass
                      ? 'bg-green-50 text-green-700'
                      : getScore(row.hex, col.hex).largePass
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700',
                    'flex flex-col items-center justify-center p-4 rounded-2xl transition-all hover:scale-[1.02] shadow-sm',
                  ]"
                >
                  <span class="text-sm font-black">{{ getScore(row.hex, col.hex).ratio }}</span>
                  <div class="flex items-center gap-1 mt-1">
                    <Check v-if="getScore(row.hex, col.hex).pass" class="size-3" />
                    <XCircle v-else class="size-3" />
                    <span class="text-[8px] font-black uppercase tracking-tighter">{{
                      getScore(row.hex, col.hex).pass ? 'Pass' : 'Fail'
                    }}</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex gap-4 p-6 bg-gray-50 rounded-3xl">
        <div class="flex-1 flex gap-4">
          <div class="space-y-1">
            <p class="text-[10px] font-black uppercase tracking-widest text-gray-900">
              WCAG AA Standard
            </p>
            <p class="text-[10px] font-bold text-gray-500 leading-relaxed">
              Min 4.5:1 for normal text.<br />
              Min 3.0:1 for large text (>18pt).
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
          <span class="text-[10px] font-bold text-gray-500">AA (4.5+)</span>
          <div class="w-3 h-3 rounded-full bg-yellow-400 ml-4"></div>
          <span class="text-[10px] font-bold text-gray-500">Large (3.0+)</span>
          <div class="w-3 h-3 rounded-full bg-red-400 ml-4"></div>
          <span class="text-[10px] font-bold text-gray-500">Fail (&lt;3.0)</span>
        </div>
      </div>
    </div>
  </div>
</template>
