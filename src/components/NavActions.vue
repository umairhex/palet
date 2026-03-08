<script setup lang="ts">
import { PaintBucket, TypeIcon, Sparkles, LogOut } from 'lucide-vue-next'
import Button from './ui/Button.vue'
import { useAuth } from '@/composables/useAuth'

defineProps<{
  isAuthenticated: boolean
  isMobile?: boolean
}>()

const { signOut, isAnonymous } = useAuth()

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
  <template v-if="isAuthenticated && !isAnonymous">
    <RouterLink to="/palettes">
      <Button
        :variant="isMobile ? 'outline' : 'ghost'"
        :class="isMobile ? 'w-full justify-start gap-3 py-6' : 'gap-2'"
      >
        <PaintBucket />
        <span>Colors</span>
      </Button>
    </RouterLink>
    <RouterLink to="/fonts">
      <Button
        :variant="isMobile ? 'outline' : 'ghost'"
        :class="isMobile ? 'w-full justify-start gap-3 py-6' : 'gap-2'"
      >
        <TypeIcon />
        <span>Fonts</span>
      </Button>
    </RouterLink>
    <button @click="handleSignOut" :class="isMobile ? 'w-full' : ''">
      <Button
        :variant="isMobile ? 'outline' : 'ghost'"
        :class="
          isMobile
            ? 'w-full justify-start gap-3 py-6 text-red-600 hover:text-red-700'
            : 'text-red-600 hover:text-red-700 gap-2'
        "
      >
        <LogOut class="size-4" />
        <span>{{ isMobile ? 'Sign Out' : '' }}</span>
      </Button>
    </button>
  </template>
  <template v-else>
    <RouterLink to="/login">
      <Button
        :variant="isMobile ? 'outline' : 'ghost'"
        :class="
          isMobile
            ? 'w-full justify-start gap-3 py-6t text-black border-gray-200'
            : 'text-black hover:text-primary'
        "
      >
        <span>Login</span>
      </Button>
    </RouterLink>
    <RouterLink to="/generator">
      <Button
        :class="
          isMobile
            ? 'bg-primary hover:bg-primary/90 text-white w-full justify-start gap-3 py-6 rounded-xl'
            : 'bg-primary hover:bg-primary/90 text-white rounded-full px-6'
        "
      >
        <Sparkles v-if="isMobile" class="size-4" />
        Get Started for Free
      </Button>
    </RouterLink>
  </template>
</template>
