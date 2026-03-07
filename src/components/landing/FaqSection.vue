<script setup lang="ts">
import { ref } from 'vue'
import FaqItem from './FaqItem.vue'
import { FAQ_ITEMS } from '../../constants/landing'

const faqs = ref(
  FAQ_ITEMS.map((faq, index) => ({
    ...faq,
    isOpen: index === 0,
  })),
)

const toggleFaq = (index: number) => {
  if (faqs.value[index]) {
    faqs.value[index].isOpen = !faqs.value[index].isOpen
  }
}
</script>

<template>
  <section class="w-full bg-white pb-32 pt-16 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-6xl font-bold text-foreground-muted mb-16 tracking-tight">FAQ</h2>

      <div class="flex flex-col gap-3">
        <FaqItem
          v-for="(faq, index) in faqs"
          :key="faq.question"
          :question="faq.question"
          :answer="faq.answer"
          :isOpen="faq.isOpen"
          @toggle="toggleFaq(index)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
:deep(b),
:deep(strong) {
  color: #1e293b;
  font-weight: 700;
}
</style>
