# Palet

## Core Idea

### Problem

Designers and developers constantly collect color palettes and fonts across projects, but these assets end up scattered across files, screenshots, bookmarks, browser tabs, and design tool exports. When starting a new project, finding the right palette from a previous brand identity or locating a font file downloaded months ago involves searching through multiple locations. Existing design tools (Figma, Adobe) store assets within their ecosystems, and dedicated palette tools rarely handle typography. There is no unified, cloud-synced workspace focused specifically on the two most fundamental design primitives — color and typography — that provides instant retrieval, developer-ready export formats, and zero-friction onboarding.

### Solution

Palet is a personal design asset vault for colors and typography. It provides a color palette generator using OKLab/LCH color space for perceptually uniform harmonies, a palette library with tagging and search, multi-format export (CSS, SCSS, Tailwind, JSON, Figma tokens), built-in WCAG accessibility checking, and a font vault for uploading and previewing typefaces. Supabase powers cloud storage and authentication, with anonymous sign-in enabling immediate use without registration. When users later create an account, all anonymous data migrates seamlessly to their authenticated profile.

### Value

Palet centralizes the two design primitives that every project starts with into a single, always-accessible workspace. The OKLab/LCH color space produces perceptually accurate harmonies (not the skewed results of basic HSL generators). Developer-ready export formats (CSS variables, Tailwind config, Figma tokens) bridge the gap between design decisions and code implementation. Anonymous-to-authenticated migration means users start using the product instantly — no signup barrier — and upgrade to permanent cloud sync when ready. Row-Level Security ensures absolute data isolation between users.

### User Outcome

A designer opens Palet, immediately starts generating palettes using advanced color harmony rules, saves favorites with tags, uploads font files for preview and reference, and exports palettes as CSS variables or Tailwind config into their project. Over time, the workspace becomes a curated identity system containing all preferred design assets — accessible from any device, organized for instant retrieval, and exportable in the exact format each project requires.

---

## Key Features

### Color Palette Generator

#### Purpose

Provide a scientifically accurate color generation tool that produces perceptually harmonious palettes using modern color science.

#### Capabilities

- Generate palettes using harmony rules: analogous, complementary, triadic, split-complementary, and tetradic
- Random palette generation for exploration
- Scale generation for creating color ramps
- OKLab/LCH color space for perceptually uniform results (not HSL)
- Brightness, saturation, and temperature adjustment controls
- Slot locking to preserve specific colors while regenerating others
- Undo history for non-destructive experimentation
- Human-readable color names via color-namer integration

#### User Benefit

Palettes look visually balanced because they are generated in a perceptually uniform color space — eliminating the common problem of HSL-based generators producing colors that appear uneven in perceived brightness or saturation.

---

### Color Palette Library

#### Purpose

Provide persistent storage, organization, and instant retrieval of saved color palettes.

#### Capabilities

- Full CRUD operations for saved palettes
- Tag-based organization for categorizing by project, brand, or mood
- Search and filter across palette names and tags
- Instant color code copy (hex values) for development and design tools
- Quick visual preview of palette combinations
- Cloud-synced via Supabase PostgreSQL with Row-Level Security

#### User Benefit

Every palette ever saved is organized, searchable, and accessible from any device — eliminating the need to recreate or hunt for previously discovered color combinations.

---

### Palette Export

#### Purpose

Bridge design decisions and code implementation by exporting palettes in developer-ready formats.

#### Capabilities

- Export as CSS custom properties (variables)
- Export as SCSS variables
- Export as Tailwind CSS configuration
- Export as structured JSON
- Export as Figma design tokens
- Download as files for direct project integration

#### User Benefit

Developers drop exported palettes directly into their codebases in the exact format their framework expects — eliminating manual color code transcription and format conversion.

---

### Accessibility Tools

#### Purpose

Ensure color palettes meet WCAG accessibility standards before use in production designs.

#### Capabilities

- WCAG contrast ratio checking (AA, AAA, AA-Large ratings)
- Contrast matrix view for evaluating all color pair combinations
- Luminance calculation for informed contrast decisions
- Color vision simulation filters for previewing how palettes appear to users with different types of color vision

#### User Benefit

Accessibility compliance is integrated into the palette creation workflow rather than requiring a separate audit step, catching contrast issues before they reach production.

---

### Font Vault

#### Purpose

Provide a personal cloud-hosted library for typefaces with visual preview and organization.

#### Capabilities

- Upload TTF, OTF, WOFF, and WOFF2 font files to Supabase Storage
- Visual font preview with customizable sample text
- Font waterfall preview with adjustable sizing for evaluating type at different scales
- Favorite marking for quick access to preferred typefaces
- Category tagging for organization (serif, sans-serif, display, monospace, etc.)
- Download capability for retrieving stored fonts
- Private storage bucket with authenticated access

