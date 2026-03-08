<script setup lang="ts">
import { ref } from 'vue'
import { Check, Edit2, Trash2, X } from 'lucide-vue-next'
import { usePalettes, formatTimeAgo } from '../../composables/usePalettes'
import type { Palette } from '../../composables/usePalettes'

import PaletteColorStrip from './PaletteColorStrip.vue'
import PaletteMenu from './PaletteMenu.vue'
import AlertModal from '../ui/AlertModal.vue'

const props = defineProps<{
  palette: Palette
}>()

const emit = defineEmits<{
  (e: 'delete', id: number): void
  (e: 'duplicate', id: number): void
}>()

const { updatePalette } = usePalettes()

const isEditing = ref(false)
const editName = ref('')
const showDeleteConfirm = ref(false)

const startEdit = () => {
  editName.value = props.palette.name
  isEditing.value = true
}

const saveEdit = () => {
  if (editName.value.trim()) {
    updatePalette(props.palette.id, { name: editName.value.trim() })
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
}

const executeDelete = () => {
  emit('delete', props.palette.id)
  showDeleteConfirm.value = false
}
</script>

<template>
  <div
    class="palette-card group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-primary/30 duration-300"
  >
    <PaletteColorStrip :colors="palette.colors" />

    <div class="p-4 sm:p-5">
      <div class="flex items-center gap-2 mb-3 min-w-0">
        <template v-if="isEditing">
          <input
            v-model="editName"
            type="text"
            class="flex-1 min-w-0 h-9 px-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            @keydown.enter="saveEdit"
            @keydown.escape="cancelEdit"
            autofocus
          />
          <button
            @click="saveEdit"
            class="shrink-0 h-9 w-9 flex items-center justify-center bg-primary text-white rounded-xl hover:bg-primary/90 transition-all"
            title="Save"
          >
            <Check class="size-4" />
          </button>
          <button
            @click="cancelEdit"
            class="shrink-0 h-9 w-9 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200 transition-all"
            title="Cancel"
          >
            <X class="size-4" />
          </button>
        </template>

        <template v-else>
          <div class="flex-1 min-w-0">
            <h3
              class="text-base sm:text-lg font-bold text-gray-900 group-hover:text-primary transition-colors cursor-pointer truncate"
              @click="startEdit"
              :title="palette.name"
            >
              {{ palette.name }}
            </h3>
            <p class="text-[11px] text-gray-400 font-medium mt-0.5">
              Edited {{ formatTimeAgo(palette.updatedAt) }}
            </p>
          </div>

          <PaletteMenu
            :palette="palette"
            @start-edit="startEdit"
            @duplicate="$emit('duplicate', palette.id)"
            @delete="showDeleteConfirm = true"
          />
        </template>
      </div>

      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div class="flex gap-1.5 flex-wrap">
          <span
            v-for="tag in palette.tags"
            :key="tag"
            class="text-[9px] font-black uppercase tracking-widest text-gray-400 border border-gray-100 px-2 py-1 rounded-lg"
          >
            {{ tag }}
          </span>
        </div>

        <div
          v-if="!isEditing"
          class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <button
            @click="startEdit"
            class="h-8 w-8 flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 text-gray-400 rounded-xl transition-all"
            title="Rename"
          >
            <Edit2 class="size-3.5" />
          </button>
          <button
            @click="showDeleteConfirm = true"
            class="h-8 w-8 flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-gray-400 rounded-xl transition-all"
            title="Delete"
          >
            <Trash2 class="size-3.5" />
          </button>
        </div>
      </div>
    </div>

    <AlertModal
      :show="showDeleteConfirm"
      title="Delete Palette?"
      :message="`Are you sure you want to delete <strong>${palette.name}</strong>? This action cannot be undone.`"
      type="danger"
      confirm-text="Delete"
      @close="showDeleteConfirm = false"
      @confirm="executeDelete"
    />
  </div>
</template>
