import {
  BarChart3,
  PenTool,
  Code,
  Building2,
  Layout,
  Palette,
  Type,
  PaintBucket,
  TypeIcon,
} from 'lucide-vue-next'
import type { PaletteItem } from '../components/landing/MockupPreview.vue'
import type { ProductProps } from '../components/landing/ProductCard.vue'

export const HERO_TABS = ['Colours', 'Fonts', 'Workspace'] as const

export const HERO_FEATURE_CONFIG = {
  Colours: {
    title: 'Colour Palettes',
    description:
      'Store, organize, and preview your curated color collections. Access hex codes and visual references instantly from any project.',
    icon: PaintBucket,
  },
  Fonts: {
    title: 'Font Vault',
    description:
      'Upload and manage your custom typefaces. Preview weights and styles directly in the browser before downloading for local use.',
    icon: TypeIcon,
  },
  Workspace: {
    title: 'Unified Workspace',
    description:
      'Your central dashboard for all design assets. A persistent visual reference library that syncs across all your devices.',
    icon: Layout,
  },
}

export const USAGE_STATISTICS = [
  {
    value: '92%',
    description:
      'reduction in time spent searching for hex codes and font files across scattered project folders.',
  },
  {
    value: 'Instant',
    description:
      'access to frequently used typefaces from any device through a centralized workspace.',
  },
  {
    value: 'Zero',
    description:
      'friction when starting new design projects with a pre-saved visual asset library.',
  },
]

export const SHOWCASE_PRODUCTS: ProductProps[] = [
  {
    variant: 'hero',
    badge: {
      text: 'Unified Workspace',
      icon: Layout,
      colorClass: 'bg-emerald-accent',
      textClass: 'text-emerald-accent',
    },
    title:
      'A Personal Design Asset Vault for <br class="hidden md:block" /> Your Colors and Typography',
    description:
      'Centralize scattered assets into a single organized workspace. A permanent visual reference library that removes friction from starting new work.',
    features: ['Optional Cloud Sync', 'Accessible Across Devices'],
    image: {
      src: 'https://images.unsplash.com/photo-1643485839726-c9d4fac1c9bd?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Workspace Dashboard',
      transformClass: '-skew-x-1 -rotate-1',
    },
    gradientFrom: '#f0f9f4',
    gradientTo: '#f2f8f5',
    borderColor: 'border-emerald-accent/10',
    primaryBtn: {
      text: 'Enter Vault',
      colorClass: 'bg-emerald-accent',
    },
    secondaryBtn: true,
  },
  {
    variant: 'side',
    badge: {
      text: 'Palette Library',
      icon: Palette,
      colorClass: 'bg-blue-accent',
      textClass: 'text-blue-accent',
    },
    title: 'Create & Store Multiple <br /> Project Color Systems',
    description:
      'Add colors using hex or visual selection. Organize palettes by brand and copy codes instantly for development.',
    features: ['Hex, RGB & Visual Selection', 'Quick combination previews'],
    image: {
      src: 'https://images.unsplash.com/photo-1695634365014-7debec896789?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Color Grid',
      transformClass: 'skew-y-2 translate-y-4',
    },
    gradientFrom: '#f0f4f9',
    gradientTo: '#edf2f7',
    borderColor: 'border-blue-accent/10',
    primaryBtn: {
      text: 'Browse Palettes',
      colorClass: 'bg-blue-accent',
    },
    secondaryBtn: true,
  },
  {
    variant: 'side',
    badge: {
      text: 'Personalized Font Vault',
      icon: Type,
      colorClass: 'bg-purple-accent',
      textClass: 'text-purple-accent',
    },
    title: 'Upload & Preview Your <br /> Favorite Typefaces',
    description:
      'Upload .ttf files directly. Maintain a personal library of frequently used fonts with automatic visual previews.',
    features: ['Automatic inner preview', 'Secure .ttf file storage'],
    image: {
      src: 'https://images.unsplash.com/photo-1609605348579-3123e3d40eb8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Typography Layout',
      transformClass: '-skew-y-2 translate-y-4',
    },
    gradientFrom: '#f5f0f9',
    gradientTo: '#f0e8f5',
    borderColor: 'border-purple-accent/10',
    primaryBtn: {
      text: 'Manage Fonts',
      colorClass: 'bg-purple-accent',
    },
    secondaryBtn: true,
  },
]

