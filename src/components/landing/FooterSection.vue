<script setup lang="ts">
const footerNavigation = [
  {
    title: 'Product',
    links: [
      { name: 'Features', href: '#features' },
      { name: 'Asset Vault', href: '#vault' },
      { name: 'Typography', href: '#fonts' },
      { name: 'Color Systems', href: '#colors' },
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
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Contact Support', href: '#' },
    ],
  },
]
</script>

<template>
  <footer class="w-full bg-white border-t border-slate-100 pt-28 pb-14 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
        <!-- Brand Info -->
        <div class="lg:col-span-12 xl:col-span-4 space-y-12">
          <div class="flex items-center cursor-pointer group">
            <h1
              class="text-slate-900 text-4xl font-bold tracking-[0.2em] transition-colors group-hover:text-emerald-500"
            >
              PALET
            </h1>
          </div>

          <p class="max-w-md text-slate-500 text-xl leading-relaxed">
            The ultimate visual asset vault for modern creators. Centralize, organize, and access
            your design systems from anywhere.
          </p>
        </div>

        <div class="lg:col-span-12 xl:col-span-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            <div v-for="group in footerNavigation" :key="group.title" class="space-y-10">
              <h4
                class="text-sm font-black uppercase tracking-[0.4em] text-slate-900 relative inline-block"
              >
                {{ group.title }}
                <span class="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
              </h4>
              <ul class="space-y-6">
                <li v-for="link in group.links" :key="link.name">
                  <a
                    :href="link.href"
                    class="text-lg text-slate-500 hover:text-emerald-600 transition-colors duration-300 tracking-tight"
                  >
                    {{ link.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="h-px w-full bg-slate-100 mb-14"></div>

      <div class="flex flex-col lg:flex-row justify-between items-center gap-10 text-sm">
        <div class="flex items-center gap-4 font-medium uppercase tracking-[0.2em] text-slate-400">
          <span>© {{ new Date().getFullYear() }} Palet Asset Vault</span>
          <span class="size-1.5 rounded-full bg-black/20"></span>
          <div class="flex items-center gap-2">
            <span>Built by</span>
            <a
              href="https://umairrx.dev"
              target="_blank"
              class="text-emerald-600 font-bold hover:text-emerald-500 transition-colors underline-offset-4 hover:underline"
              >Umair Hex</a
            >
          </div>
        </div>

        <div
          class="flex flex-wrap justify-center gap-x-12 gap-y-4 font-medium uppercase tracking-[0.25em] text-slate-400"
        >
          <a href="#" class="hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" class="hover:text-slate-900 transition-colors">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
