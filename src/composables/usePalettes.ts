import { computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { useSupabaseClient } from '@/lib/supabase'
import type { PaletteRow } from '@/lib/database.types'

export interface Palette {
  id: number
  name: string
  colors: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

function mapRow(row: PaletteRow): Palette {
  return {
    id: row.id,
    name: row.name,
    colors: row.colors,
    tags: row.tags ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function usePalettes() {
  const supabase = useSupabaseClient()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['palettes'],
    queryFn: async (): Promise<Palette[]> => {
      const { data, error } = await supabase
        .from('palettes')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data.map(mapRow)
    },
  })

  const palettes = computed(() => data.value ?? [])

  const savePaletteMutation = useMutation({
    mutationFn: async (input: { name: string; colors: string[]; tags?: string[] }) => {
      const { data, error } = await supabase
        .from('palettes')
        .insert({
          name: input.name,
          colors: input.colors,
          tags: input.tags?.length ? input.tags : ['Saved'],
        })
        .select()
        .single()
      if (error) throw error
      return mapRow(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['palettes'] })
    },
  })

  const updatePaletteMutation = useMutation({
    mutationFn: async (input: {
      id: number
      updates: Partial<{ name: string; colors: string[]; tags: string[] }>
    }) => {
      const { error } = await supabase
        .from('palettes')
        .update({ ...input.updates, updated_at: new Date().toISOString() })
        .eq('id', input.id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['palettes'] })
    },
  })

  const deletePaletteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from('palettes').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['palettes'] })
    },
  })

  const duplicatePaletteMutation = useMutation({
    mutationFn: async (id: number) => {
      const source = palettes.value.find((p) => p.id === id)
      if (!source) throw new Error('Palette not found')
      const { error } = await supabase.from('palettes').insert({
        name: `${source.name} (Copy)`,
        colors: source.colors,
        tags: source.tags,
      })
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['palettes'] })
    },
  })

  const allTags = computed(() => {
    const tags = new Set<string>()
    palettes.value.forEach((p) => p.tags?.forEach((t) => tags.add(t)))
    return Array.from(tags)
  })

  const savePalette = (name: string, colors: string[], tags: string[] = []) =>
    savePaletteMutation.mutateAsync({ name, colors, tags })

  const updatePalette = (
    id: number,
    updates: Partial<{ name: string; colors: string[]; tags: string[] }>,
  ) => updatePaletteMutation.mutateAsync({ id, updates })

  const deletePalette = (id: number) => deletePaletteMutation.mutateAsync(id)

  const duplicatePalette = (id: number) => duplicatePaletteMutation.mutateAsync(id)

  return {
    palettes,
    isLoading,
    error,
    allTags,
    savePalette,
    updatePalette,
    deletePalette,
    duplicatePalette,
    isSaving: computed(() => savePaletteMutation.isPending.value),
  }
}

export function formatTimeAgo(timestamp: string | number): string {
  const ms = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp
  const seconds = Math.floor((Date.now() - ms) / 1000)
  if (seconds < 10) return 'Just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(ms).toLocaleDateString()
}
