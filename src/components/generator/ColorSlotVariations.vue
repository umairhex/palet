<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { computed } from 'vue'
import { generateTints, generateShades } from '../../utils/color/generators'

const props = defineProps<{
  hex: string
}>()

const emit = defineEmits<{
  (e: 'update:hex', hex: string): void
  (e: 'close'): void
}>()

const tints = computed(() => generateTints(props.hex, 8))
const shades = computed(() => generateShades(props.hex, 8))
</script>

<template>
  <div
    class="absolute inset-3 z-30 bg-white/95 backdrop-blur-md rounded-4xl border border-gray-100 shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden flex flex-col"
  >
    <div class="p-5 lg:p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
      <div class="flex items-center justify-between">
        <div>
          <h4
            class="text-[10px] font-black uppercase tracking-[0.2em] text-gray-900 leading-none mb-1"
          >
            Variations
          </h4>
          <div class="flex items-center gap-2">
            <div
              class="size-3 rounded-full border border-gray-100 shadow-sm"
              :style="{ backgroundColor: hex }"
            ></div>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{
              hex
            }}</span>
          </div>
        </div>
        <button
          @click="emit('close')"
          class="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-500 border border-gray-100"
        >
          <X class="size-4" />
        </button>
      </div>

      <div class="space-y-6">
        <div class="space-y-3">
          <p class="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">Tints</p>
          <div class="flex flex-wrap gap-1.5 px-0.5">
            <button
              v-for="tint in tints"
              :key="tint"
              @click="emit('update:hex', tint)"
              class="flex-1 min-w-7.5 h-10 rounded-xl cursor-pointer hover:scale-110 active:scale-90 transition-all border border-black/5 shadow-sm relative group/v"
              :style="{ backgroundColor: tint }"
            >
              <div
                class="absolute inset-0 ring-2 ring-primary opacity-0 group-hover/v:opacity-100 rounded-xl pointer-events-none transition-opacity"
              ></div>
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <p class="text-[9px] font-black uppercase tracking-widest text-gray-400 px-1">Shades</p>
          <div class="flex flex-wrap gap-1.5 px-0.5">
            <button
              v-for="shade in shades"
              :key="shade"
              @click="emit('update:hex', shade)"
              class="flex-1 min-w-7.5 h-10 rounded-xl cursor-pointer hover:scale-110 active:scale-90 transition-all border border-black/5 shadow-sm relative group/v"
              :style="{ backgroundColor: shade }"
            >
              <div
                class="absolute inset-0 ring-2 ring-primary opacity-0 group-hover/v:opacity-100 rounded-xl pointer-events-none transition-opacity"
              ></div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 bg-gray-50/50 border-t border-gray-100">
      <button
        @click="emit('close')"
        class="w-full py-3 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg"
      >
        Done
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
</style>
