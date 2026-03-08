import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { sanitizeCSSString } from '@/lib/utils'

export interface FontAsset {
  id: number
  name: string
  category: 'Sans Serif' | 'Serif' | 'Monospace' | 'Display' | 'Handwriting'
  previewText: string
  weight: string
  size: string
  addedAt: number
  uploadedAt: string
  isFavorite: boolean
  dataUrl?: string
}

const STORAGE_KEY = 'palet-fonts'
const INJECTED_FONTS = new Set<number>()

const defaultFonts: FontAsset[] = []

function loadFonts(): FontAsset[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) return parsed
    }
  } catch {}
  return defaultFonts
}

function persistFonts(fonts: FontAsset[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fonts))
}

function injectFontFace(font: FontAsset) {
  if (!font.dataUrl || INJECTED_FONTS.has(font.id)) return
  const safeName = sanitizeCSSString(font.name)
  const safeUrl = sanitizeCSSString(font.dataUrl)
  const style = document.createElement('style')

  style.textContent = `@font-face {
    font-family: '${safeName}';
    src: url('${safeUrl}') format('truetype');
    font-display: swap;
    font-weight: 100 900;
    font-stretch: 75% 125%;
  }`
  document.head.appendChild(style)
  INJECTED_FONTS.add(font.id)

  console.log(`LOG: Font face injected for "${safeName}" (ID: ${font.id})`)
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export const useFontStore = defineStore('font', () => {
  const fonts = ref<FontAsset[]>(loadFonts())

  fonts.value.forEach(injectFontFace)

  watch(fonts, (val) => persistFonts(val), { deep: true })

  const categories = computed(() => {
    const cats = new Set<string>()
    fonts.value.forEach((f) => cats.add(f.category))
    return Array.from(cats)
  })

  const addFont = (file: File): Promise<FontAsset> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        const fontName = file.name.replace(/\.(ttf|otf|woff|woff2)$/i, '').replace(/[-_]/g, ' ')
        const font: FontAsset = {
          id: Date.now(),
          name: fontName,
          category: 'Sans Serif',
          previewText: 'The quick brown fox jumps over the lazy dog.',
          weight: '1 Weight',
          size: formatFileSize(file.size),
          addedAt: Date.now(),
          uploadedAt: new Date().toISOString(),
          isFavorite: false,
          dataUrl,
        }
        injectFontFace(font)
        fonts.value.unshift(font)
        resolve(font)
      }
      reader.onerror = () => reject(new Error('Failed to read font file'))
      reader.readAsDataURL(file)
    })
  }

  const deleteFont = (id: number) => {
    fonts.value = fonts.value.filter((f) => f.id !== id)
  }

  const updateFont = (
    id: number,
    updates: Partial<Pick<FontAsset, 'name' | 'category' | 'previewText' | 'isFavorite'>>,
  ) => {
    const font = fonts.value.find((f) => f.id === id)
    if (font) {
      const oldName = font.name
      if (updates.name !== undefined) font.name = updates.name
      if (updates.category !== undefined) font.category = updates.category
      if (updates.previewText !== undefined) font.previewText = updates.previewText
      if (updates.isFavorite !== undefined) font.isFavorite = updates.isFavorite

      if (updates.name && oldName !== updates.name) {
        INJECTED_FONTS.delete(id)
        injectFontFace(font)
        console.log(
          `LOG: Font face re-injected after rename from "${oldName}" to "${updates.name}"`,
        )
      }
    }
  }

  const toggleFavorite = (id: number) => {
    const font = fonts.value.find((f) => f.id === id)
    if (font) font.isFavorite = !font.isFavorite
  }

  return { fonts, categories, addFont, deleteFont, updateFont, toggleFavorite }
})
