import { useHead } from '@unhead/vue'
import { computed } from 'vue'

export interface SchemaOrgOrganization {
  '@context'?: string
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
  contactPoint?: {
    '@type': 'ContactPoint'
    telephone?: string
    contactType: string
    email?: string
  }
}

export interface SchemaOrgWebsite {
  '@context'?: string
  '@type': 'WebSite'
  name: string
  url: string
  potentialAction?: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    query_input?: string
  }
}

export interface SchemaOrgBreadcrumb {
  '@context'?: string
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    url: string
  }>
}

export function useStructuredData(schema: Record<string, unknown>) {
  const schemaWithContext = computed(() => ({
    '@context': 'https://schema.org',
    ...schema,
  }))

  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schemaWithContext.value),
      },
    ],
  })
}

// Organization schema for homepage
export const ORGANIZATION_SCHEMA: SchemaOrgOrganization = {
  '@type': 'Organization',
  name: 'Palet',
  url: 'https://palet.umairrx.dev',
  logo: 'https://palet.umairrx.dev/logo.png',
  description:
    'A personal design asset vault for colors, palettes, and typography. Centralize scattered assets, sync across devices, and build stunning designs faster.',
  sameAs: ['https://twitter.com/palet', 'https://instagram.com/palet', 'https://github.com/palet'],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-xxx-xxx-xxxx',
    contactType: 'Customer Support',
    email: 'support@palet.umairrx.dev',
  },
}

// Website schema with search functionality
export const WEBSITE_SCHEMA: SchemaOrgWebsite = {
  '@type': 'WebSite',
  name: 'Palet',
  url: 'https://palet.umairrx.dev',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://palet.umairrx.dev/search?q={search_term_string}',
    },
    query_input: 'required name=search_term_string',
  },
}

// FAQSchema for homepage
export interface SchemaOrgFAQ {
  '@context'?: string
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export function createFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaOrgFAQ {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// Product/Service schema
export interface SchemaOrgProduct {
  '@context'?: string
  '@type': 'Product' | 'SoftwareApplication'
  name: string
  description: string
  image?: string
  url: string
  offers?: {
    '@type': 'Offer'
    price: string
    priceCurrency: string
  }
  aggregateRating?: {
    '@type': 'AggregateRating'
    ratingValue: number
    reviewCount: number
  }
}

export function createProductSchema(
  name: string,
  description: string,
  image?: string,
): SchemaOrgProduct {
  return {
    '@type': 'SoftwareApplication',
    name,
    description,
    image,
    url: 'https://palet.umairrx.dev',
  }
}

// Breadcrumb schema
export function createBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
): SchemaOrgBreadcrumb {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  }
}
