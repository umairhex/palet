export interface RGB {
  r: number
  g: number
  b: number
}
export interface OKLab {
  l: number
  a: number
  b: number
}
export interface LCH {
  l: number
  c: number
  h: number
}

export function sRGBToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

export function linearToSRGB(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

export function rgbToOKLab({ r, g, b }: RGB): OKLab {
  const lr = sRGBToLinear(r / 255)
  const lg = sRGBToLinear(g / 255)
  const lb = sRGBToLinear(b / 255)

  const l_pre = 0.4122214708 * lr + 0.5363320363 * lg + 0.0514459929 * lb
  const m_pre = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb
  const s_pre = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb

  const l_ = Math.cbrt(l_pre)
  const m_ = Math.cbrt(m_pre)
  const s_ = Math.cbrt(s_pre)

  return {
    l: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  }
}

export function oklabToRGB({ l, a, b }: OKLab): RGB {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b
  const s_ = l - 0.0894841775 * a - 1.291485548 * b

  const lp = l_ * l_ * l_
  const mp = m_ * m_ * m_
  const sp = s_ * s_ * s_

  const r = +4.0767416621 * lp - 3.3077115913 * mp + 0.2309699292 * sp
  const g = -1.2684380046 * lp + 2.6097574011 * mp - 0.3413193965 * sp
  const b_ = -0.0041960863 * lp - 0.7034186147 * mp + 1.707614701 * sp

  return {
    r: Math.max(0, Math.min(255, linearToSRGB(r) * 255)),
    g: Math.max(0, Math.min(255, linearToSRGB(g) * 255)),
    b: Math.max(0, Math.min(255, linearToSRGB(b_) * 255)),
  }
}

export function labToLCH({ l, a, b }: OKLab): LCH {
  const c = Math.sqrt(a * a + b * b)
  let h = (Math.atan2(b, a) * 180) / Math.PI
  if (h < 0) h += 360
  return { l, c, h }
}

export function lchToLab({ l, c, h }: LCH): OKLab {
  const hRad = (h * Math.PI) / 180
  return {
    l,
    a: Math.cos(hRad) * c,
    b: Math.sin(hRad) * c,
  }
}

export function calculateDeltaE(lab1: OKLab, lab2: OKLab): number {
  return Math.sqrt(
    Math.pow(lab2.l - lab1.l, 2) + Math.pow(lab2.a - lab1.a, 2) + Math.pow(lab2.b - lab1.b, 2),
  )
}

export function hexToRGB(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => {
    const val = Math.max(0, Math.min(255, Math.round(n)))
    return val.toString(16).padStart(2, '0')
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
