<script setup lang="ts">
import { Search, Grid, List, Upload, Loader } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

defineProps<{
  viewMode: 'grid' | 'list'
  searchQuery: string
  categoryFilter: string
  sortBy: string
  isUploading: boolean
}>()

const emit = defineEmits<{
  (e: 'update:viewMode', value: 'grid' | 'list'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'update:categoryFilter', value: string): void
  (e: 'update:sortBy', value: string): void
  (e: 'upload'): void
}>()

const handleUploadClick = () => {
  emit('upload')
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl sm:text-3xl font-black text-gray-900 mb-1">Font Vault</h2>
        <p class="text-sm text-gray-400 font-medium">
          Your personal collection of premium typefaces.
        </p>
      </div>
      <div class="flex items-center gap-3 shrink-0">
        <div class="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button
            @click="emit('update:viewMode', 'grid')"
            :class="viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'"
            class="p-2 rounded-lg transition-all"
          >
            <Grid class="size-4" />
          </button>
          <button
            @click="emit('update:viewMode', 'list')"
            :class="viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'"
            class="p-2 rounded-lg transition-all"
          >
            <List class="size-4" />
          </button>
        </div>
        <Button
          @click="handleUploadClick"
          :disabled="isUploading"
          class="bg-primary hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-2xl px-5 h-11 font-bold shadow-lg shadow-primary/20 gap-2 whitespace-nowrap transition-all"
        >
          <Loader v-if="isUploading" class="size-4 animate-spin" />
          <Upload v-else class="size-4" />
          <span class="hidden xs:inline">{{ isUploading ? 'Uploading…' : 'Upload Font' }}</span>
          <span class="xs:hidden">Upload</span>
        </Button>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <Search
          class="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none"
        />
        <input
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Search your vault..."
          class="h-11 w-full pl-11 pr-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary/30 transition-all"
        />
      </div>
      <div class="flex gap-3">
        <select
          :value="categoryFilter"
          @change="emit('update:categoryFilter', ($event.target as HTMLSelectElement).value)"
          class="h-11 flex-1 sm:flex-none px-4 bg-white border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer min-w-0"
        >
          <option>All Types</option>
          <option>Sans Serif</option>
          <option>Serif</option>
          <option>Monospace</option>
          <option>Display</option>
          <option>Handwriting</option>
        </select>
        <select
          :value="sortBy"
          @change="emit('update:sortBy', ($event.target as HTMLSelectElement).value)"
          class="h-11 flex-1 sm:flex-none px-4 bg-white border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/10 cursor-pointer transition-all min-w-0"
        >
          <option value="date">Latest</option>
          <option value="name">A–Z</option>
          <option value="size">Size</option>
          <option value="favorites">Favorites</option>
        </select>
      </div>
    </div>
  </div>
</template>
