<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import FooterSection from '../components/landing/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-background overflow-x-hidden flex flex-col">
    <Navbar />
    <main class="grow">
      <RouterView />
    </main>
    <FooterSection />
  </div>
</template>