export const INTERACTIVE_PALETTES: PaletteItem[] = [
  {
    name: 'Emerald Forest',
    colors: ['#0e231c', '#24b47e', '#f49a40', '#ffffff'],
    preview: {
      primary: 'bg-[#24b47e]',
      secondary: 'bg-[#f49a40]',
      bg: 'bg-[#0e231c]',
      border: 'border-white/10',
      titleColor: 'text-white',
      subtitleColor: 'text-white',
      cancelBtnClass: 'border-white/10 text-white opacity-40',
    },
  },
  {
    name: 'Nordic Sky',
    colors: ['#0f172a', '#3b82f6', '#f3f4f6', '#1d4ed8'],
    preview: {
      primary: 'bg-[#3b82f6]',
      secondary: 'bg-[#1d4ed8]',
      bg: 'bg-[#0f172a]',
      border: 'border-white/10',
      titleColor: 'text-white',
      subtitleColor: 'text-white',
      cancelBtnClass: 'border-white/10 text-white opacity-40',
    },
  },
  {
    name: 'Sunset Rose',
    colors: ['#1e1b4b', '#f43f5e', '#fbbf24', '#fdf2f8'],
    preview: {
      primary: 'bg-[#f43f5e]',
      secondary: 'bg-[#fbbf24]',
      bg: 'bg-[#1e1b4b]',
      border: 'border-[#f43f5e]/20',
      titleColor: 'text-white',
      subtitleColor: 'text-white',
      cancelBtnClass: 'border-white/10 text-white opacity-40',
    },
  },
  {
    name: 'Modern Crisp',
    colors: ['#ffffff', '#6366f1', '#1e293b', '#f8fafc'],
    preview: {
      primary: 'bg-[#6366f1]',
      secondary: 'bg-[#1e293b]',
      bg: 'bg-[#ffffff]',
      border: 'border-subtle',
      titleColor: 'text-foreground',
      subtitleColor: 'text-foreground-lighter',
      cancelBtnClass: 'border-subtle text-foreground-muted',
    },
  },
]

export const LANDING_RESOURCES = [
  {
    badge: 'Color Palettes',
    badgeClass: 'bg-emerald-accent/20 text-emerald-accent',
    title: 'Build palettes that look like the best brands in the business.',
    description:
      'Choose from a huge library of curated, conversion-focussed color combinations to build stunning designs faster.',
    buttonText: 'Browse Color Palettes',
    imageSrc:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Color Palettes',
  },
  {
    badge: 'Typography Library',
    badgeClass: 'bg-indigo-accent-hover/20 text-indigo-accent',
    title: "Create font systems that users can't wait to read.",
    description:
      'Get started faster with gorgeous, pre-curated font pairings, ready to export straight to your design tool.',
    buttonText: 'Browse Typography',
    imageSrc:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Typography Systems',
  },
]

export const TARGET_AUDIENCES = [
  {
    icon: BarChart3,
    label: 'For Marketers',
  },
  {
    icon: PenTool,
    label: 'For Designers',
  },
  {
    icon: Code,
    label: 'For Developers',
  },
  {
    icon: Building2,
    label: 'For Entrepreneurs',
  },
]

export const FAQ_ITEMS = [
  {
    question: 'What is Palet?',
    answer:
      'Palet is a <strong>personal design asset vault</strong> that provides a centralized space to effortlessly manage your <strong>color palettes and typography</strong>. It helps designers and developers move faster by keeping their visual identity primitives organized and accessible across all projects.',
  },
  {
    question: 'Who should use Palet’s design asset vault?',
    answer:
      'Palet is built for <strong>Designers, Developers, and Agencies</strong> who want to stop searching through old files or screenshots for hex codes and font files. If you value a structured, persistent library for your design assets, Palet is for you.',
  },
  {
    question: 'Do I need to have design skills to use Palet?',
    answer:
      'Not at all! Palet is designed to be a <strong>simple reference system</strong>. Whether you are a developer looking to quickly copy a hex code or a designer organizing brand assets, the interface is intuitive and requires zero technical overhead.',
  },
  {
    question: 'Can I store both color palettes and font files?',
    answer:
      'Yes! Palet focuses on two critical primitives: <strong>Color and Typography</strong>. You can create multi-color palettes and upload `.ttf` font files to build a comprehensive visual identity library.',
  },
  {
    question: 'Are my design assets accessible across devices?',
    answer:
      'Yes. While Palet works completely without an account on your current device, you can optionally create a free account to use our <strong>persistent cloud storage</strong>. Logging in ensures your entire library of palettes and fonts syncs instantly across any device or session.',
  },
  {
    question: 'Is Palet free to use?',
    answer:
      'Yes, entirely free! All core features are accessible immediately without paying or even signing up. Accounts are optional and only used for cross-device syncing.',
  },
]

export const TESTIMONIALS = [
  {
    quote:
      'Palet has completely changed how I manage brand assets. No more digging through Figma files for hex codes.',
    author: 'Zeeshan Ahmed',
    role: 'Senior Product Designer',
    company: 'DesignCo',
    tags: ['Productivity', 'Brand Design'],
  },
  {
    quote:
      'The .ttf font vault is a lifesaver. Being able to preview my typography library in the browser is incredible.',
    author: 'Hamza Malik',
    role: 'Frontend Developer',
    company: 'TechFlow',
    tags: ['Development', 'Typography'],
  },
  {
    quote:
      "Finally, a centralized place for all my design primitives. It's the first thing I open for every new project.",
    author: 'Fatima Khan',
    role: 'Creative Director',
    company: 'StudioVibe',
    tags: ['Organization', 'Creative Ops'],
  },
]

export const HEAD_NAVIGATION = [
  { name: 'Features', href: '/#features' },
  { name: 'Color Systems', href: '/#colors' },
  { name: 'Asset Vault', href: '/#vault' },
  { name: 'Dashboard', href: '/generator' },
]

export const FOOTER_NAVIGATION = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '/#features' },
      { name: 'Asset Vault', href: '/#vault' },
      { name: 'Typography', href: '/#fonts' },
      { name: 'Color Systems', href: '/#colors' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Design Guides', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Community', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Contact Support', href: '#' },
    ],
  },
]

export const LEGAL_LINKS = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms', href: '/terms' },
  { name: 'Cookie Policy', href: '/cookies' },
]
