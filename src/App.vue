<script setup lang="ts">
import '@/style.css'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ToastContainer from './components/ui/ToastContainer.vue'
</script>

<template>
  <ErrorBoundary>
    <RouterView />
    <ToastContainer />
  </ErrorBoundary>
</template>
