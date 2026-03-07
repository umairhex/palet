<script setup lang="ts">
import { ref } from 'vue'
import { Plus, X } from 'lucide-vue-next'

const faqs = ref([
  {
    question: 'What is Palet?',
    answer:
      'Palet is a <strong>personal design asset vault</strong> that provides a centralized space to effortlessly manage your <strong>color palettes and typography</strong>. It helps designers and developers move faster by keeping their visual identity primitives organized and accessible across all projects.',
    isOpen: true,
  },
  {
    question: 'Who should use Palet’s design asset vault?',
    answer:
      'Palet is built for <strong>Designers, Developers, and Agencies</strong> who want to stop searching through old files or screenshots for hex codes and font files. If you value a structured, persistent library for your design assets, Palet is for you.',
    isOpen: false,
  },
  {
    question: 'Do I need to have design skills to use Palet?',
    answer:
      'Not at all! Palet is designed to be a <strong>simple reference system</strong>. Whether you are a developer looking to quickly copy a hex code or a designer organizing brand assets, the interface is intuitive and requires zero technical overhead.',
    isOpen: false,
  },
  {
    question: 'Can I store both color palettes and font files?',
    answer:
      'Yes! Palet focuses on two critical primitives: <strong>Color and Typography</strong>. You can create multi-color palettes and upload `.ttf` font files to build a comprehensive visual identity library.',
    isOpen: false,
  },
  {
    question: 'Are my design assets accessible across devices?',
    answer:
      'Yes. While Palet works completely without an account on your current device, you can optionally create a free account to use our <strong>persistent cloud storage</strong>. Logging in ensures your entire library of palettes and fonts syncs instantly across any device or session.',
    isOpen: false,
  },
  {
    question: 'Is Palet free to use?',
    answer:
      'Yes, entirely free! All core features are accessible immediately without paying or even signing up. Accounts are optional and only used for cross-device syncing.',
    isOpen: false,
  },
])

const toggleFaq = (index: number) => {
  if (faqs.value[index]) {
    faqs.value[index].isOpen = !faqs.value[index].isOpen
  }
}
</script>

<template>
  <section class="w-full bg-white pb-32 pt-16 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <h2 class="text-6xl font-bold text-slate-800 mb-16 tracking-tight">FAQ</h2>

      <div class="flex flex-col gap-3">
        <div v-for="(faq, index) in faqs" :key="index" class="transition-all duration-300">
          <div
            @click="toggleFaq(index)"
            :class="[
              'rounded-xl cursor-pointer transition-all duration-300 border',
              faq.isOpen
                ? 'bg-white border-slate-200 shadow-sm p-8'
                : 'bg-impact-card border-transparent px-8 py-6',
            ]"
          >
            <div class="flex justify-between items-center gap-4">
              <h3
                :class="[
                  'text-xl font-bold tracking-tight transition-colors',
                  faq.isOpen ? 'text-slate-800' : 'text-slate-700',
                ]"
              >
                {{ faq.question }}
              </h3>
              <div class="shrink-0">
                <X v-if="faq.isOpen" class="size-5 text-slate-400" />
                <Plus v-else class="size-6 text-slate-400" />
              </div>
            </div>

            <div v-if="faq.isOpen" class="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <p class="text-slate-500 leading-relaxed text-lg" v-html="faq.answer"></p>
            </div>
          </div>
        </div>
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
