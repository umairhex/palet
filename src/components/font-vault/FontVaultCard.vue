<script setup lang="ts">
import { ref } from 'vue'
import { Edit2, Eye, Download, Trash2, Check, X, Loader } from 'lucide-vue-next'
import { type FontAsset, useFonts } from '@/composables/useFonts'
import { sanitizeCSSString } from '@/lib/utils'
import { formatTimeAgo } from '@/composables/usePalettes'

const props = defineProps<{
  font: FontAsset
  isNew?: boolean
  customPreviewText: string
}>()

const emit = defineEmits<{
  (e: 'preview', id: number): void
  (e: 'delete', id: number): void
  (e: 'updatePreview', text: string): void
}>()

const { updateFont, downloadFontWithFeedback } = useFonts()

const isEditing = ref(false)
const editName = ref(props.font.name)
const editPreviewText = ref(props.font.previewText)
const isDownloading = ref(false)

const startEdit = () => {
  isEditing.value = true
  editName.value = props.font.name
  editPreviewText.value = props.font.previewText
}

const saveEdit = async () => {
  if (editName.value.trim()) {
    await updateFont(props.font.id, {
      name: editName.value.trim(),
      previewText: editPreviewText.value.trim() || undefined,
    })
    isEditing.value = false
  }
}

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
  <div
    class="bg-white border border-gray-200 rounded-3xl p-6 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden"
    :class="{
      'border-green-400 bg-green-50/30 shadow-md shadow-green-100': isNew,
    }"
  >
    <div class="relative z-10 flex flex-col gap-5">
      <div v-if="isEditing" class="space-y-2">
        <input
          v-model="editName"
          type="text"
          class="w-full h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-base font-black focus:ring-2 focus:ring-primary/20 outline-none"
          @keydown.enter="saveEdit"
          @keydown.escape="isEditing = false"
          autofocus
        />
        <select
          :value="font.category"
          @change="
            updateFont(font.id, { category: ($event.target as HTMLSelectElement).value as any })
          "
          class="w-full h-9 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest text-gray-600"
        >
          <option>Sans Serif</option>
          <option>Serif</option>
          <option>Monospace</option>
          <option>Display</option>
          <option>Handwriting</option>
        </select>
        <div class="flex gap-2 pt-1">
          <button
            @click="saveEdit"
            class="p-2 bg-primary text-white rounded-xl hover:bg-primary/90"
          >
            <Check class="size-4" />
          </button>
          <button
            @click="isEditing = false"
            class="p-2 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200"
          >
            <X class="size-4" />
          </button>
        </div>
      </div>
      <div v-else>
        <h4 class="text-xl font-black text-gray-900 mb-0.5 truncate" :title="font.name">
          {{ font.name }}
        </h4>
        <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          {{ font.category }} • {{ font.weight }}
        </p>
      </div>

      <div class="py-6 border-y border-gray-100">
        <input
          :value="customPreviewText || font.previewText"
          @input="emit('updatePreview', ($event.target as HTMLInputElement).value)"
          class="w-full text-3xl text-gray-900 bg-transparent border-none outline-none placeholder:text-gray-200 truncate"
          :style="{ fontFamily: `'${sanitizeCSSString(font.name)}'` }"
          placeholder="Type to preview…"
        />
      </div>

      <div class="items-center justify-between gap-2 hidden group-hover:flex transition-all">
        <p class="text-[11px] text-gray-400 font-medium truncate">
          {{ font.size }} • {{ formatTimeAgo(font.addedAt) }}
        </p>
        <div class="flex gap-1 shrink-0">
          <button
            @click="startEdit"
            class="p-2 hover:bg-blue-50 hover:text-blue-500 text-gray-300 rounded-xl transition-all"
            title="Edit"
          >
            <Edit2 class="size-3.5" />
          </button>
          <button
            @click="emit('preview', font.id)"
            class="p-2 hover:bg-gray-100 text-gray-300 rounded-xl transition-all"
            title="Preview"
          >
            <Eye class="size-3.5" />
          </button>
          <button
            @click="handleDownload"
            :disabled="isDownloading"
            class="p-2 hover:bg-blue-50 hover:text-blue-500 text-gray-300 rounded-xl transition-all disabled:opacity-50 disabled:cursor-wait"
            title="Download"
          >
            <Loader v-if="isDownloading" class="size-3.5 animate-spin" />
            <Download v-else class="size-3.5" />
          </button>
          <button
            @click="emit('delete', font.id)"
            class="p-2 hover:bg-red-50 hover:text-red-500 text-gray-300 rounded-xl transition-all"
            title="Delete"
          >
            <Trash2 class="size-3.5" />
          </button>
        </div>
      </div>
      <div class="flex items-center justify-between gap-2 group-hover:hidden transition-all">
        <p class="text-[11px] text-gray-400 font-medium truncate">
          {{ font.size }} • {{ formatTimeAgo(font.addedAt) }}
        </p>
      </div>
    </div>
  </div>
</template>
