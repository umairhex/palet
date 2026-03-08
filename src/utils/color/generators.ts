import { hexToRGB, rgbToOKLab, labToLCH, lchToLab, oklabToRGB, rgbToHex } from './conversions'
import { getContrastRatio } from './accessibility'
import type { LCH } from './conversions'

export type HarmonyMode =
  | 'analogous'
  | 'complementary'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'

const normalizeHue = (h: number) => ((h % 360) + 360) % 360

export function generateHarmony(baseHex: string, mode: HarmonyMode): string[] {
  const rgb = hexToRGB(baseHex)
  const lab = rgbToOKLab(rgb)
  const lch = labToLCH(lab)

  const angles: number[] = [0]

  switch (mode) {
    case 'analogous':
      angles.push(-30, 30)
      break
    case 'complementary':
      angles.push(180)
      break
    case 'triadic':
      angles.push(120, 240)
      break
    case 'split-complementary':
      angles.push(150, 210)
      break
    case 'tetradic':
      angles.push(90, 180, 270)
      break
  }

  return angles.map((angle) => {
    if (angle === 0) return baseHex
    const rotated: LCH = { ...lch, h: normalizeHue(lch.h + angle) }
    const lab_ = lchToLab(rotated)
    const rgb_ = oklabToRGB(lab_)
    return rgbToHex(rgb_)
  })
}

export function generateScale(baseHex: string, steps: number = 11): string[] {
  const rgb = hexToRGB(baseHex)
  const lab = rgbToOKLab(rgb)
  const lch = labToLCH(lab)

  const colors: string[] = []

  for (let i = 0; i < steps; i++) {
    const n = i / (steps - 1)

    const l = 0.98 - n * 0.88

    const chromaFactor = Math.max(0, -4 * Math.pow(n, 2) + 4 * n)

    const c = lch.c * (0.4 + 0.6 * chromaFactor)

    const h = normalizeHue(lch.h + n * 5)

    const scaleLch: LCH = { l, c, h }
    const lab_ = lchToLab(scaleLch)
    const rgb_ = oklabToRGB(lab_)
    colors.push(rgbToHex(rgb_))
  }

  return colors
}

export { getContrastRatio }

export function adjustColor(
  hex: string,
  adjustments: { brightness?: number; saturation?: number; temperature?: number },
): string {
  try {
    const rgb = hexToRGB(hex)
    const lab = rgbToOKLab(rgb)
    const lch = labToLCH(lab)

    if (adjustments.brightness !== undefined) {
      lch.l = Math.max(0, Math.min(1, lch.l + adjustments.brightness))
    }
    if (adjustments.saturation !== undefined) {
      lch.c = Math.max(0, lch.c + adjustments.saturation)
    }
    if (adjustments.temperature !== undefined) {
      lch.h = (lch.h + adjustments.temperature + 360) % 360
    }

    return rgbToHex(oklabToRGB(lchToLab(lch)))
  } catch {
    return hex
  }
}

export function generateTints(hex: string, steps: number = 6): string[] {
  const rgb = hexToRGB(hex)
  const lch = labToLCH(rgbToOKLab(rgb))
  const tints: string[] = []

  for (let i = 1; i <= steps; i++) {
    const l = lch.l + (1 - lch.l) * (i / (steps + 1))
    tints.push(rgbToHex(oklabToRGB(lchToLab({ ...lch, l }))))
  }
  return tints
}

export function generateShades(hex: string, steps: number = 6): string[] {
  const rgb = hexToRGB(hex)
  const lch = labToLCH(rgbToOKLab(rgb))
  const shades: string[] = []

  for (let i = 1; i <= steps; i++) {
    const l = lch.l * (1 - i / (steps + 1))
    shades.push(rgbToHex(oklabToRGB(lchToLab({ ...lch, l }))))
  }
  return shades
}

export function adjustPalette(
  colors: string[],
  adjustments: { brightness?: number; saturation?: number; temperature?: number },
): string[] {
  return colors.map((hex) => adjustColor(hex, adjustments))
}
