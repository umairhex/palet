<script setup lang="ts">
import { FOOTER_NAVIGATION, LEGAL_LINKS } from '../../constants/landing'
</script>

<template>
  <footer class="w-full bg-white border-t border-lighter pt-28 pb-14 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-28">
        <div class="lg:col-span-12 xl:col-span-4 space-y-12">
          <div class="flex items-center cursor-pointer group">
            <h1
              class="text-foreground text-4xl font-bold tracking-[0.2em] transition-colors group-hover:text-emerald-accent"
            >
              PALET
            </h1>
          </div>

          <p class="max-w-md text-muted-foreground text-xl leading-relaxed">
            The ultimate visual asset vault for modern creators. Centralize, organize, and access
            your design systems from anywhere.
          </p>
        </div>

        <div class="lg:col-span-12 xl:col-span-8">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            <div v-for="group in FOOTER_NAVIGATION" :key="group.title" class="space-y-10">
              <h4
                class="text-sm font-black uppercase tracking-[0.4em] text-foreground relative inline-block"
              >
                {{ group.title }}
                <span
                  class="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-accent rounded-full"
                ></span>
              </h4>
              <ul class="space-y-6">
                <li v-for="link in group.links" :key="link.name">
                  <a
                    :href="link.href"
                    class="text-lg text-muted-foreground hover:text-emerald-accent-hover transition-colors duration-300 tracking-tight"
                  >
                    {{ link.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="h-px w-full bg-border-lighter mb-14"></div>

      <div class="flex flex-col lg:flex-row justify-between items-center gap-10 text-sm">
        <div
          class="flex flex-col md:flex-row items-center gap-4 md:gap-6 font-medium uppercase tracking-[0.2em] text-muted-foreground-subtle text-center md:text-left"
        >
          <span>© {{ new Date().getFullYear() }} Palet Asset Vault</span>
          <span class="hidden md:block size-1.5 rounded-full bg-black/20"></span>
          <div class="flex items-center justify-center gap-2">
            <span>Built by</span>
            <a
              href="https://umairrx.dev"
              target="_blank"
              class="text-emerald-accent-hover font-bold hover:text-emerald-accent transition-colors underline-offset-4 hover:underline"
              >Umair Hex</a
            >
          </div>
        </div>

        <div
          class="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 md:gap-x-12 gap-y-6 font-medium uppercase tracking-[0.25em] text-muted-foreground-subtle text-center"
        >
          <a
            v-for="link in LEGAL_LINKS"
            :key="link.name"
            :href="link.href"
            class="hover:text-foreground transition-colors"
          >
            {{ link.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
