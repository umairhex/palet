<script setup lang="ts">
import { Loader, CheckCircle2, AlertCircle } from 'lucide-vue-next'

interface UploadingFile {
  name: string
  status: 'pending' | 'uploading' | 'success' | 'error'
  error?: string
}

defineProps<{
  isUploading: boolean
  uploadProgress: number
  uploadingFiles: UploadingFile[]
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="uploadingFiles.length > 0"
        class="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-50">
          <div class="flex items-center gap-2.5">
            <Loader v-if="isUploading" class="size-4 text-primary animate-spin shrink-0" />
            <CheckCircle2 v-else class="size-4 text-green-500 shrink-0" />
            <h3 class="text-sm font-black text-gray-900">
              {{ isUploading ? 'Uploading fonts…' : 'Upload complete' }}
            </h3>
          </div>
          <span class="text-xs font-bold" :class="isUploading ? 'text-primary' : 'text-green-500'">
            {{ uploadProgress }}%
          </span>
        </div>

        <div class="h-1 bg-gray-100">
          <div
            class="h-1 transition-all duration-300"
            :class="isUploading ? 'bg-primary' : 'bg-green-500'"
            :style="{ width: uploadProgress + '%' }"
          />
        </div>

        <div class="p-3 space-y-1.5 max-h-52 overflow-y-auto">
          <div
            v-for="(file, idx) in uploadingFiles"
            :key="idx"
            class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors"
            :class="{
              'bg-green-50': file.status === 'success',
              'bg-red-50': file.status === 'error',
              'bg-primary/5': file.status === 'uploading',
              'bg-gray-50': file.status === 'pending',
            }"
          >
            <Loader
              v-if="file.status === 'uploading'"
              class="size-3.5 text-primary animate-spin shrink-0"
            />
            <CheckCircle2
              v-else-if="file.status === 'success'"
              class="size-3.5 text-green-500 shrink-0"
            />
            <AlertCircle
              v-else-if="file.status === 'error'"
              class="size-3.5 text-red-500 shrink-0"
            />
            <div v-else class="size-3.5 rounded-full border-2 border-gray-300 shrink-0" />
            <div class="flex-1 min-w-0">
              <p class="text-xs font-semibold text-gray-800 truncate">{{ file.name }}</p>
              <p v-if="file.error" class="text-[10px] text-red-500 truncate mt-0.5">
                {{ file.error }}
              </p>
              <p v-else-if="file.status === 'uploading'" class="text-[10px] text-primary mt-0.5">
                Processing…
              </p>
              <p v-else-if="file.status === 'success'" class="text-[10px] text-green-500 mt-0.5">
                Ready
              </p>
            </div>
          </div>
        </div>

        <div class="px-5 py-3 border-t border-gray-50 bg-gray-50/50">
          <p class="text-[11px] text-gray-400 font-medium">
            {{ uploadingFiles.filter((f) => f.status === 'success').length }}
            of {{ uploadingFiles.length }} font{{ uploadingFiles.length !== 1 ? 's' : '' }}
            uploaded
          </p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
