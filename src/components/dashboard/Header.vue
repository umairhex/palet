<script setup lang="ts">
import { Menu, X, Search, Bell, User } from 'lucide-vue-next'

defineProps<{
  isSidebarOpen: boolean
}>()

defineEmits<{
  (e: 'toggleSidebar'): void
}>()
</script>

<template>
  <header
    class="sticky top-0 z-30 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-10 transition-all shadow-sm shadow-gray-100/50"
  >
    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggleSidebar')"
        class="lg:hidden p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors"
      >
        <Menu v-if="!isSidebarOpen" />
        <X v-else />
      </button>

      <div
        class="hidden sm:flex items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 w-64 lg:w-96 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30"
      >
        <Search class="size-4 text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search palettes or fonts..."
          class="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder:text-gray-400"
        />
      </div>
    </div>

    <div class="flex items-center gap-4 lg:gap-6">
      <button
        class="relative p-2.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
      >
        <Bell class="size-5" />
        <span
          class="absolute top-2.5 right-2.5 size-2 bg-primary rounded-full ring-2 ring-white"
        ></span>
      </button>

      <div class="flex items-center gap-3 pl-4 border-l border-gray-100">
        <div class="hidden md:block text-right">
          <p class="text-sm font-bold text-gray-900">Alex Designer</p>
          <p class="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Pro Plan</p>
        </div>
        <div
          class="size-10 rounded-2xl bg-linear-to-tr from-primary to-primary-light flex items-center justify-center text-white shadow-sm ring-2 ring-primary/10"
        >
          <User class="size-5" />
        </div>
      </div>
    </div>
  </header>
</template>
