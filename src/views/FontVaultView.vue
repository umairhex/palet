<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFonts } from '@/composables/useFonts'
import { useCollectionSearch } from '@/composables/useCollectionSearch'
import { useFontUpload } from '@/composables/useFontUpload'
import type { FontAsset } from '@/composables/useFonts'

import FontVaultToolbar from '@/components/font-vault/FontVaultToolbar.vue'
import FontVaultCard from '@/components/font-vault/FontVaultCard.vue'
import FontVaultTableRow from '@/components/font-vault/FontVaultTableRow.vue'
import FontVaultEmptyState from '@/components/font-vault/FontVaultEmptyState.vue'
import AlertModal from '@/components/ui/AlertModal.vue'
import FontUploadStatus from '@/components/font-vault/FontUploadStatus.vue'
import FontPreviewModal from '@/components/dashboard/FontPreviewModal.vue'

const { fonts, deleteFont } = useFonts()
const { isUploading, uploadProgress, uploadingFiles, newFontIds, uploadFonts } = useFontUpload()

const viewMode = ref<'grid' | 'list'>('grid')
const previewFontId = ref<number | null>(null)
const fontToDelete = ref<number | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)
const customPreviewTexts = ref<Record<number, string>>({})

const {
  searchQuery,
  activeCategory: categoryFilter,
  sortBy,
  filteredItems: filteredFonts,
} = useCollectionSearch(fonts, {
  searchFields: ['name', 'category'],
  categoryField: 'category',
  allCategoryLabel: 'All Types',
  defaultSort: 'date',
  sortStrategies: {
    name: (a: FontAsset, b: FontAsset) => a.name.localeCompare(b.name),
    size: (a: FontAsset, b: FontAsset) =>
      (parseInt(a.size || '0') || 0) - (parseInt(b.size || '0') || 0),
    date: (a: FontAsset, b: FontAsset) =>
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    favorites: (a: FontAsset, b: FontAsset) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0),
  },
})

const previewFontData = computed(
  () => fonts.value.find((f) => f.id === previewFontId.value) ?? null,
)

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragOver.value = false
  uploadFonts(e.dataTransfer?.files ?? null)
}

const executeDelete = async () => {
  if (fontToDelete.value) {
    await deleteFont(fontToDelete.value)
    fontToDelete.value = null
  }
}
</script>

<template>
  <div class="space-y-8 w-full max-w-screen-2xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <input
      ref="fileInput"
      type="file"
      accept=".ttf,.otf,.woff,.woff2"
      multiple
      class="hidden"
      @change="uploadFonts(($event.target as HTMLInputElement).files)"
    />

    <FontVaultToolbar
      v-model:viewMode="viewMode"
      v-model:searchQuery="searchQuery"
      v-model:categoryFilter="categoryFilter"
      v-model:sortBy="sortBy"
      :is-uploading="isUploading"
      @upload="fileInput?.click()"
    />

    <div
      class="min-h-100"
      @dragover.prevent="isDragOver = true"
      @dragleave="isDragOver = false"
      @drop="onDrop"
    >
      <FontVaultEmptyState
        v-if="filteredFonts.length === 0"
        :is-no-results="!!searchQuery || categoryFilter !== 'All Types'"
        :is-drag-over="isDragOver"
        @upload="fileInput?.click()"
      />

      <div
        v-else-if="viewMode === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
      >
        <FontVaultCard
          v-for="font in filteredFonts"
          :key="font.id"
          :font="font"
          :is-new="newFontIds.has(font.id)"
          :custom-preview-text="customPreviewTexts[font.id] || ''"
          @preview="previewFontId = $event"
          @delete="fontToDelete = $event"
          @updatePreview="customPreviewTexts[font.id] = $event"
        />
      </div>

      <div
        v-else
        class="bg-white border border-gray-200 rounded-3xl overflow-hidden hidden md:block"
      >
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 border-b border-gray-100">
            <tr>
              <th
                class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 w-1/4"
              >
                Name
              </th>
              <th class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                Preview
              </th>
              <th
                class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 w-24"
              >
                Size
              </th>
              <th
                class="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 w-40"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <FontVaultTableRow
              v-for="font in filteredFonts"
              :key="font.id"
              :font="font"
              :custom-preview-text="customPreviewTexts[font.id] || ''"
              @preview="previewFontId = $event"
              @delete="fontToDelete = $event"
              @updatePreview="customPreviewTexts[font.id] = $event"
            />
          </tbody>
        </table>
      </div>

      <div v-if="viewMode === 'list' && filteredFonts.length > 0" class="md:hidden space-y-3">
        <FontVaultCard
          v-for="font in filteredFonts"
          :key="font.id"
          :font="font"
          :is-new="newFontIds.has(font.id)"
          :custom-preview-text="customPreviewTexts[font.id] || ''"
          @preview="previewFontId = $event"
          @delete="fontToDelete = $event"
          @updatePreview="customPreviewTexts[font.id] = $event"
        />
      </div>
    </div>

    <FontPreviewModal
      v-if="previewFontData"
      :font="previewFontData"
      :is-open="!!previewFontId"
      @close="previewFontId = null"
    />

    <AlertModal
      :show="!!fontToDelete"
      title="Delete Font"
      message="Are you sure you want to remove this font from your vault? This will also remove it from storage."
      type="danger"
      confirm-text="Remove"
      @close="fontToDelete = null"
      @confirm="executeDelete"
    />

    <FontUploadStatus
      :is-uploading="isUploading"
      :upload-progress="uploadProgress"
      :uploading-files="uploadingFiles"
    />
  </div>
</template>
