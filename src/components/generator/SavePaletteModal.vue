<script setup lang="ts">
import { ref } from 'vue'
import { X, Bookmark, Plus } from 'lucide-vue-next'
import Button from '../ui/Button.vue'

defineProps<{
  isOpen: boolean
  colors: string[]
  availableTags?: string[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', payload: { name: string; tags: string[] }): void
}>()

const paletteName = ref('')
const selectedTags = ref<string[]>([])
const newTag = ref('')

const toggleTag = (tag: string) => {
  const idx = selectedTags.value.indexOf(tag)
  if (idx >= 0) selectedTags.value.splice(idx, 1)
  else selectedTags.value.push(tag)
}

const addCustomTag = () => {
  const tag = newTag.value.trim()
  if (tag && !selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag)
  }
  newTag.value = ''
}

const handleSave = () => {
  if (paletteName.value.trim()) {
    emit('save', { name: paletteName.value.trim(), tags: [...selectedTags.value] })
    paletteName.value = ''
    selectedTags.value = []
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-70 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl space-y-8 animate-in zoom-in-95 duration-300"
    >
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-black tracking-tighter">Save Palette</h3>
        <button
          @click="$emit('close')"
          class="p-2 hover:bg-gray-100 rounded-full transition-all text-gray-400"
        >
          <X class="size-5" />
        </button>
      </div>

      <div class="space-y-6">
        <div class="flex gap-1.5 h-12">
          <div
            v-for="c in colors"
            :key="c"
            class="flex-1 rounded-xl shadow-sm border border-black/5"
            :style="{ backgroundColor: c }"
          ></div>
        </div>

        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
            Palette Name
          </p>
          <input
            v-model="paletteName"
            type="text"
            placeholder="e.g. Moonlight Dreams"
            autofocus
            class="w-full h-14 px-5 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary/30 outline-none transition-all"
            @keydown.enter="handleSave"
          />
        </div>

        <div class="space-y-3">
          <p class="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">Tags</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in availableTags || [
                'Brand',
                'Nature',
                'Ui',
                'Tech',
                'Marketing',
                'Dark Mode',
              ]"
              :key="tag"
              @click="toggleTag(tag)"
              class="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border"
              :class="
                selectedTags.includes(tag)
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'text-gray-400 border-gray-100 hover:bg-gray-50'
              "
            >
              {{ tag }}
            </button>
          </div>
          <div class="flex gap-2">
            <input
              v-model="newTag"
              type="text"
              placeholder="Custom tag..."
              class="flex-1 h-10 px-4 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              @keydown.enter.prevent="addCustomTag"
            />
            <button
              @click="addCustomTag"
              class="size-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl transition-colors text-gray-400"
            >
              <Plus class="size-4" />
            </button>
          </div>
        </div>

        <Button
          @click="handleSave"
          :disabled="!paletteName.trim()"
          class="w-full bg-primary hover:bg-primary-hover text-white rounded-2xl h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 gap-3 disabled:opacity-50"
        >
          <Bookmark class="size-5" />
          Save to Library
        </Button>
      </div>
    </div>
  </div>
</template>
