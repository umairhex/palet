<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../components/dashboard/Sidebar.vue'
import Header from '../components/dashboard/Header.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div
    class="h-screen bg-background text-foreground flex overflow-hidden"
    :style="{ '--sidebar-width': '14rem' }"
  >
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
      @click="toggleSidebar"
    ></div>

    <Sidebar :is-open="isSidebarOpen" class="h-full shrink-0" />

    <div
      class="flex-1 flex flex-col min-w-0 bg-white h-full overflow-hidden lg:w-[calc(100%-var(--sidebar-width))]"
    >
      <Header :is-sidebar-open="isSidebarOpen" @toggle-sidebar="toggleSidebar" />

      <main class="flex-1 overflow-y-auto bg-gray-50/30 custom-scrollbar">
        <div class="p-6 lg:p-10">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.dashboard-content-white {
  --background: #ffffff;
}
</style>
