# Palet SEO Configuration & Implementation Guide - 2026

This document outlines the comprehensive SEO improvements implemented for Palet in 2026.

## 📋 Table of Contents

1. [Technical SEO](#technical-seo)
2. [On-Page SEO](#on-page-seo)
3. [Structured Data](#structured-data)
4. [Performance & Core Web Vitals](#performance--core-web-vitals)
5. [Content Optimization](#content-optimization)
6. [Mobile & Accessibility](#mobile--accessibility)

## Technical SEO

### Index & Discovery

✅ **robots.txt** (`/public/robots.txt`)

- Configured crawl rules for all major search engines
- Defined sitemap locations
- Set crawl delay to prevent server overload
- Excluded sensitive pages (/auth/, /admin/)

✅ **XML Sitemaps** (`/public/sitemap.xml`)

- Static sitemap with all main routes
- Last modified dates for cache optimization
- Priority and change frequency hints
- Mobile sitemap ready

✅ **Canonical URLs**

- Implemented in `useHead.ts` composable
- Prevents duplicate content issues
- Points to single authoritative version

### Meta Tags

✅ **Base HTML** (`/index.html`)

```html
- Language attribute: lang="en" - Charset: UTF-8 - Viewport: responsive (mobile-first) - Theme
color: #1f2937 - CSP headers for security
```

✅ **Dynamic Meta Tags** (`/src/composables/useHead.ts`)

- Title tags optimized for CTR and branding
- Meta descriptions for all pages
- Keywords targeting (not overoptimized)
- Open Graph tags for social sharing
- Twitter Card tags for X integration

### URL Structure

✅ **SEO-Friendly Routes**

- `/` - Homepage
- `/generator` - Color generator tool
- `/palettes` - Palette library
- `/fonts` - Font vault
- `/docs` - Documentation
- `/privacy`, `/terms`, `/cookies` - Legal pages

### Performance Headers

✅ **HTTP/2 Server Push**
Recommended Nginx/Apache directives:

```
# Preconnect to external resources
Link: <https://images.unsplash.com>; rel=preconnect
Link: <https://fonts.googleapis.com>; rel=preconnect
```

## On-Page SEO

### Router Config (`/src/router/index.ts`)

Each route includes metadata:

```typescript
{
  title: string,          // Page title for <title> tag
  description: string,    // Meta description
  keywords: string[],     // Target keywords
  noindex?: boolean,      // robots meta
}
```

Pages SEO Configuration:

- **Home** - Primary keyword focus, comprehensive
- **Generator** - Tool-specific keywords
- **Palettes** - Library search optimization
- **Fonts** - Typography-focused keywords
- **Docs** - Help/support content
- **Legal Pages** - noindex=true (no ranking needed)

### Composables

✅ **useSEO.ts**

- Dynamic meta tag injection
- Automatic title formatting with brand name
- Social meta tags generation
- Structured data preparation

✅ **useStructuredData.ts**

- JSON-LD schema generation
- Organization schema
- WebSite schema with SearchAction
- Product/SoftwareApplication schema
- FAQ schema
- Breadcrumb schema support

✅ **useCoreWebVitals.ts**

- Monitors Largest Contentful Paint (LCP)
- Tracks Cumulative Layout Shift (CLS)
- Measures First Input Delay (FID)
- Reports Time to First Byte (TTFB)

## Structured Data

### Implemented Schema.org Types

✅ **Organization Schema**

```json
{
  "@type": "Organization",
  "name": "Palet",
  "url": "https://palet.umairrx.dev",
  "logo": "https://palet.umairrx.dev/logo.png",
  "sameAs": ["twitter", "instagram", "github"],
  "contactPoint": { ... }
}
```

✅ **WebSite Schema (with SearchAction)**

```json
{
  "@type": "WebSite",
  "name": "Palet",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://palet.umairrx.dev/search?q={search_term_string}"
  }
}
```

✅ **SoftwareApplication Schema**

```json
{
  "@type": "SoftwareApplication",
  "name": "Palet",
  "description": "...",
  "url": "https://palet.umairrx.dev"
}
```

✅ **FAQPage Schema**

- Auto-generated from FAQ_ITEMS in constants
- Each Q&A item properly structured
- Rich snippet eligible on SERP

✅ **BreadcrumbList Schema**

- Ready for implementation on subpages
- Improves navigation in search results

## Performance & Core Web Vitals

### 2026 Google Core Web Vitals Thresholds

| Metric | Good    | Needs Improvement | Poor     |
| ------ | ------- | ----------------- | -------- |
| LCP    | ≤ 2.5s  | 2.5s - 4s         | > 4s     |
| FID    | ≤ 100ms | 100-300ms         | > 300ms  |
| CLS    | ≤ 0.1   | 0.1 - 0.25        | > 0.25   |
| TTFB   | ≤ 800ms | 800ms - 1800ms    | > 1800ms |

### Performance Monitoring

✅ **Core Web Vitals Tracking**

```typescript
import { useCoreWebVitals } from './composables/useCoreWebVitals'

useCoreWebVitals((vitals) => {
  // Send to analytics
  reportWebVitals(vitals)
})
```

### Optimization Recommendations

#### For LCP (Largest Contentful Paint)

1. **Images**

   ```html
   <img loading="lazy" decoding="async" src="..." alt="..." />
   <img srcset="small.jpg 400w, large.jpg 1000w" />
   ```

2. **Critical CSS**
   - Move above-fold styles to inline CSS
   - Defer non-critical CSS
   - Minimize CSS size

3. **Third-party Scripts**
   ```html
   <script async></script>
   <script defer></script>
   ```

#### For CLS (Cumulative Layout Shift)

1. **Reserved Space**

   ```css
   /* Set explicit width/height for images */
   img {
     width: 100%;
     height: auto;
     aspect-ratio: 16/9;
   }

   /* Ad/embed containers */
   .ad-container {
     width: 300px;
     height: 250px;
   }
   ```

2. **Font Optimization**
   ```css
   @font-face {
     font-display: swap; /* Shows fallback immediately */
   }
   ```

#### For TTFB (Time to First Byte)

1. **Use CDN** - Vercel Edge Network recommended
2. **Enable Compression** - gzip/brotli
3. **Database Optimization** - Connection pooling
4. **Caching** - Browser cache, server-side cache

## Content Optimization

### Heading Hierarchy

✅ **H1 Tags**

- One primary H1 per page
- Contains main keyword
- Describes page content

✅ **H2-H3 Tags**

- Support hierarchy
- Include related keywords
- Break content into sections

### Internal Linking

✅ **Strategic Links**

- Relevant anchor text (not "click here")
- Links to high-priority pages
- Proper link context

Example:

```html
<router-link to="/generator"> Color palette generator tool </router-link>
```

### Keyword Optimization

Current keyword targets:

- **Primary**: color palette generator, design asset vault
- **Secondary**: typography manager, font library, design system
- **Long-tail**: color harmony generator, font vault management

## Mobile & Accessibility

### Mobile Optimization

✅ **Responsive Design**

- Mobile-first approach
- Tests on all breakpoints
- Touch-friendly buttons (min 48x48px)

✅ **Mobile-Specific Meta Tags**

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="apple-mobile-web-app-title" content="Palet" />
```

✅ **Progressive Web App Support**

- Web App Manifest (`/public/site.webmanifest`)
- Service Worker ready
- App shortcuts (Generator, Library)

### Accessibility (a11y)

✅ **WCAG 2.1 AA Standard**

- Semantic HTML
- ARIA labels where needed
- Color contrast ratios (4.5:1 for normal text)
- Keyboard navigation support

## Monitoring & Analytics

### Tools to Set Up

1. **Google Search Console**
   - Submit sitemap
   - Monitor indexation
   - Fix crawl errors
   - Check mobile usability

2. **Google Analytics 4**
   - Track user behavior
   - Monitor bounce rate
   - Measure conversions
   - Analyze content performance

3. **Lighthouse**
   - Automated SEO audit
   - Performance scoring
   - Accessibility checks
   - Best practices validation

4. **Vercel Analytics** (if using Vercel)
   - Real-world Core Web Vitals
   - User experience metrics

### Recommended Monitoring Script

```typescript
// Send Core Web Vitals to analytics
export function reportWebVitals(payload: CoreWebVitals) {
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      timestamp: new Date().toISOString(),
      ...payload,
    })
    navigator.sendBeacon('/api/analytics/vitals', body)
  }
}
```

## Testing Checklist

- [ ] Each page passes Lighthouse audit (90+ score)
- [ ] Mobile usability report in GSC shows no issues
- [ ] Core Web Vitals all in "Good" range
- [ ] Structured data validates in Google's testing tool
- [ ] Meta tags render correctly in social previews
- [ ] All internal links work correctly
- [ ] robots.txt allows important pages
- [ ] Sitemap.xml valid and submittable to GSC
- [ ] OG images display at 1200x630px minimum
- [ ] HTTPS enabled (not HTTP)

## Next Steps

1. **Submit to Search Engines**

   ```
   Google: google.com/search-console
   Bing: bing.com/webmasters
   ```

2. **Request Indexing**
   - Submit sitemap via GSC
   - Use "Request Indexing" for new pages

3. **Monitor Rankings**
   - Set up rank tracking tool
   - Monitor target keywords
   - Adjust strategy based on data

4. **Regular Audits**
   - Run Lighthouse monthly
   - Check Core Web Vitals trends
   - Review Search Console crawl errors

5. **Content Strategy**
   - Create pillar content pages
   - Develop topic clusters
   - Build internal linking strategy
   - Plan content calendar

## References

- [Google SEO Starter Guide (2026)](https://developers.google.com/search/docs)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev Learning Path](https://web.dev/learn/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)

---

Last Updated: March 8, 2026
Version: 1.0
