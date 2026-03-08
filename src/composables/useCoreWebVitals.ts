import { onMounted, ref } from 'vue'

export interface CoreWebVitals {
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay (deprecated but useful)
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
}

interface LargestContentfulPaintEntry extends PerformanceEntry {
  renderTime: number
  loadTime: number
}

interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean
  value: number
}

interface FirstInputEntry extends PerformanceEntry {
  processingDuration: number
}

const vitals = ref<CoreWebVitals>({})

/**
 * Monitor Core Web Vitals - Essential for SEO in 2026
 * Google uses these metrics for ranking and user experience
 * Helps identify performance bottlenecks
 */
export function useCoreWebVitals(onReport?: (vitals: CoreWebVitals) => void) {
  onMounted(() => {
    // Largest Contentful Paint (LCP)
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1] as LargestContentfulPaintEntry
        if (lastEntry) {
          vitals.value.lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime)
          console.log(`LCP: ${vitals.value.lcp}ms`)
          onReport?.(vitals.value)
        }
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    } catch (e) {
      console.warn('LCP observer not supported', e)
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutEntry = entry as LayoutShiftEntry
          if (layoutEntry.hadRecentInput) continue
          clsValue += layoutEntry.value
          vitals.value.cls = Math.round(clsValue * 1000) / 1000
          console.log(`CLS: ${vitals.value.cls}`)
          onReport?.(vitals.value)
        }
      })
      observer.observe({ type: 'layout-shift', buffered: true })
    } catch (e) {
      console.warn('CLS observer not supported', e)
    }

    // First Input Delay (FID) or Interaction to Next Paint (INP)
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const inputEntry = entry as FirstInputEntry
          vitals.value.fid = Math.round(inputEntry.processingDuration)
          console.log(`FID: ${vitals.value.fid}ms`)
          onReport?.(vitals.value)
        }
      })
      observer.observe({ entryTypes: ['first-input', 'interaction'] })
    } catch (e) {
      console.warn('FID observer not supported', e)
    }

    // Time to First Byte (TTFB)
    try {
      const navTiming = performance.getEntriesByType('navigation')[0]
      if (navTiming) {
        vitals.value.ttfb = Math.round(
          (navTiming as PerformanceNavigationTiming).responseStart -
            (navTiming as PerformanceNavigationTiming).fetchStart,
        )
        console.log(`TTFB: ${vitals.value.ttfb}ms`)
        onReport?.(vitals.value)
      }
    } catch (e) {
      console.warn('TTFB not available', e)
    }
  })

  return vitals
}

/**
 * Send vitals to analytics service
 * In production, send to your analytics endpoint (Vercel, Google Analytics, etc)
 */
export function reportWebVitals(payload: CoreWebVitals) {
  // Example: Send to your analytics service
  if (navigator.sendBeacon) {
    const body = JSON.stringify(payload)
    navigator.sendBeacon('/api/analytics/vitals', body)
  }
}
