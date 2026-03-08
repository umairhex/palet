<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isAuthenticated, isAnonymous, isLoading, transferAnonymousData } = useAuth()
const callbackError = ref<string | null>(null)

watch(
  [isAuthenticated, isAnonymous, isLoading],
  async ([authed, anon, loading]) => {
    if (!loading && authed && !anon) {
      await transferAnonymousData()

      router.replace('/generator')
    }
  },
  { immediate: true },
)

onMounted(() => {
  setTimeout(() => {
    if (!isAuthenticated.value || isAnonymous.value) {
      console.error('ERROR: OAuth callback - session not established after timeout')
      callbackError.value = 'Sign in timed out. Please try again.'
    }
  }, 10000)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-background px-4">
    <div class="text-center">
      <template v-if="callbackError">
        <p class="text-red-400 mb-4">{{ callbackError }}</p>
        <RouterLink to="/login" class="text-primary hover:text-primary/80 font-medium">
          Back to login
        </RouterLink>
      </template>
      <template v-else>
        <div
          class="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
        ></div>
        <p class="text-white/60">Completing sign in...</p>
      </template>
    </div>
  </div>
</template>
