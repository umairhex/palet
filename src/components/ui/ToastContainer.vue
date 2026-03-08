<script setup lang="ts">
import { Check, X, AlertTriangle, Info } from 'lucide-vue-next'
import { useToast } from '../../composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-200 flex flex-col gap-3 pointer-events-none">
      <TransitionGroup
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-4 scale-95"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-xl min-w-70 max-w-100"
          :class="{
            'bg-white border-gray-100 text-gray-900': toast.type === 'success',
            'bg-red-50 border-red-200 text-red-700': toast.type === 'error',
            'bg-yellow-50 border-yellow-200 text-yellow-700': toast.type === 'warning',
            'bg-blue-50 border-blue-200 text-blue-700': toast.type === 'info',
          }"
        >
          <div
            class="size-8 rounded-xl flex items-center justify-center shrink-0"
            :class="{
              'bg-emerald-100 text-emerald-600': toast.type === 'success',
              'bg-red-100 text-red-600': toast.type === 'error',
              'bg-yellow-100 text-yellow-600': toast.type === 'warning',
              'bg-blue-100 text-blue-600': toast.type === 'info',
            }"
          >
            <Check v-if="toast.type === 'success'" class="size-4" />
            <X v-else-if="toast.type === 'error'" class="size-4" />
            <AlertTriangle v-else-if="toast.type === 'warning'" class="size-4" />
            <Info v-else class="size-4" />
          </div>
          <span class="text-sm font-semibold flex-1">{{ toast.message }}</span>
          <button
            @click="removeToast(toast.id)"
            class="p-1 hover:bg-black/5 rounded-lg transition-colors shrink-0"
          >
            <X class="size-3.5 opacity-40" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
