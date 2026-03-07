<script setup lang="ts">
// Minimal setup for the static visual component
</script>

<template>
  <div class="relative flex flex-col gap-6">
    <div
      class="relative w-full aspect-square lg:aspect-4/3 rounded-3xl overflow-hidden bg-linear-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center"
    >
      <div
        class="absolute inset-4 rounded-2xl bg-ui-dark border border-white/5 overflow-hidden flex items-center justify-center"
      >
        <img
          src="https://images.unsplash.com/photo-1597526220503-d1915d82e45b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Palet Workspace"
          class="w-full h-full object-cover opacity-70"
        />
      </div>
    </div>

    <div class="flex flex-col items-center gap-2 text-center py-2 opacity-80">
      <p class="text-white/40 text-sm font-medium tracking-wide italic">
        "Designed for persistence. Crafted for speed."
      </p>
      <p class="text-white/20 text-xs uppercase tracking-[0.2em] font-light">
        Built by
        <span class="text-white/60 hover:text-white transition-colors cursor-pointer">Umair</span>
      </p>
    </div>
  </div>
</template>
