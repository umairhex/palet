# 🎨 Palet

> **A personal design asset vault** for colors and typography. Designers and developers now have a single organized workspace to store, preview, and reuse palettes and fonts across projects—eliminating scattered screenshots and bookmarks.

Palet centralizes your design tokens into one intuitive dashboard accessible from any device. Save time, maintain consistency, and build faster.

---

## ✨ Features

### Color Palette Library

- 🎯 Create, organize, and manage multiple palettes
- 🎨 Add colors using hex, RGB, or visual color picker
- ⚡ Instant copy of color codes for development or design tools
- 🔄 Generate color harmonies (complementary, triadic, analogous)
- ♿ Built-in contrast checker for accessibility compliance
- 📤 Export to CSS variables, Tailwind, JSON, Figma tokens

### Font Vault

- 📁 Upload `.ttf`, `.otf`, `.woff`, `.woff2` font files
- 👁️ Automatic font preview inside the dashboard
- 🔍 Organize and browse typography library
- ⬇️ Download fonts for use in projects
- 🎭 Font waterfall preview with adjustable sizing

### Unified Design Workspace

- 📊 Centralized dashboard for palettes and fonts
- 🔐 Secure, private library per user
- ☁️ Cloud persistence across all devices
- 🔄 Instant sync and real-time updates
- 📱 Fully responsive mobile-friendly design

### Authentication & Privacy

- 🔐 Secure authentication (Email, OAuth, Anonymous)
- 👤 Personal libraries with row-level security (RLS)
- 🛡️ GDPR-compliant data handling
- 🤖 Bot prevention with hCaptcha

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- pnpm 8+ (faster, stricter than npm)
- Supabase account (free tier available)

### Installation

```bash
# Clone repository
git clone https://github.com/umairhex/palet.git
cd palet

# Install dependencies
pnpm install

# Create .env file with Supabase credentials
cp .env.example .env.local
# Edit .env.local with your Supabase URL and anon key

# Start development server (localhost:5173)
pnpm dev
```

### Build for Production

```bash
# Type checking + linting
pnpm type-check
pnpm lint

# Production build (optimized, minified)
pnpm build

# Preview production build locally
pnpm preview
```

---

## 📋 Tech Stack

### Frontend

- **Vue 3** — Progressive framework with Composition API
- **TypeScript** — Type-safe development
- **Vite** — Lightning-fast build tool (HMR, code splitting)
- **TailwindCSS v4** — Utility-first styling with native CSS
- **Vue Router** — Client-side routing
- **@tanstack/vue-query** — Server state management with caching

### Backend

- **Supabase** — PostgreSQL + Auth + Storage
  - PostgreSQL (relational data, RLS policies)
  - Authentication (Email, OAuth, JWT)
  - Storage (Font files, assets)
  - Edge Functions (serverless, optional)

### Code Quality

- **TypeScript** — Strict type checking (tsconfig)
- **ESLint + Oxlint** — Code linting and style enforcement
- **Prettier** — Code formatting (3.8.1)
- **Husky** — Git hooks for automated checks

### Development Tools

- **Vite 7** — Ultra-fast build and dev server
- **pnpm** — Package manager (monorepo-ready, disk-efficient)

---

## 📁 Project Structure

```
palet/
├── src/
│   ├── components/          # Vue SFC components
│   │   ├── dashboard/       # Dashboard widgets
│   │   ├── generator/       # Palette generator module
│   │   ├── font-vault/      # Font management
│   │   ├── landing/         # Marketing pages
│   │   └── ui/              # Reusable UI components
│   ├── composables/         # Vue 3 composables (state logic)
│   │   ├── useAuth.ts       # Authentication
│   │   ├── usePalettes.ts   # Palette CRUD
│   │   ├── useFonts.ts      # Font management
│   │   └── useToast.ts      # Notifications
│   ├── views/               # Page-level components
│   ├── stores/              # Pinia stores (if used)
│   ├── router/              # Vue Router config
│   ├── utils/               # Utility functions
│   │   └── color/           # Color algorithms
│   ├── lib/                 # Core libraries
│   │   └── supabase.ts      # Supabase client
│   ├── constants/           # App constants
│   ├── App.vue              # Root component
│   └── main.ts              # Entry point
├── public/                  # Static assets
├── supabase/                # Database migrations
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # TailwindCSS config
├── eslint.config.ts         # ESLint config
├── SYSTEM_DESIGN.md         # Architecture documentation
├── package.json             # Dependencies
└── README.md                # This file
```

---

## 🔐 Security

Palet follows security best practices:

### Protection Mechanisms

- ✅ **Row-Level Security (RLS)** — Users can only access their own data
- ✅ **Content Security Policy (CSP)** — Prevents XSS and injection attacks
- ✅ **Input Sanitization** — CSS and HTML input validation
- ✅ **HTTPS/TLS** — Encrypted data in transit
- ✅ **MIME Type Validation** — File upload verification
- ✅ **Open Redirect Prevention** — URL validation on redirects
- ✅ **Bot Prevention** — hCaptcha on signup forms

---

## 🎯 How It Works

### 1. Sign Up & Onboarding

- Email/password or OAuth (Google, GitHub, Apple)
- hCaptcha verification (bot prevention)
- Instant access to dashboard

### 2. Create Palettes

- Open palette generator
- Pick colors manually or generate harmonies
- Check contrast ratios (WCAG compliance)
- Save to personal library

### 3. Upload Fonts

- Drag-and-drop font files (.ttf, .otf, .woff, .woff2)
- Automatic preview in typography waterfall
- Organize, download, or delete anytime

### 4. Reuse Assets

- Browse dashboard for recent palettes/fonts
- Copy color codes instantly
- Export as CSS variables, Tailwind config, JSON
- Access from any device

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

### AWS / Self-Hosted

```bash
# Build static site
pnpm build

# Deploy dist/ folder to your host
# (Supabase backend is serverless—no backend deployment needed)
```

### Environment Variables

```env
# Required (.env or .env.local)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

---

## 🛠️ Development

### Available Commands

```bash
pnpm dev              # Start dev server (HMR enabled)
pnpm build            # Production build (optimized)
pnpm preview          # Preview production build
pnpm type-check       # TypeScript type checking
pnpm lint             # Run linters (oxlint + ESLint)
pnpm lint:oxlint      # Oxlint only
pnpm lint:eslint      # ESLint only
pnpm format           # Auto-format code (Prettier)
```

### Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📊 Architecture

Palet is built with a modern, scalable architecture:

- **Frontend**: Vue 3 SPA with TypeScript + Vite bundling
- **State Management**: Composables + Vue Query (react-query for Vue)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Security**: RLS policies, CSP headers, input sanitization
- **Real-time**: WebSocket subscriptions for live updates

For detailed architecture, see [SYSTEM_DESIGN.md](SYSTEM_DESIGN.md).

---

## 🤝 Support & Contact

Questions or feedback? Reach out:

| Channel      | Link                                              |
| ------------ | ------------------------------------------------- |
| **GitHub**   | [@umairhex](https://github.com/umairhex)          |
| **LinkedIn** | [@umairhex](https://www.linkedin.com/in/umairhex) |

---

## 📄 License

MIT License — feel free to use this project for personal or commercial purposes.

---

## Acknowledgments

- **Supabase** for serverless backend infrastructure
- **Vue.js** team for the amazing framework
- **TailwindCSS** for rapid UI development
- **Vite** for blazing-fast build tooling
- All contributors and users providing feedback

---

**Built with ❤️ by [Umair Niazi](https://github.com/umairhex)**
