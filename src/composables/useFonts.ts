import { computed, watch } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useSupabaseClient } from '@/lib/supabase'
import type { FontRow, FontUpdate } from '@/lib/database.types'

export type FontCategory = 'Sans Serif' | 'Serif' | 'Monospace' | 'Display' | 'Handwriting'

export interface FontAsset {
  id: number
  name: string
  category: FontCategory
  previewText: string
  weight: string
  size: string
  addedAt: string
  uploadedAt: string
  isFavorite: boolean
  storagePath: string | null
}

function mapRow(row: FontRow): FontAsset {
  return {
    id: row.id,
    name: row.name,
    category: row.category as FontCategory,
    previewText: row.preview_text,
    weight: row.weight,
    size: row.file_size,
    addedAt: row.added_at,
    uploadedAt: row.added_at,
    isFavorite: row.is_favorite,
    storagePath: row.storage_path,
  }
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

import { sanitizeCSSString } from '@/lib/utils'
import { useToast } from './useToast'

export function useFonts() {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const injectedFontIds = new Set<number>()

  const { data, isLoading, error } = useQuery({
    queryKey: ['fonts'],
    queryFn: async (): Promise<FontAsset[]> => {
      const { data, error } = await supabase
        .from('fonts')
        .select('*')
        .order('added_at', { ascending: false })
      if (error) throw error
      return data.map(mapRow)
    },
  })

  const fonts = computed(() => data.value ?? [])

  function getFontUrl(storagePath: string): string {
    const { data } = supabase.storage.from('fonts').getPublicUrl(storagePath)
    return data.publicUrl
  }

  function injectFontFace(name: string, url: string, id?: number) {
    if (id && injectedFontIds.has(id)) return

    const safeName = sanitizeCSSString(name)
    const safeUrl = sanitizeCSSString(url)
    const style = document.createElement('style')

    style.textContent = `@font-face {
      font-family: '${safeName}';
      src: url('${safeUrl}') format('truetype');
      font-display: swap;
      font-weight: 100 900;
      font-stretch: 75% 125%;
    }`
    document.head.appendChild(style)
    if (id) injectedFontIds.add(id)
  }

  function injectAllFonts() {
    fonts.value.forEach((f) => {
      if (f.storagePath) {
        injectFontFace(f.name, getFontUrl(f.storagePath), f.id)
      }
    })
  }

  watch(
    () => fonts.value.length,
    () => {
      injectAllFonts()
    },
  )

  const addFontMutation = useMutation({
    mutationFn: async (file: File): Promise<FontAsset> => {
      const ext = file.name.split('.').pop() ?? 'ttf'
      const storagePath = `${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('fonts')
        .upload(storagePath, file, { contentType: file.type || 'font/ttf', upsert: false })
      if (uploadError) throw uploadError

      const fontName = file.name.replace(/\.(ttf|otf|woff|woff2)$/i, '').replace(/[-_]/g, ' ')
      const { data, error: insertError } = await supabase
        .from('fonts')
        .insert({
          name: fontName,
          category: 'Sans Serif',
          file_size: formatFileSize(file.size),
          storage_path: storagePath,
        })
        .select()
        .single()
      if (insertError) throw insertError

      const url = getFontUrl(storagePath)
      injectFontFace(data.name, url)
      return mapRow(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fonts'] })
    },
  })

  const deleteFontMutation = useMutation({
    mutationFn: async (id: number) => {
      const font = fonts.value.find((f) => f.id === id)
      if (font?.storagePath) {
        await supabase.storage.from('fonts').remove([font.storagePath])
      }
      const { error } = await supabase.from('fonts').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fonts'] })
      toast('Font removed from vault', 'success')
    },
  })

  const updateFontMutation = useMutation({
    mutationFn: async (input: {
      id: number
      updates: Partial<{
        name: string
        category: string
        previewText: string
        isFavorite: boolean
      }>
    }) => {
      const dbUpdates: FontUpdate = {}
      if (input.updates.name !== undefined) dbUpdates.name = input.updates.name
      if (input.updates.category !== undefined) dbUpdates.category = input.updates.category
      if (input.updates.previewText !== undefined)
        dbUpdates.preview_text = input.updates.previewText
      if (input.updates.isFavorite !== undefined) dbUpdates.is_favorite = input.updates.isFavorite

      const { error } = await supabase.from('fonts').update(dbUpdates).eq('id', input.id)
      if (error) throw error
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['fonts'] })
      if (variables.updates.name) toast('Font details updated', 'success')
    },
  })

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (id: number) => {
      const font = fonts.value.find((f) => f.id === id)
      if (!font) throw new Error('Font not found')
      const { error } = await supabase
        .from('fonts')
        .update({ is_favorite: !font.isFavorite })
        .eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fonts'] })
    },
  })

  const categories = computed(() => {
    const cats = new Set<string>()
    fonts.value.forEach((f) => cats.add(f.category))
    return Array.from(cats)
  })

  const addFont = (file: File) => addFontMutation.mutateAsync(file)
  const deleteFont = (id: number) => deleteFontMutation.mutateAsync(id)
  const updateFont = (
    id: number,
    updates: Partial<{ name: string; category: string; previewText: string; isFavorite: boolean }>,
  ) => updateFontMutation.mutateAsync({ id, updates })
  const toggleFavorite = (id: number) => toggleFavoriteMutation.mutateAsync(id)

  async function downloadFont(asset: FontAsset) {
    if (!asset.storagePath) {
      throw new Error('Font has no storage path')
    }

    const { data, error } = await supabase.storage.from('fonts').download(asset.storagePath)
    if (error || !data) {
      throw error || new Error('Failed to download font')
    }

    const blobUrl = URL.createObjectURL(data)
    const ext = asset.storagePath.split('.').pop() || 'ttf'
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${asset.name}.${ext}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(blobUrl)
  }

  async function downloadFontWithFeedback(asset: FontAsset) {
    try {
      await downloadFont(asset)
      toast(`Downloaded ${asset.name}`, 'success')
    } catch (err) {
      toast(err instanceof Error ? err.message : 'Download failed', 'error')
    }
  }

  return {
    fonts,
    isLoading,
    error,
    categories,
    getFontUrl,
    injectAllFonts,
    addFont,
    deleteFont,
    updateFont,
    toggleFavorite,
    downloadFont,
    downloadFontWithFeedback,
    isUploading: computed(() => addFontMutation.isPending.value),
  }
}
