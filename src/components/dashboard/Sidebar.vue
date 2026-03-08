<script setup lang="ts">
import { PaintBucket, TypeIcon, Wand2, LogOut } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

defineProps<{
  isOpen: boolean
}>()

const { user, isAnonymous, avatarUrl, signOut } = useAuth()

const navigation = [
  { name: 'Generator', href: '/generator', icon: Wand2 },
  { name: 'Color Library', href: '/palettes', icon: PaintBucket },
  { name: 'Font Vault', href: '/fonts', icon: TypeIcon },
]

const handleSignOut = async () => {
  try {
    await signOut()
    window.location.href = '/'
  } catch (err) {
    console.error('Sign out failed:', err)
  }
}
</script>

<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-transform duration-300 transform lg:static lg:translate-x-0 flex flex-col',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
    :style="{ width: 'var(--sidebar-width)' }"
  >
    <div class="p-8">
      <RouterLink to="/" class="flex items-center gap-2 group">
        <h1
          class="text-2xl font-bold tracking-[0.2em] text-gray-900 transition-colors group-hover:text-primary"
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
        class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        exact-active-class="!bg-primary/10 !text-primary !font-bold"
      >
        <component :is="item.icon" class="size-5 transition-transform group-hover:scale-110" />
        <span class="font-medium">{{ item.name }}</span>
      </RouterLink>
    </nav>

    <div class="p-4 mt-auto border-t border-gray-200">
      <div v-if="user && !isAnonymous" class="px-4 py-3 mb-2 rounded-2xl bg-gray-50">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              :alt="user.email?.split('@')[0] || 'User'"
              class="size-9 rounded-lg shadow-sm ring-1 ring-gray-200 object-cover shrink-0"
              referrerpolicy="no-referrer"
            />
            <div
              v-else
              class="size-9 rounded-lg shadow-sm ring-1 ring-gray-200 bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-xs shrink-0"
            >
              {{ user.email?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900 truncate">
                {{ user.email?.split('@')[0] || user.email }}
              </p>
              <p class="text-[10px] text-gray-400 uppercase tracking-tighter">Signed In</p>
            </div>
          </div>
          <button
            @click="handleSignOut"
            class="p-2 rounded-lg hover:bg-gray-200 transition-colors shrink-0"
            title="Sign out"
          >
            <LogOut class="size-4 text-gray-400 hover:text-gray-900 transition-colors" />
          </button>
        </div>
      </div>
      <div v-else class="space-y-3">
        <div class="px-4 py-3 rounded-2xl bg-primary/5 border border-primary/10">
          <p class="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Data Sync</p>
          <p class="text-sm text-gray-700 mb-3">
            Sign in to sync your palettes, fonts, and settings across all devices
          </p>
          <RouterLink
            to="/signup"
            class="block w-full px-4 py-2.5 text-center rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started Free
          </RouterLink>
        </div>
        <RouterLink
          to="/login"
          class="block w-full px-4 py-2.5 text-center rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Already have an account?
        </RouterLink>
      </div>
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
  background: rgba(0, 0, 0, 0.08);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>
