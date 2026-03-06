<script setup lang="ts">
import '@/style.css'
import { Github, Linkedin, Mail, Globe, Instagram, Twitter } from 'lucide-vue-next'
</script>

<template>
  <main class="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
    <section class="max-w-3xl text-center space-y-10">
      <div class="space-y-5">
        <h1 class="text-5xl font-bold tracking-tight">PALET</h1>

        <p class="text-neutral-400 text-lg leading-relaxed">
          A minimal design asset manager for saving color palettes and font files. Upload
          <code class="text-white">.ttf</code> fonts, organize palette tokens, and manage design
          systems from one clean dashboard.
        </p>
      </div>

      <div class="flex justify-center gap-4 flex-wrap">
        <a
          v-for="item in [
            { href: 'mailto:umairnniazidev@gmail.com', icon: Mail },
            { href: 'https://www.linkedin.com/in/umairhex', icon: Linkedin },
            { href: 'https://github.com/umairhex', icon: Github },
            { href: 'https://umairrx.dev', icon: Globe },
            { href: 'https://www.instagram.com/umairhex', icon: Instagram },
            { href: 'https://twitter.com/umairhex', icon: Twitter },
          ]"
          :key="item.href"
          :href="item.href"
          target="_blank"
          class="w-12 h-12 rounded-full border border-neutral-700 flex items-center justify-center text-neutral-400 transition-all duration-300 hover:bg-white hover:text-black hover:scale-110 hover:border-white"
        >
          <component :is="item.icon" />
        </a>
      </div>
    </section>
  </main>
</template>
