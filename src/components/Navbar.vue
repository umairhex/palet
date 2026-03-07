<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import NavActions from './NavActions.vue'

const isAuthenticated = ref(false)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full bg-background border-b border-white/5 text-white px-6 md:px-12 py-4"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
      <div class="flex items-center cursor-pointer">
        <h1 class="text-white text-2xl font-bold tracking-[0.2em]">PALET</h1>
      </div>

      <div class="hidden md:flex items-center gap-6">
        <NavActions :is-authenticated="isAuthenticated" />
      </div>

      <div class="md:hidden">
        <Button variant="ghost" size="icon" @click="toggleMobileMenu" class="text-white">
          <Menu v-if="!isMobileMenuOpen" />
          <X v-else />
        </Button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="absolute top-full left-0 w-full bg-background border-b border-white/5 md:hidden py-6 px-6 flex flex-col gap-4 shadow-2xl"
      >
        <NavActions :is-authenticated="isAuthenticated" :is-mobile="true" />
      </div>
    </Transition>
  </nav>
</template>
