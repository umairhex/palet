import { hexToRGB } from './conversions'

export function getLuminance(hex: string): number {
  const { r, g, b } = hexToRGB(hex)
  const rl = (c: number) => {
    const val = c / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * rl(r) + 0.7152 * rl(g) + 0.0722 * rl(b)
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1)
  const l2 = getLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRGB(hex)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}

export function getWCAGRating(ratio: number) {
  return {
    isAA: ratio >= 4.5,
    isAAA: ratio >= 7,
    isAALarge: ratio >= 3,
    score: ratio.toFixed(1),
  }
}
