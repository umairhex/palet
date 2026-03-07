<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
</script>

<template>
  <section class="w-full bg-background py-40 px-6 md:px-12 relative overflow-hidden">
    <div class="max-w-4xl mx-auto text-center relative z-10 space-y-12">
      <div class="space-y-6">
        <h2
          class="text-5xl md:text-7xl lg:text-8xl font-medium text-white tracking-tight leading-none mb-4"
        >
          Ready to <span class="text-emerald-accent">curate?</span>
        </h2>
        <p class="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mx-auto">
          Whether you're starting a new brand or organizing a legacy project, Palet is the home for
          your design identity. Start instantly, for free, without an account.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
        <button
          class="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-foreground px-12 py-6 rounded-full text-lg transition-all hover:bg-emerald-accent hover:text-white hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-accent/20 group"
        >
          Start For Free
          <ArrowRight class="size-6 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          class="w-full sm:w-auto text-white/40 hover:text-white transition-colors text-lg tracking-tight"
        >
          Want to sync your assets? <span class="text-white ml-2">Log In</span>
        </button>
      </div>
    </div>
  </section>
</template>
