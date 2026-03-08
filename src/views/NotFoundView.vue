<script setup lang="ts">
import { ArrowLeft, Home } from 'lucide-vue-next'
import Button from '../components/ui/Button.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<template>
  <div
    class="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center text-foreground"
  >
    <div class="max-w-md w-full space-y-12 relative z-10">
      <div class="space-y-4">
        <h1 class="text-foreground text-xl font-bold tracking-[0.4em] opacity-20">PALET</h1>
        <div class="h-px w-12 bg-primary/30 mx-auto"></div>
      </div>

      <div class="space-y-6">
        <div class="relative inline-block">
          <span class="text-[8rem] font-bold text-foreground tracking-tighter">404</span>
        </div>

        <p
          class="text-foreground/50 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-70 mx-auto"
        >
          The asset you're looking for doesn't exist.
        </p>
      </div>

      <div class="flex gap-3 pt-8">
        <Button
          variant="outline"
          @click="goBack"
          class="w-full h-12 rounded-xl border-foreground/10 text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all text-xs font-bold uppercase tracking-widest gap-2"
        >
          <ArrowLeft class="size-4" />
          Go Back
        </Button>

        <RouterLink to="/" class="w-full">
          <Button
            class="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
          >
            <Home class="size-4 mr-1" />
            Home
          </Button>
        </RouterLink>
      </div>
    </div>

    <div
      class="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
    >
      <div class="w-[60vw] h-[60vw] bg-foreground/2 blur-[150px] rounded-full"></div>
    </div>
  </div>
</template>

<style scoped></style>
