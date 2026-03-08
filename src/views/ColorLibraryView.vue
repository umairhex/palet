<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Search, Filter, X } from 'lucide-vue-next'
import Button from '../components/ui/Button.vue'
import PaletteCard from '../components/dashboard/PaletteCard.vue'
import ColorGenerator from '../components/dashboard/ColorGenerator.vue'
import { usePaletteStore } from '../stores/palette'

const store = usePaletteStore()
const isGeneratorOpen = ref(false)

const handleSave = (newPalette: { name: string; colors: string[] }) => {
  store.savePalette(newPalette.name, newPalette.colors)
  isGeneratorOpen.value = false
}
</script>

<template>
  <div class="space-y-10 w-full max-w-(--breakpoint-2xl) mx-auto">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-black text-gray-900 mb-2">Color Library</h2>
        <p class="text-gray-400 font-medium">Manage and organize your brand palettes.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative group hidden sm:block">
          <Search
            class="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 group-focus-within:text-primary transition-colors"
          />
          <input
            type="text"
            placeholder="Search palettes..."
            class="h-12 w-64 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all"
          />
        </div>
        <Button
          @click="isGeneratorOpen = true"
          class="bg-primary hover:bg-primary-hover text-white rounded-2xl px-6 h-12 font-bold shadow-lg shadow-primary/20 gap-2 w-full sm:w-auto"
        >
          <Plus class="size-5" />
          New Palette
        </Button>
      </div>
    </div>

    <div class="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <Button
        variant="outline"
        class="h-9 px-4 rounded-full border-gray-200 text-xs font-bold uppercase tracking-widest bg-white hover:bg-gray-50 text-gray-900 gap-2 shrink-0"
      >
        <Filter class="size-3.5" />
        Filters
      </Button>
      <div class="h-4 w-px bg-gray-200 mx-2"></div>
      <button
        v-for="tag in ['All', 'Brand', 'Nature', 'Ui', 'Tech', 'Marketing']"
        :key="tag"
        class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border border-transparent"
        :class="
          tag === 'All'
            ? 'bg-primary/10 text-primary border-primary/20'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        "
      >
        {{ tag }}
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      <PaletteCard v-for="palette in store.palettes" :key="palette.id" :palette="palette" />
    </div>

    <div
      v-if="isGeneratorOpen"
      class="fixed inset-0 z-100 flex items-center justify-center p-6 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        class="w-full max-w-2xl relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500"
      >
        <button
          @click="isGeneratorOpen = false"
          class="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
        >
          <X class="size-6" />
        </button>
        <ColorGenerator @save="handleSave" />
      </div>
    </div>
  </div>
</template>
