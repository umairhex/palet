<script setup lang="ts">
import { ref } from 'vue'
import { Star, Eye, Download, Edit2, Trash2, Loader } from 'lucide-vue-next'
import { type FontAsset, useFonts } from '@/composables/useFonts'
import { sanitizeCSSString } from '@/lib/utils'

const props = defineProps<{
  font: FontAsset
  customPreviewText: string
}>()

const emit = defineEmits<{
  (e: 'preview', id: number): void
  (e: 'delete', id: number): void
  (e: 'edit', font: FontAsset): void
  (e: 'updatePreview', text: string): void
}>()

const { toggleFavorite, downloadFontWithFeedback } = useFonts()

const isDownloading = ref(false)

const handleDownload = async () => {
  if (isDownloading.value) return
  isDownloading.value = true
  try {
    await downloadFontWithFeedback(props.font)
  } finally {
    isDownloading.value = false
  }
}
</script>

<template>
  <tr class="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
    <td class="px-6 py-5">
      <div class="flex items-center gap-3">
        <button
          @click="toggleFavorite(font.id)"
          :class="font.isFavorite ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'"
          class="shrink-0"
        >
          <Star class="size-4" :fill="font.isFavorite ? 'currentColor' : 'none'" />
        </button>
        <div class="min-w-0">
          <h5 class="font-bold text-gray-900 truncate">{{ font.name }}</h5>
          <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
            {{ font.category }}
          </p>
        </div>
      </div>
    </td>
    <td class="px-6 py-5 max-w-xs">
      <p
        class="text-lg truncate text-gray-700"
        :style="{ fontFamily: `'${sanitizeCSSString(font.name)}'` }"
      >
        {{ customPreviewText || font.previewText }}
      </p>
    </td>
    <td class="px-6 py-5 text-xs text-gray-400 font-medium">{{ font.size }}</td>
    <td class="px-6 py-5">
      <div class="flex gap-1">
        <button
          @click="emit('preview', font.id)"
          class="p-2 hover:bg-gray-100 text-gray-400 rounded-xl"
          title="Preview"
        >
          <Eye class="size-4" />
        </button>
        <button
          @click="handleDownload"
          :disabled="isDownloading"
          class="p-2 hover:bg-primary/10 hover:text-primary text-gray-400 rounded-xl disabled:opacity-50 disabled:cursor-wait"
          title="Download"
        >
          <Loader v-if="isDownloading" class="size-4 animate-spin" />
          <Download v-else class="size-4" />
        </button>
        <button
          @click="emit('edit', font)"
          class="p-2 hover:bg-gray-100 text-gray-400 rounded-xl"
          title="Edit"
        >
          <Edit2 class="size-4" />
        </button>
        <button
          @click="emit('delete', font.id)"
          class="p-2 hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-xl"
          title="Delete"
        >
          <Trash2 class="size-4" />
        </button>
      </div>
    </td>
  </tr>
</template>
