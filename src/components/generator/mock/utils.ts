export const getContrastColor = (hex?: string): string => {
  if (!hex) return '#ffffff'
  let cleanHex = hex
  if (hex.startsWith('#')) {
    cleanHex = hex.slice(1)
  }

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const r = parseInt(cleanHex.slice(0, 2), 16) || 0
  const g = parseInt(cleanHex.slice(2, 4), 16) || 0
  const b = parseInt(cleanHex.slice(4, 6), 16) || 0
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}

export const c = (index: number, colors: { hex: string }[]) => Math.min(index, colors.length - 1)
