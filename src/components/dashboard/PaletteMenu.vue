<script setup lang="ts">
import { ref } from 'vue'
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Copy,
  Copy as CopyIcon,
  Download,
  ChevronRight,
} from 'lucide-vue-next'
import type { Palette } from '../../composables/usePalettes'
import { useToast } from '../../composables/useToast'
import { handlePaletteExport, type ExportFormat } from '../../utils/paletteExport'

import { useClipboard } from '../../composables/useClipboard'

const props = defineProps<{
  palette: Palette
}>()

const emit = defineEmits<{
  (e: 'start-edit'): void
  (e: 'duplicate'): void
  (e: 'delete'): void
}>()

const { toast } = useToast()
const { copy } = useClipboard()

const showMenu = ref(false)
const showExportSubmenu = ref(false)
const menuButtonRef = ref<HTMLButtonElement | null>(null)
const menuPos = ref<Record<string, string>>({})
const MENU_MAX_HEIGHT = 320

const openMenu = () => {
  if (menuButtonRef.value) {
    const rect = menuButtonRef.value.getBoundingClientRect()
    const spaceBelow = window.innerHeight - rect.bottom
    const right = `${window.innerWidth - rect.right}px`

    if (spaceBelow < MENU_MAX_HEIGHT && rect.top > MENU_MAX_HEIGHT) {
      menuPos.value = { bottom: `${window.innerHeight - rect.top + 6}px`, right }
    } else {
      menuPos.value = { top: `${rect.bottom + 6}px`, right }
    }
  }
  showMenu.value = true
}

const closeMenu = () => {
  showMenu.value = false
  showExportSubmenu.value = false
}

const copyAllColors = () => {
  const all = props.palette.colors.join(', ')
  copy(all, 'All colors copied!')
  closeMenu()
}

const handleExport = (format: ExportFormat) => {
  const label = handlePaletteExport(props.palette, format)
  toast(`Exported as ${label}!`, 'success')
  closeMenu()
}
</script>

<template>
  <div class="shrink-0">
    <button
      ref="menuButtonRef"
      @click.stop="showMenu ? closeMenu() : openMenu()"
      class="h-9 w-9 flex items-center justify-center hover:bg-gray-100 rounded-xl transition-colors text-gray-400 hover:text-gray-600"
      title="More options"
    >
      <MoreHorizontal class="size-5" />
    </button>

    <Teleport to="body">
      <div v-if="showMenu" class="fixed inset-0 z-40" @click="closeMenu"></div>

      <Transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="showMenu"
          :style="menuPos"
          class="fixed w-52 bg-white rounded-2xl border border-gray-100 shadow-2xl p-1.5 z-50 origin-top-right overflow-y-auto"
          :class="menuPos.bottom ? 'origin-bottom-right' : 'origin-top-right'"
          style="max-height: min(320px, 90vh)"
        >
          <button
            @click="
              () => {
                emit('start-edit')
                closeMenu()
              }
            "
            class="menu-item w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-3"
          >
            <Edit2 class="size-3.5 shrink-0 text-gray-400" /> Rename
          </button>
          <button
            @click="
              () => {
                emit('duplicate')
                closeMenu()
              }
            "
            class="menu-item w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-3"
          >
            <CopyIcon class="size-3.5 shrink-0 text-gray-400" /> Duplicate
          </button>
          <button
            @click="copyAllColors"
            class="menu-item w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-all flex items-center gap-3"
          >
            <Copy class="size-3.5 shrink-0 text-gray-400" /> Copy All Colors
          </button>

          <div class="h-px bg-gray-100 my-1 mx-2"></div>

          <div>
            <button
              @click.stop="showExportSubmenu = !showExportSubmenu"
              class="menu-item w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-primary hover:bg-primary/5 transition-all flex items-center gap-3"
            >
              <Download class="size-3.5 shrink-0" />
              <span class="flex-1">Export</span>
              <ChevronRight
                class="size-3.5 shrink-0 transition-transform"
                :class="{ 'rotate-90': showExportSubmenu }"
              />
            </button>
            <Transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
            >
              <div v-if="showExportSubmenu" class="mt-0.5 ml-6 space-y-0.5">
                <button
                  v-for="fmt in [
                    { key: 'json', label: 'JSON' },
                    { key: 'css', label: 'CSS Variables' },
                    { key: 'scss', label: 'SCSS Variables' },
                    { key: 'tailwind', label: 'Tailwind Config' },
                  ]"
                  :key="fmt.key"
                  @click.stop="handleExport(fmt.key as any)"
                  class="w-full text-left px-3 py-2 rounded-lg text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  {{ fmt.label }}
                </button>
              </div>
            </Transition>
          </div>

          <div class="h-px bg-gray-100 my-1 mx-2"></div>

          <button
            @click="
              () => {
                emit('delete')
                closeMenu()
              }
            "
            class="menu-item w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 transition-all flex items-center gap-3"
          >
            <Trash2 class="size-3.5 shrink-0" /> Delete
          </button>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