#### User Benefit

Fonts are browsed visually instead of searching through file systems — each typeface shows immediately how it looks, organized and accessible from any device.

---

### Zero-Friction Onboarding

#### Purpose

Remove all barriers to first use while providing a path to permanent cloud-synced accounts.

#### Capabilities

- Anonymous sign-in via Supabase Auth (auto-created on first visit)
- Immediate access to palette generation, saving, and font uploading without registration
- Seamless data migration from anonymous to authenticated accounts via `transfer_anonymous_data` PL/pgSQL function
- Email/password and Google OAuth registration options
- Bot protection via hCaptcha/Cloudflare Turnstile on auth flows

#### User Benefit

Users start generating and saving palettes within seconds of their first visit — no forms, no email verification, no friction — and their data follows them when they later create a permanent account.

---

## System Structure

### User Interface

The application has a marketing landing page with hero section, interactive palette demo, product showcase, target audience breakdown, FAQ, testimonials, and CTA. The authenticated dashboard provides sidebar navigation with sections for the palette generator, color library, font vault, accessibility tools, and settings. Stat cards show collection summaries. The interface supports dark and light themes with system-aware detection.

### Data Layer

Two core PostgreSQL tables (via Supabase): palettes (user ID, name, colors array, tags array, timestamps) and fonts (user ID, name, category, preview text, weight, file size, storage path, favorite flag, added date). Font binary files are stored in a private Supabase Storage bucket named "fonts." Row-Level Security enforces `auth.uid() = user_id` on every table, ensuring absolute data isolation between users.

### Access Model

Authentication uses Supabase Auth with three modes: anonymous sign-in (auto-created, no registration), email/password, and Google OAuth. Anonymous users have full functionality but risk data loss if they clear browser data. Registering or logging in transfers all anonymous data to the permanent account. Storage policies require authentication for upload, read, and delete operations. Bot protection guards auth flows against automated abuse.

### Persistence

All data is stored in Supabase PostgreSQL, accessible from any device after authentication. Font files persist in Supabase Storage with authenticated access. Anonymous user data persists server-side (tied to the auto-generated anonymous auth token) until the browser session is cleared or the user migrates to a permanent account. The application is deployed as a Vite SPA on Vercel with client-side routing.

---

## User Workflow

### Entry

Users land on the marketing homepage and are auto-signed in anonymously. They can immediately navigate to the dashboard and start generating palettes without any registration.

### Creation

Users generate color palettes using harmony rules, random generation, or manual selection. Palettes are saved with names and tags. Fonts are uploaded directly from the file system and appear in the vault with automatic preview generation.

### Organization

Palettes are organized through tags and searchable by name. Fonts are categorized by type and marked as favorites for quick access. The dashboard provides stat cards showing collection sizes and recent additions.

### Retrieval

The color library provides instant search and filter across all saved palettes. The font vault offers visual browsing with adjustable previews. Color codes copy to clipboard with a single click. Palettes export in developer-ready formats for immediate use in code.

### Reuse

Exported palettes drop directly into CSS, SCSS, Tailwind, or Figma projects. Font files download for local installation. The accessibility checker validates palettes before production use. The library grows into a curated identity system across all the user's projects.

---

## Documentation / Support Layer

### Purpose

Help users understand the palette generation workflow, export options, and accessibility features.

### Contents

- Color palette generation modes and harmony rule explanations
- Export format reference (CSS, SCSS, Tailwind, JSON, Figma tokens)
- Accessibility checker usage and WCAG compliance levels
- Font upload supported formats and vault management
- Anonymous-to-account migration workflow
- OKLab/LCH color space advantages over traditional HSL

### User Benefit

Users leverage the full feature set — particularly the advanced color science and multi-format export — understanding why OKLab palettes look better and how to integrate exports directly into their development workflow.

---

## Product Positioning

### Category

Design utility — personal design asset vault for colors and typography.

### Scope

Focuses on color palette generation, storage, accessibility checking, multi-format export, and font file management. Intentionally avoids becoming a full design tool, page builder, or brand guideline generator. The product is a persistent reference system for the two most fundamental design primitives — color and typography.

### Primary Users

Designers who need a curated reference library of colors and fonts across projects, frontend developers who want developer-ready palette exports, and freelancers or agencies managing multiple brand identities.

### Core Value Proposition

A personal design asset vault combining OKLab/LCH color science, WCAG accessibility checking, multi-format developer export (CSS, Tailwind, Figma tokens), and cloud-synced font management — with zero-friction anonymous onboarding that lets users start saving assets in seconds.
