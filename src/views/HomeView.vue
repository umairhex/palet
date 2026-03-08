<script setup lang="ts">
import { useHead } from '@unhead/vue'
import HeroSection from '../components/landing/HeroSection.vue'
import UsageImpact from '../components/landing/UsageImpact.vue'
import ProductShowcase from '../components/landing/ProductShowcase.vue'
import InteractivePalette from '../components/landing/InteractivePalette.vue'
import ResourcesSection from '../components/landing/ResourcesSection.vue'
import TargetAudience from '../components/landing/TargetAudience.vue'
import FaqSection from '../components/landing/FaqSection.vue'
import TestimonialSection from '../components/landing/TestimonialSection.vue'
import BottomCTA from '../components/landing/BottomCTA.vue'
import { FAQ_ITEMS } from '../constants/landing'

// Set SEO metadata for homepage using Unhead directly
const SITE_NAME = 'Palet'
const title = `Design Asset Vault for Colors & Typography | ${SITE_NAME}`
const description =
  'A personal design asset vault for colors, palettes, and typography. Centralize scattered assets, sync across devices, and build stunning designs faster.'
const keywords =
  'color palette generator, design system, typography manager, color vault, design tools, asset management, font library'
const url = 'https://palet.umairrx.dev/'
const ogImage = 'https://palet.umairrx.dev/og-image.png'

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { name: 'keywords', content: keywords },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: url },
    { property: 'og:site_name', content: SITE_NAME },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:url', content: url },
  ],
  link: [{ rel: 'canonical', href: url }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url,
        description,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: 'support@palet.umairrx.dev',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}search?q={search_term_string}`,
          },
          query_input: 'required name=search_term_string',
        },
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }),
    },
  ],
})
</script>

<template>
  <div class="w-full flex flex-col min-h-[calc(100vh-80px)]">
    <HeroSection />
    <UsageImpact />
    <ProductShowcase />
    <InteractivePalette />
    <ResourcesSection />
    <TargetAudience />
    <FaqSection />
    <TestimonialSection />
    <BottomCTA />
  </div>
</template>
