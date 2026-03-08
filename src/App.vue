<script setup lang="ts">
import '@/style.css'
import ErrorBoundary from './components/ErrorBoundary.vue'
</script>

<template>
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
</template>
