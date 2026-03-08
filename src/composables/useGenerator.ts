import { ref } from 'vue'
import { generateHarmony, generateScale, adjustPalette } from '../utils/color/generators'
import type { HarmonyMode } from '../utils/color/generators'

const GEN_STORAGE_KEY = 'palet-generator-state'

export interface ColorSlotType {
  hex: string
  isLocked: boolean
}

export function useGenerator() {
  const baseSeed = ref<string>('#FFFFFF')
  const colors = ref<ColorSlotType[]>([])
  const numColors = ref(5)
  const selectedRule = ref<HarmonyMode | 'random' | 'scale'>('random')

  const history = ref<string[][]>([])
  const historyIndex = ref(-1)
  const recentSessions = ref<string[][]>([])

  const generateRandomHex = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()
    )
  }

  const saveGeneratorState = () => {
    const state = {
      colors: colors.value,
      numColors: numColors.value,
      selectedRule: selectedRule.value,
      baseSeed: baseSeed.value,
      recentSessions: recentSessions.value,
    }
    localStorage.setItem(GEN_STORAGE_KEY, JSON.stringify(state))
  }

  const loadGeneratorState = (): boolean => {
    try {
      const raw = localStorage.getItem(GEN_STORAGE_KEY)
      if (raw) {
        const state = JSON.parse(raw)
        if (state.colors?.length) {
          colors.value = state.colors
          numColors.value = state.numColors ?? state.colors.length
          selectedRule.value = state.selectedRule ?? 'random'
          baseSeed.value = state.baseSeed ?? '#FFFFFF'
          recentSessions.value = state.recentSessions ?? []
          return true
        }
      }
    } catch {}
    return false
  }

  const saveToHistory = () => {
    const currentPalette = colors.value.map((s) => s.hex)
    if (currentPalette.length === 0) return

    const lastHistory = history.value[historyIndex.value]
    if (lastHistory && JSON.stringify(lastHistory) === JSON.stringify(currentPalette)) return

    if (historyIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, historyIndex.value + 1)
    }

    history.value.push(currentPalette)
    if (history.value.length > 50) history.value.shift()
    historyIndex.value = history.value.length - 1

    if (!recentSessions.value.some((p) => JSON.stringify(p) === JSON.stringify(currentPalette))) {
      recentSessions.value.unshift(currentPalette)
      if (recentSessions.value.length > 20) recentSessions.value.pop()
    }

    saveGeneratorState()
  }

  const undo = () => {
    if (historyIndex.value > 0) {
      historyIndex.value--
      const palette = history.value[historyIndex.value]
      if (palette) {
        colors.value = palette.map((hex, i) => ({
          hex,
          isLocked: colors.value[i]?.isLocked ?? false,
        }))
      }
    }
  }

  const redo = () => {
    if (historyIndex.value < history.value.length - 1) {
      historyIndex.value++
      const palette = history.value[historyIndex.value]
      if (palette) {
        colors.value = palette.map((hex, i) => ({
          hex,
          isLocked: colors.value[i]?.isLocked ?? false,
        }))
      }
    }
  }

  const randomize = (overrideBase?: string) => {
    let baseHex: string
    if (overrideBase) {
      baseHex = overrideBase
    } else {
      const lockedColor = colors.value.find((s) => s.isLocked)
      baseHex = lockedColor ? lockedColor.hex : generateRandomHex()
    }

    if (selectedRule.value === 'random') {
      if (colors.value.length === 0) {
        colors.value = Array.from({ length: numColors.value }, () => ({
          hex: generateRandomHex(),
          isLocked: false,
        }))
      } else {
        colors.value = colors.value.map((s) => ({
          ...s,
          hex: s.isLocked ? s.hex : generateRandomHex(),
        }))
      }
    } else if (selectedRule.value === 'scale') {
      baseSeed.value = baseHex
      const scale = generateScale(baseHex, numColors.value)
      colors.value = scale.map((hex, i) => {
        const existing = colors.value[i]
        return existing?.isLocked ? existing : { hex, isLocked: false }
      })
    } else {
      baseSeed.value = baseHex
      const harmony = generateHarmony(baseHex, selectedRule.value as HarmonyMode)
      colors.value = colors.value.map((s, i) => {
        if (s.isLocked) return s
        return { hex: harmony[i % harmony.length] || generateRandomHex(), isLocked: false }
      })

      if (colors.value.length === 0) {
        colors.value = Array.from({ length: numColors.value }, (_, i) => ({
          hex: harmony[i % harmony.length] || generateRandomHex(),
          isLocked: false,
        }))
      }
    }
    saveToHistory()
  }

  const handleApplyAdjustments = (adj: {
    brightness: number
    saturation: number
    temperature: number
  }) => {
    const hexes = colors.value.map((s) => s.hex)
    const adjusted = adjustPalette(hexes, {
      brightness: adj.brightness * 0.05,
      saturation: adj.saturation * 0.05,
      temperature: adj.temperature * 5,
    })

    colors.value = colors.value.map((s, i) => ({
      ...s,
      hex: s.isLocked ? s.hex : adjusted[i] || s.hex,
    }))
    saveToHistory()
  }

  const handleUpdateNumColors = (delta: number) => {
    const next = Math.max(2, Math.min(10, numColors.value + delta))
    if (next === numColors.value) return

    if (delta > 0) {
      for (let i = 0; i < delta; i++) {
        colors.value.push({ hex: generateRandomHex(), isLocked: false })
      }
    } else {
      for (let i = 0; i < Math.abs(delta); i++) {
        colors.value.pop()
      }
    }
    numColors.value = next
    randomize()
  }

  const importPalette = (str: string) => {
    const matches = str.match(/#[a-fA-F0-9]{3,6}/g)
    if (matches) {
      if (matches.length >= 2) {
        colors.value = matches.map((hex) => ({ hex: hex.toUpperCase(), isLocked: false }))
        numColors.value = colors.value.length
      } else if (matches.length === 1) {
        const newBase = matches[0].toUpperCase()
        if (colors.value.length === 0) {
          colors.value = [{ hex: newBase, isLocked: false }]
        } else if (colors.value[0]) {
          colors.value[0].hex = newBase
        }
        randomize(newBase)
      }
      saveToHistory()
    }
  }

  const restoreFromHistory = (palette: string[]) => {
    colors.value = palette.map((hex) => ({ hex, isLocked: false }))
    numColors.value = palette.length
    saveToHistory()
  }

  const toggleLock = (index: number) => {
    if (colors.value[index]) {
      colors.value[index].isLocked = !colors.value[index].isLocked
      saveGeneratorState()
    }
  }

  const lockAll = () => {
    colors.value = colors.value.map((s) => ({ ...s, isLocked: true }))
    saveGeneratorState()
  }

  const unlockAll = () => {
    colors.value = colors.value.map((s) => ({ ...s, isLocked: false }))
    saveGeneratorState()
  }

  const removeSlot = (index: number) => {
    if (colors.value.length <= 2) return
    colors.value.splice(index, 1)
    numColors.value = colors.value.length
    saveToHistory()
  }

  const moveSlot = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= colors.value.length) return
    const item = colors.value.splice(fromIndex, 1)[0]
    if (item) colors.value.splice(toIndex, 0, item)
    saveToHistory()
  }

  return {
    baseSeed,
    colors,
    numColors,
    selectedRule,
    history,
    historyIndex,
    recentSessions,
    undo,
    redo,
    randomize,
    handleApplyAdjustments,
    handleUpdateNumColors,
    importPalette,
    restoreFromHistory,
    toggleLock,
    lockAll,
    unlockAll,
    removeSlot,
    moveSlot,
    loadGeneratorState,
    saveToHistory,
  }
}
