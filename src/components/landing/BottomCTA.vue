<script setup lang="ts">
import { ArrowRight, UserPlus } from 'lucide-vue-next'
</script>

<template>
  <section class="w-full bg-[#0e231c] py-40 px-6 md:px-12 relative overflow-hidden">
    <!-- Sophisticated Background Pattern -->
    <div class="absolute inset-0 opacity-[0.03] z-0">
      <div
        class="h-full w-full bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.2)_1px,transparent_0)] bg-size-[40px_40px]"
      ></div>
    </div>

    <!-- Glowing Background Elements -->
    <div
      class="absolute -top-40 -right-40 size-[600px] bg-emerald-500/10 rounded-full blur-[140px] z-0"
    ></div>
    <div
      class="absolute -bottom-40 -left-40 size-[600px] bg-orange-500/5 rounded-full blur-[140px] z-0"
    ></div>

    <div class="max-w-4xl mx-auto text-center relative z-10 space-y-12">
      <div class="space-y-6">
        <h2
          class="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-4"
        >
          Ready to <span class="text-emerald-accent">curate?</span>
        </h2>
        <p class="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mx-auto font-medium">
          Whether you're starting a new brand or organizing a legacy project, Palet is the home for
          your design identity.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
        <button
          class="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-slate-900 px-12 py-6 rounded-full font-black text-lg transition-all hover:bg-emerald-500 hover:text-white hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/20 group"
        >
          <UserPlus class="size-6" />
          Get Started Now
          <ArrowRight class="size-6 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          class="w-full sm:w-auto text-white/40 hover:text-white transition-colors text-lg font-bold tracking-tight"
        >
          Already a member? <span class="text-white ml-2">Login</span>
        </button>
      </div>
    </div>
  </section>
</template>
