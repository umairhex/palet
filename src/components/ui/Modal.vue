<script setup lang="ts">
import { X } from 'lucide-vue-next'

interface Props {
  show: boolean
  title?: string
  maxWidth?: string
  closeOnBackdrop?: boolean
}

withDefaults(defineProps<Props>(), {
  maxWidth: 'max-w-2xl',
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-gray-900/60 backdrop-blur-md overflow-y-auto"
        @click.self="closeOnBackdrop && emit('close')"
      >
        <div
          :class="[
            'w-full relative animate-in zoom-in-95 slide-in-from-bottom-8 duration-500 my-4',
            maxWidth,
          ]"
        >
          <button
            @click="emit('close')"
            class="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all"
            aria-label="Close modal"
          >
            <X class="size-6" />
          </button>

          <div class="bg-white rounded-3xl overflow-hidden shadow-2xl">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
