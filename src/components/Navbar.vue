<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import NavActions from './NavActions.vue'
import { HEAD_NAVIGATION } from '../constants/landing'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated } = useAuth()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav
    class="sticky top-0 z-50 w-full bg-[#f5f5f5] border-b border-gray-200 text-gray-900 px-6 md:px-12 py-4"
  >
    <div class="max-w-7xl mx-auto flex justify-between items-center w-full">
      <RouterLink to="/" class="flex items-center cursor-pointer">
        <h1 class="text-gray-900 text-2xl font-bold tracking-[0.2em]">PALET</h1>
      </RouterLink>

      <div class="hidden md:flex items-center gap-8">
        <RouterLink
          v-for="link in HEAD_NAVIGATION"
          :key="link.name"
          :to="link.href"
          class="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-900 hover:text-primary transition-colors"
        >
          {{ link.name }}
        </RouterLink>
      </div>

      <div class="hidden md:flex items-center gap-6">
        <NavActions :is-authenticated="isAuthenticated" />
      </div>

      <div class="md:hidden">
        <Button variant="ghost" size="icon" @click="toggleMobileMenu" class="text-gray-900">
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
        class="absolute top-full left-0 w-full bg-white border-b border-gray-200 md:hidden py-6 px-6 flex flex-col gap-4"
      >
        <div class="flex flex-col gap-6 pt-4 pb-8 border-b border-gray-200">
          <RouterLink
            v-for="link in HEAD_NAVIGATION"
            :key="link.name"
            :to="link.href"
            @click="isMobileMenuOpen = false"
            class="text-lg font-bold tracking-widest uppercase text-gray-600 hover:text-gray-900"
          >
            {{ link.name }}
          </RouterLink>
        </div>
        <NavActions :is-authenticated="isAuthenticated" :is-mobile="true" />
      </div>
    </Transition>
  </nav>
</template>
