#!/usr/bin/env node

/**
 * Palet SEO Validation Script
 * Validates SEO configuration and best practices before deployment
 * Run: npm run validate-seo or pnpm validate-seo
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const results = []

function check(name, condition, passMessage, failMessage, severity = 'FAIL') {
  results.push({
    name,
    status: condition ? 'PASS' : severity,
    message: condition ? passMessage : failMessage,
  })
}

console.log('🔍 Running Palet SEO Validation...\n')

// 1. Check index.html SEO tags
console.log('📄 Checking index.html...')
const indexPath = path.join(__dirname, '..', 'index.html')
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf-8')

  check(
    'Language attribute',
    indexContent.includes('lang="en"'),
    'Language attribute set correctly',
    'Missing or incorrect lang attribute in HTML tag',
  )

  check(
    'Meta charset',
    indexContent.includes('charset="UTF-8"') || indexContent.includes('charset=UTF-8'),
    'UTF-8 charset declared',
    'Missing UTF-8 charset declaration',
  )

  check(
    'Main meta description',
    indexContent.includes('<meta name="description"'),
    'Main meta description found',
    'Missing main meta description tag',
  )

  check(
    'Open Graph tags',
    indexContent.includes('property="og:title"') &&
      indexContent.includes('property="og:description"'),
    'Open Graph tags implemented',
    'Missing Open Graph tags',
  )

  check(
    'Twitter Card tags',
    indexContent.includes('name="twitter:card"'),
    'Twitter Card tags implemented',
    'Missing Twitter Card tags',
  )

  check(
    'Viewport meta tag',
    indexContent.includes('viewport'),
    'Responsive viewport configured',
    'Missing viewport meta tag',
  )

  check(
    'robots.txt reference',
    indexContent.includes('robots'),
    'Robots meta tag found',
    'Missing robots meta tag',
    'WARN',
  )
}

// 2. Check router configuration
console.log('🛣️  Checking router configuration...')
const routerPath = path.join(__dirname, '..', 'src/router/index.ts')
if (fs.existsSync(routerPath)) {
  const routerContent = fs.readFileSync(routerPath, 'utf-8')

  check(
    'Route meta tags',
    routerContent.includes('meta:') && routerContent.includes('title:'),
    'Routes have meta information',
    'Routes missing meta information',
  )

  check(
    'Home page configuration',
    routerContent.includes("name: 'home'"),
    'Home route configured',
    'Home route missing from router',
  )
}

// 3. Check composables
console.log('🔧 Checking SEO composables...')
const useHeadPath = path.join(__dirname, '..', 'src/composables/useHead.ts')
const structuredDataPath = path.join(__dirname, '..', 'src/composables/useStructuredData.ts')
const webVitalsPath = path.join(__dirname, '..', 'src/composables/useCoreWebVitals.ts')

check(
  'useHead composable',
  fs.existsSync(useHeadPath),
  'SEO composable exists',
  'Missing useHead.ts composable',
)

check(
  'useStructuredData composable',
  fs.existsSync(structuredDataPath),
  'Structured data composable exists',
  'Missing useStructuredData.ts composable',
)

check(
  'useCoreWebVitals composable',
  fs.existsSync(webVitalsPath),
  'Core Web Vitals monitoring exists',
  'Missing useCoreWebVitals.ts composable',
  'WARN',
)

// 4. Check static files
console.log('📱 Checking static SEO files...')
const robotsPath = path.join(__dirname, '..', 'public/robots.txt')
const sitemapPath = path.join(__dirname, '..', 'public/sitemap.xml')
const webmanifestPath = path.join(__dirname, '..', 'public/site.webmanifest')

check('robots.txt', fs.existsSync(robotsPath), 'robots.txt file exists', 'Missing robots.txt file')

check(
  'sitemap.xml',
  fs.existsSync(sitemapPath),
  'sitemap.xml file exists',
  'Missing sitemap.xml file',
)

check(
  'Web App Manifest',
  fs.existsSync(webmanifestPath),
  'site.webmanifest file exists',
  'Missing site.webmanifest file',
  'WARN',
)

// 5. Check main.ts initialization
console.log('🚀 Checking app initialization...')
const mainPath = path.join(__dirname, '..', 'src/main.ts')
if (fs.existsSync(mainPath)) {
  const mainContent = fs.readFileSync(mainPath, 'utf-8')

  check(
    'Unhead integration',
    mainContent.includes('createHead') && mainContent.includes('app.use(head)'),
    'Unhead plugin properly initialized',
    'Unhead not properly initialized in main.ts',
  )
}

// 6. Check HomeView
console.log('🏠 Checking Home view SEO...')
const homeViewPath = path.join(__dirname, '..', 'src/views/HomeView.vue')
if (fs.existsSync(homeViewPath)) {
  const homeContent = fs.readFileSync(homeViewPath, 'utf-8')

  check(
    'HomeView SEO setup',
    homeContent.includes('useHead') && homeContent.includes('og:'),
    'HomeView includes SEO setup',
    'HomeView missing SEO configuration',
  )
}

// 7. Check package.json
console.log('📦 Checking package.json...')
const packagePath = path.join(__dirname, '..', 'package.json')
if (fs.existsSync(packagePath)) {
  const packageContent = fs.readFileSync(packagePath, 'utf-8')
  const packageData = JSON.parse(packageContent)

  check(
    'Unhead dependencies',
    packageData.dependencies?.['@unhead/vue'] && packageData.dependencies?.['@unhead/schema-org'],
    'Unhead libraries installed',
    'Missing Unhead dependencies',
  )

  check(
    'Vue 3',
    String(packageData.dependencies?.vue || '').includes('^3'),
    'Vue 3 installed',
    'Not using Vue 3',
  )
}

// Print results
console.log('\n' + '='.repeat(60))
console.log('SEO Validation Results')
console.log('='.repeat(60) + '\n')

const passCount = results.filter((r) => r.status === 'PASS').length
const warnCount = results.filter((r) => r.status === 'WARN').length
const failCount = results.filter((r) => r.status === 'FAIL').length

results.forEach((result) => {
  const icon = {
    PASS: '✅',
    WARN: '⚠️ ',
    FAIL: '❌',
  }[result.status]

  console.log(`${icon} ${result.name}`)
  console.log(`   ${result.message}\n`)
})

console.log('='.repeat(60))
console.log(`Summary: ${passCount} passed, ${warnCount} warnings, ${failCount} failures`)
console.log('='.repeat(60) + '\n')

// Exit with appropriate code
const hasFailures = failCount > 0
if (hasFailures) {
  console.error('❌ SEO validation failed. Please fix critical issues before deployment.')
  process.exit(1)
} else if (warnCount > 0) {
  console.warn(`⚠️  ${warnCount} warning(s) found. Review recommendations above.`)
  process.exit(0)
} else {
  console.log('✅ All SEO checks passed! Ready for deployment.')
  process.exit(0)
}
