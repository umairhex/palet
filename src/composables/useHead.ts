import { useHead } from '@unhead/vue'

export interface SEOMetadata {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string[]
  type?: 'website' | 'article' | 'product'
  noindex?: boolean
  nofollow?: boolean
  author?: string
  publishedDate?: string
  modifiedDate?: string
}

const SITE_NAME = 'Palet'
const SITE_URL = 'https://palet.umairrx.dev'
const DEFAULT_IMAGE = 'https://palet.umairrx.dev/og-image.png'
const DEFAULT_DESCRIPTION =
  'A personal design asset vault for colors, palettes, and typography. Centralize scattered assets, sync across devices, and build stunning designs faster.'

export function useSEO(metadata: SEOMetadata) {
  const title = metadata.title
    ? `${metadata.title} | ${SITE_NAME}`
    : `${SITE_NAME} - Design Asset Vault for Colors & Typography`
  const description = metadata.description || DEFAULT_DESCRIPTION
  const image = metadata.image || DEFAULT_IMAGE
  const url = metadata.url || SITE_URL
  const keywords = (metadata.keywords || []).join(', ')

  const metaTags = [
    { name: 'description', content: description },
    ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
    ...(!metadata.noindex
      ? [
          {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ]
      : []),
    ...(metadata.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
    { property: 'og:type', content: metadata.type || 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: SITE_NAME },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:url', content: url },
    ...(metadata.publishedDate
      ? [{ property: 'article:published_time', content: metadata.publishedDate }]
      : []),
    ...(metadata.modifiedDate
      ? [{ property: 'article:modified_time', content: metadata.modifiedDate }]
      : []),
    ...(metadata.author ? [{ property: 'article:author', content: metadata.author }] : []),
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#1f2937' },
  ]

  useHead({
    title,
    meta: metaTags,
    link: [{ rel: 'canonical', href: url }],
  })
}
