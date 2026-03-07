<script setup lang="ts">
import { PaintBucket, TypeIcon, LogIn, Sparkles } from 'lucide-vue-next'
import Button from './ui/Button.vue'

defineProps<{
  isAuthenticated: boolean
  isMobile?: boolean
}>()
</script>

<template>
  <template v-if="isAuthenticated">
    <Button
      :variant="isMobile ? 'outline' : 'ghost'"
      :class="isMobile ? 'w-full justify-start gap-3 py-6' : 'gap-2'"
    >
      <PaintBucket />
      <span>Colors</span>
    </Button>
    <Button
      :variant="isMobile ? 'outline' : 'ghost'"
      :class="isMobile ? 'w-full justify-start gap-3 py-6' : 'gap-2'"
    >
      <TypeIcon />
      <span>Fonts</span>
    </Button>
  </template>
  <template v-else>
    <Button
      :variant="isMobile ? 'outline' : 'ghost'"
      :class="isMobile ? 'w-full justify-start gap-3 py-6 border-white/10' : 'hover:text-primary'"
    >
      <LogIn v-if="isMobile" class="size-4" />
      <span v-else>Login</span>
      <template v-if="isMobile"> Login</template>
    </Button>
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
  </template>
</template>
