<script setup lang="ts"></script>

<template>
  <div class="w-full h-full bg-white text-foreground">
    <div class="w-full prose-emerald">
      <slot />
    </div>
  </div>
</template>

<style scoped>
:deep(h1) {
  font-size: 2.25rem;
  line-height: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  margin-bottom: 2rem;
  color: #0f172a;
}
@media (min-width: 768px) {
  :deep(h1) {
    font-size: 3rem;
    line-height: 1;
  }
}
:deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  color: #1e293b;
}
@media (min-width: 768px) {
  :deep(h2) {
    font-size: 1.875rem;
    line-height: 2.25rem;
  }
}
:deep(p) {
  color: #64748b;
  line-height: 1.625;
  margin-bottom: 1.5rem;
}
:deep(ul) {
  list-style-type: disc;
  list-style-position: outside;
  margin-left: 1.5rem;
  color: #64748b;
  margin-bottom: 2rem;
}
:deep(li) {
  margin-bottom: 0.5rem;
}
:deep(b),
:deep(strong) {
  font-weight: 700;
  color: #1e293b;
}
:deep(a) {
  color: #10b981;
  text-decoration: underline;
  text-underline-offset: 4px;
  transition-property: color;
  transition-duration: 150ms;
}
:deep(a:hover) {
  color: #059669;
}
</style>
