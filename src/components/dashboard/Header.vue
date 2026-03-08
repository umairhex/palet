<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X, Search } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user, isAnonymous, avatarUrl } = useAuth()
const searchQuery = ref('')

const onSearch = () => {
  const q = searchQuery.value.trim()
  if (q) {
    router.push({ path: '/palettes', query: { q } })
    searchQuery.value = ''
  }
}

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
          v-model="searchQuery"
          type="text"
          placeholder="Search palettes or fonts..."
          class="bg-transparent border-none outline-none text-sm w-full text-gray-900 placeholder:text-gray-400"
          @keydown.enter="onSearch"
        />
      </div>
    </div>

    <div class="flex items-center gap-4 lg:gap-6">
      <template v-if="user && !isAnonymous">
        <div class="flex items-center gap-3 pl-4 border-l border-gray-100">
          <div class="hidden md:block text-right">
            <p class="text-sm font-bold text-gray-900">
              {{ user.email?.split('@')[0] || 'User' }}
            </p>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Signed In</p>
          </div>
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            :alt="user.email?.split('@')[0] || 'User'"
            class="size-10 rounded-2xl shadow-sm ring-2 ring-gray-100 object-cover"
            referrerpolicy="no-referrer"
          />
          <div
            v-else
            class="size-10 rounded-2xl shadow-sm ring-2 ring-gray-100 bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-white font-bold text-sm"
          >
            {{ user.email?.charAt(0).toUpperCase() || 'U' }}
          </div>
        </div>
      </template>
      <template v-if="!user || isAnonymous">
        <div class="flex items-center gap-2 pl-4 border-l border-gray-100">
          <RouterLink
            to="/signup"
            class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors"
          >
            Sign In & Sync
          </RouterLink>
        </div>
      </template>
    </div>
  </header>
</template>
