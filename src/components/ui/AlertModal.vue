<script setup lang="ts">
import { AlertCircle, Trash2, HelpCircle, CheckCircle2 } from 'lucide-vue-next'

type ModalType = 'danger' | 'warning' | 'info' | 'success'

interface Props {
  show: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  type?: ModalType
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  type: 'info',
  loading: false,
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()

const typeConfig = {
  danger: {
    icon: Trash2,
    iconClass: 'bg-red-100 text-red-500',
    btnClass: 'bg-red-500 hover:bg-red-600',
  },
  warning: {
    icon: AlertCircle,
    iconClass: 'bg-amber-100 text-amber-500',
    btnClass: 'bg-amber-500 hover:bg-amber-600',
  },
  info: {
    icon: HelpCircle,
    iconClass: 'bg-blue-100 text-blue-500',
    btnClass: 'bg-primary hover:bg-primary-hover',
  },
  success: {
    icon: CheckCircle2,
    iconClass: 'bg-emerald-100 text-emerald-500',
    btnClass: 'bg-emerald-500 hover:bg-emerald-600',
  },
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
        >
          <div class="flex items-center gap-4">
            <div
              :class="[
                'h-12 w-12 rounded-2xl flex items-center justify-center shrink-0',
                typeConfig[type].iconClass,
              ]"
            >
              <component :is="typeConfig[type].icon" class="size-6" />
            </div>
            <h3 class="text-xl font-black text-gray-900 leading-tight">{{ title }}</h3>
          </div>
          <p class="text-sm text-gray-500 leading-relaxed">{{ message }}</p>
          <div class="flex gap-3 justify-end pt-2">
            <button
              @click="emit('close')"
              class="px-5 py-2.5 rounded-2xl text-sm font-bold text-gray-400 hover:bg-gray-100 transition-all disabled:opacity-50"
              :disabled="loading"
            >
              {{ cancelText }}
            </button>
            <button
              @click="emit('confirm')"
              :class="[
                'px-6 py-2.5 rounded-2xl text-sm font-bold text-white shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed',
                typeConfig[type].btnClass,
              ]"
              :disabled="loading"
            >
              <template v-if="loading">Processing...</template>
              <template v-else>{{ confirmText }}</template>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
