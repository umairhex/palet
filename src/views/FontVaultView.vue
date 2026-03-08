<script setup lang="ts">
import { ref } from 'vue'
import {
  Upload,
  Search,
  Filter,
  Grid,
  List,
  Download,
  Trash2,
  Eye,
  ShieldCheck,
  Type,
} from 'lucide-vue-next'
import Button from '../components/ui/Button.vue'

interface FontAsset {
  id: number
  name: string
  category: string
  previewText: string
  weight: string
  size: string
  addedAt: string
  isFavorite: boolean
}

const fonts = ref<FontAsset[]>([
  {
    id: 1,
    name: 'Inter',
    category: 'Sans Serif',
    previewText: 'Experience the clarity of modern design.',
    weight: '9 Weights',
    size: '1.2 MB',
    addedAt: '12 Oct 2023',
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Outfit',
    category: 'Sans Serif',
    previewText: 'A geometric approach to digital interfaces.',
    weight: '7 Weights',
    size: '840 KB',
    addedAt: '05 Nov 2023',
    isFavorite: false,
  },
  {
    id: 3,
    name: 'Playfair Display',
    category: 'Serif',
    previewText: 'Timeless elegance for premium branding.',
    weight: '6 Weights',
    size: '2.4 MB',
    addedAt: '20 Nov 2023',
    isFavorite: true,
  },
  {
    id: 4,
    name: 'JetBrains Mono',
    category: 'Monospace',
    previewText: 'const palet = "design workspace";',
    weight: '4 Weights',
    size: '1.1 MB',
    addedAt: '01 Dec 2023',
    isFavorite: false,
  },
])

const viewMode = ref<'grid' | 'list'>('grid')
</script>

<template>
  <div class="space-y-10 w-full max-w-(--breakpoint-2xl) mx-auto">
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h2 class="text-3xl font-black text-gray-900 mb-2">Font Vault</h2>
        <p class="text-gray-400 font-medium">Your personal collection of premium typefaces.</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
          <button
            @click="viewMode = 'grid'"
            :class="viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'"
            class="p-2 rounded-lg transition-all"
          >
            <Grid class="size-4" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-gray-400'"
            class="p-2 rounded-lg transition-all"
          >
            <List class="size-4" />
          </button>
        </div>
        <Button
          class="bg-emerald-accent hover:bg-emerald-accent-hover text-white rounded-2xl px-6 h-12 font-bold shadow-lg shadow-emerald-accent/20 gap-2"
        >
          <Upload class="size-5" />
          Upload Font (.ttf)
        </Button>
      </div>
    </div>

    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div class="relative flex-1 max-w-lg">
        <Search class="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search your vault..."
          class="h-12 w-full pl-11 pr-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-emerald-accent/5 focus:border-emerald-accent/30 transition-all"
        />
      </div>
      <div class="flex items-center gap-3">
        <select
          class="h-12 px-6 bg-white border border-gray-200 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-accent/5 cursor-pointer"
        >
          <option>All Types</option>
          <option>Sans Serif</option>
          <option>Serif</option>
          <option>Monospace</option>
        </select>
        <Button
          variant="outline"
          class="h-12 px-6 rounded-2xl border-gray-200 bg-white text-xs font-bold uppercase tracking-widest text-gray-600 gap-2"
        >
          <Filter class="size-4" />
          More Filters
        </Button>
      </div>
    </div>

    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="font in fonts"
        :key="font.id"
        class="bg-white border border-gray-200 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-emerald-accent/30 transition-all duration-500 group relative overflow-hidden"
      >
        <div
          class="absolute -top-10 -right-10 size-40 bg-emerald-accent/2 blur-3xl rounded-full group-hover:bg-emerald-accent/5 transition-colors"
        ></div>

        <div class="relative z-10 space-y-8">
          <div class="flex items-start justify-between">
            <div class="p-3 rounded-2xl bg-emerald-accent/10 text-emerald-accent">
              <Type class="size-6" />
            </div>
            <div class="flex items-center gap-2">
              <span
                class="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-gray-50 border border-gray-100 text-[10px] font-black uppercase tracking-tighter text-gray-400"
              >
                <ShieldCheck class="size-3" /> Licensed
              </span>
              <button class="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400">
                <Download class="size-5" />
              </button>
            </div>
          </div>

          <div>
            <h4 class="text-2xl font-black text-gray-900 mb-1">{{ font.name }}</h4>
            <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {{ font.category }} • {{ font.weight }}
            </p>
          </div>

          <div class="py-10 border-y border-gray-50">
            <p
              class="text-4xl text-gray-900 transition-all group-hover:tracking-tight overflow-hidden whitespace-nowrap text-ellipsis"
              :style="{ fontFamily: font.name }"
            >
              {{ font.previewText }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <p class="text-xs text-gray-400 font-medium italic">Uploaded {{ font.addedAt }}</p>
            <div class="flex gap-2">
              <Button
                variant="outline"
                class="h-10 px-5 rounded-xl border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50"
                >Manage</Button
              >
              <button
                class="p-2.5 hover:bg-red-50 hover:text-red-500 text-gray-300 rounded-xl transition-all"
              >
                <Trash2 class="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="bg-white border border-gray-200 rounded-4xl overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead class="bg-gray-50 border-b border-gray-100">
          <tr>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Name
            </th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Preview
            </th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Size
            </th>
            <th class="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="font in fonts"
            :key="font.id"
            class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
          >
            <td class="px-8 py-6">
              <h5 class="font-bold text-gray-900">{{ font.name }}</h5>
              <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                {{ font.category }}
              </p>
            </td>
            <td class="px-8 py-6 max-w-md">
              <p class="text-lg truncate text-gray-700" :style="{ fontFamily: font.name }">
                {{ font.previewText }}
              </p>
            </td>
            <td class="px-8 py-6 text-xs text-gray-400 font-medium">{{ font.size }}</td>
            <td class="px-8 py-6">
              <div class="flex gap-2">
                <button class="p-2.5 hover:bg-gray-100 text-gray-400 rounded-xl">
                  <Eye class="size-4" />
                </button>
                <button class="p-2.5 hover:bg-gray-100 text-gray-400 rounded-xl">
                  <Download class="size-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
