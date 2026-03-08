export interface PaletteExport {
  name: string
  colors: string[]
  tags?: string[]
}

export type ExportFormat = 'json' | 'css' | 'tailwind' | 'scss' | 'figma'

export function exportAsJSON(palette: PaletteExport): string {
  return JSON.stringify(palette, null, 2)
}

export function exportAsCSS(palette: PaletteExport): string {
  const cleanName = palette.name.toLowerCase().replace(/\s+/g, '-')
  const variables = palette.colors
    .map((color, i) => `  --${cleanName}-${i + 1}: ${color};`)
    .join('\n')

  return `:root {\n${variables}\n}`
}

export function exportAsSCSS(palette: PaletteExport): string {
  const cleanName = palette.name.toLowerCase().replace(/\s+/g, '-')
  const variables = palette.colors.map((color, i) => `$${cleanName}-${i + 1}: ${color};`).join('\n')

  return variables
}

export function exportAsTailwind(palette: PaletteExport): string {
  const cleanName = palette.name.toLowerCase().replace(/\s+/g, '-')
  const colors = palette.colors.reduce(
    (acc, color, i) => {
      acc[`'${i + 1}'`] = `'${color}'`
      return acc
    },
    {} as Record<string, string>,
  )

  return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n        '${cleanName}': {\n          ${Object.entries(
    colors,
  )
    .map(([k, v]) => `${k}: ${v}`)
    .join(',\n          ')}\n        }\n      }\n    }\n  }\n}`
}

export function exportAsFigmaTokens(palette: PaletteExport): string {
  const tokens = {
    [palette.name]: {
      value: palette.colors,
      type: 'color',
    },
  }

  return JSON.stringify({ tokens }, null, 2)
}

export function downloadFile(
  content: string,
  filename: string,
  mimeType: string = 'text/plain',
): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function handlePaletteExport(palette: PaletteExport, format: ExportFormat) {
  let content = ''
  let ext = 'txt'

  switch (format) {
    case 'json':
      content = exportAsJSON(palette)
      ext = 'json'
      break
    case 'css':
      content = exportAsCSS(palette)
      ext = 'css'
      break
    case 'scss':
      content = exportAsSCSS(palette)
      ext = 'scss'
      break
    case 'tailwind':
      content = exportAsTailwind(palette)
      ext = 'js'
      break
    case 'figma':
      content = exportAsFigmaTokens(palette)
      ext = 'json'
      break
  }

  const filename = `${palette.name.toLowerCase().replace(/\s+/g, '-')}.${ext}`
  downloadFile(content, filename)
  return format.toUpperCase()
}

export function importFromJSON(jsonString: string): PaletteExport | null {
  try {
    const parsed = JSON.parse(jsonString)
    if (parsed.name && Array.isArray(parsed.colors)) {
      return {
        name: parsed.name,
        colors: parsed.colors.filter((c: string) => /^#[0-9A-F]{6,8}$/i.test(c)),
        tags: parsed.tags || [],
      }
    }
    return null
  } catch {
    return null
  }
}
