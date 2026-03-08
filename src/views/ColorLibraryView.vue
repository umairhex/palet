<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Plus, Search, PaintBucket, Upload } from 'lucide-vue-next'
import { useRoute } from 'vue-router'
import Button from '../components/ui/Button.vue'
import PaletteCard from '../components/dashboard/PaletteCard.vue'
import ColorGenerator from '../components/dashboard/ColorGenerator.vue'
import { usePalettes } from '../composables/usePalettes'
import { useToast } from '../composables/useToast'
import { importFromJSON } from '../utils/paletteExport'
import Modal from '../components/ui/Modal.vue'

import { useCollectionSearch } from '../composables/useCollectionSearch'
import type { Palette } from '../composables/usePalettes'

const route = useRoute()
const { palettes, savePalette, deletePalette, duplicatePalette, allTags } = usePalettes()
const { toast } = useToast()
const isGeneratorOpen = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const {
  searchQuery,
  activeCategory: activeTag,
  sortBy,
  filteredItems: filteredPalettes,
} = useCollectionSearch(palettes, {
  searchFields: ['name', 'colors', 'tags'],
  categoryField: 'tags',
  allCategoryLabel: 'All',
  defaultSort: 'modified',
  sortStrategies: {
    name: (a: Palette, b: Palette) => a.name.localeCompare(b.name),
    created: (a: Palette, b: Palette) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    modified: (a: Palette, b: Palette) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  },
})

onMounted(() => {
  if (route.query.q) {
    searchQuery.value = String(route.query.q)
  }
})

const tagList = computed(() => ['All', ...allTags.value])

const handleSave = (newPalette: { name: string; colors: string[] }) => {
  savePalette(newPalette.name, newPalette.colors)
  isGeneratorOpen.value = false
  toast('Palette created!', 'success')
}

const handleDelete = (id: number) => {
  deletePalette(id)
  toast('Palette deleted', 'success')
}

const handleDuplicate = (id: number) => {
  duplicatePalette(id)
  toast('Palette duplicated', 'success')
}

const handleFileInput = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    const content = await file.text()
    const imported = importFromJSON(content)

    if (imported) {
      savePalette(imported.name, imported.colors)
      toast(`Imported "${imported.name}"!`, 'success')
    } else {
      toast('Invalid palette file format', 'error')
    }
  } catch {
    toast('Failed to import palette', 'error')
  }

  input.value = ''
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
            v-model="searchQuery"
            type="text"
            placeholder="Search palettes..."
            class="h-12 w-64 pl-11 pr-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/30 transition-all"
          />
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <input
            ref="fileInput"
            type="file"
            accept=".json"
            class="hidden"
            @change="handleFileInput"
          />
          <Button
            @click="fileInput?.click()"
            class="bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl px-6 h-12 font-bold gap-2"
          >
            <Upload class="size-5" />
            <span class="hidden sm:inline">Import</span>
          </Button>
          <select
            v-model="sortBy"
            class="h-12 px-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-600 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all"
          >
            <option value="modified">Edited (Latest)</option>
            <option value="created">Created (Oldest)</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
        <Button
          @click="isGeneratorOpen = true"
          class="bg-primary hover:bg-primary-hover text-white rounded-2xl px-6 h-12 font-bold shadow-lg shadow-primary/20 gap-2 w-full sm:w-auto"
        >
          <Plus class="size-5" />
          <span class="hidden sm:inline">New Palette</span>
          <span class="sm:hidden">New</span>
        </Button>
      </div>
    </div>

    <div class="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="tag in tagList"
        :key="tag"
        @click="activeTag = tag"
        class="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border border-transparent"
        :class="
          tag === activeTag
            ? 'bg-primary/10 text-primary border-primary/20'
            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
        "
      >
        {{ tag }}
      </button>
    </div>

    <div
      v-if="filteredPalettes.length"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
    >
      <PaletteCard
        v-for="palette in filteredPalettes"
        :key="palette.id"
        :palette="palette"
        @delete="handleDelete"
        @duplicate="handleDuplicate"
      />
    </div>

    <div v-else class="flex flex-col items-center justify-center py-24 text-center">
      <div class="size-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
        <PaintBucket class="size-10 text-gray-300" />
      </div>
      <h3 class="text-xl font-black text-gray-900 mb-2">No palettes found</h3>
      <p class="text-sm text-gray-400 max-w-sm mb-8">
        {{
          searchQuery || activeTag !== 'All'
            ? 'Try adjusting your search or filters.'
            : 'Create your first palette to get started.'
        }}
      </p>
      <Button
        v-if="!searchQuery && activeTag === 'All'"
        @click="isGeneratorOpen = true"
        class="bg-primary hover:bg-primary-hover text-white rounded-2xl px-8 h-12 font-bold shadow-lg shadow-primary/20 gap-2"
      >
        <Plus class="size-5" />
        Create Palette
      </Button>
    </div>

    <Modal :show="isGeneratorOpen" @close="isGeneratorOpen = false">
      <ColorGenerator @save="handleSave" />
    </Modal>
  </div>
</template>
