<script setup lang="ts">
import { PaintBucket, TypeIcon, Wand2, LogOut } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

defineProps<{
  isOpen: boolean
}>()

const navigation = [
  { name: 'Generator', href: '/generator', icon: Wand2 },
  { name: 'Color Library', href: '/palettes', icon: PaintBucket },
  { name: 'Font Vault', href: '/fonts', icon: TypeIcon },
]
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 bg-background border-r border-white/5 transition-transform duration-300 transform lg:static lg:translate-x-0 flex flex-col',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
    :style="{ width: 'var(--sidebar-width)' }"
  >
    <div class="p-8">
      <RouterLink to="/" class="flex items-center gap-2 group">
        <h1
          class="text-2xl font-bold tracking-[0.2em] text-white transition-colors group-hover:text-primary"
        >
          PALET
        </h1>
      </RouterLink>
    </div>

    <nav class="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-white/60 hover:text-white hover:bg-white/5"
        exact-active-class="!bg-primary/10 !text-primary !font-bold"
      >
        <component :is="item.icon" class="size-5 transition-transform group-hover:scale-110" />
        <span class="font-medium">{{ item.name }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 mt-auto border-t border-white/5 bg-background">
      <div class="px-4 py-3 mb-2 rounded-2xl bg-white/5">
        <div class="flex items-center gap-3">
          <div
            class="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold"
          >
            AD
          </div>
          <div class="min-w-0">
            <p class="text-sm font-bold text-white truncate">Alex Designer</p>
            <p class="text-[10px] text-white/40 uppercase tracking-tighter">Pro Plan</p>
          </div>
        </div>
      </div>

      <button
        class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-white/50 hover:text-red-400 hover:bg-red-400/10 group"
      >
        <LogOut class="size-5 transition-transform group-hover:-translate-x-1" />
        <span class="font-bold uppercase tracking-widest text-[10px]">Sign Out</span>
      </button>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
