<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user, avatarUrl } = useAuth()

const displayName = computed<string>(() => {
  const u = user.value
  const meta = u?.user_metadata as Record<string, unknown> | undefined
  return (meta?.full_name as string) || u?.email?.split('@')[0] || 'User'
})
</script>

<template>
  <div class="flex items-center gap-2">
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :alt="displayName"
      class="size-8 rounded-full object-cover"
      referrerpolicy="no-referrer"
    />
    <div
      v-else
      class="size-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold"
    >
      {{ displayName.charAt(0) }}
    </div>
    <span class="text-sm font-medium text-gray-900 truncate">{{ displayName }}</span>
  </div>
</template>
