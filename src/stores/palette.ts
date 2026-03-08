import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Palette {
  id: number
  name: string
  colors: string[]
  updatedAt: string
  tags: string[]
}

export const usePaletteStore = defineStore('palette', () => {
  const palettes = ref<Palette[]>([
    {
      id: 1,
      name: 'Emerald Forest',
      colors: ['#0F2A22', '#1A3C34', '#10B981', '#4ADE80', '#F4F7F2'],
      updatedAt: '2 hours ago',
      tags: ['Brand', 'Nature'],
    },
    {
      id: 2,
      name: 'Sunset Glow',
      colors: ['#0B0F14', '#F49A40', '#FBBF24', '#F97316', '#F87171'],
      updatedAt: '5 hours ago',
      tags: ['Ui', 'Marketing'],
    },
    {
      id: 3,
      name: 'Deep Sea',
      colors: ['#0F172A', '#1E293B', '#3B82F6', '#818CF8', '#A855F7'],
      updatedAt: '1 day ago',
      tags: ['Dark Mode', 'Tech'],
    },
  ])

  const savePalette = (name: string, colors: string[]) => {
    palettes.value.unshift({
      id: Date.now(),
      name,
      colors,
      updatedAt: 'Just now',
      tags: ['Saved'],
    })
  }

  const deletePalette = (id: number) => {
    palettes.value = palettes.value.filter((p) => p.id !== id)
  }

  return { palettes, savePalette, deletePalette }
})
