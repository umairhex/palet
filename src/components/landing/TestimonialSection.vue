<script setup lang="ts">
import { Star } from 'lucide-vue-next'

const testimonials = [
  {
    quote:
      'Palet has completely changed how I manage brand assets. No more digging through Figma files for hex codes.',
    author: 'Zeeshan Ahmed',
    role: 'Senior Product Designer',
    company: 'DesignCo',
    tags: ['Productivity', 'Brand Design'],
  },
  {
    quote:
      'The .ttf font vault is a lifesaver. Being able to preview my typography library in the browser is incredible.',
    author: 'Hamza Malik',
    role: 'Frontend Developer',
    company: 'TechFlow',
    tags: ['Development', 'Typography'],
  },
  {
    quote:
      "Finally, a centralized place for all my design primitives. It's the first thing I open for every new project.",
    author: 'Fatima Khan',
    role: 'Creative Director',
    company: 'StudioVibe',
    tags: ['Organization', 'Creative Ops'],
  },
]
</script>

<template>
  <section class="w-full bg-impact-card py-40 px-6 md:px-12 border-t border-background-muted">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col items-center text-center mb-24 space-y-6">
        <h2
          class="text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.1]"
        >
          Trusted by the <br />
          <span class="text-[rgb(99,102,241)]">best in design.</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-[#fcfdfe] rounded-[2.5rem] p-10 md:p-14 border border-subtle flex flex-col justify-between"
        >
          <div class="space-y-10">
            <div class="flex flex-col gap-6">
              <div class="flex gap-1">
                <Star
                  v-for="i in 5"
                  :key="i"
                  class="size-4 fill-emerald-accent text-emerald-accent"
                />
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in testimonial.tags"
                  :key="tag"
                  class="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white border border-subtle rounded-full text-muted-foreground-subtle"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <p class="text-2xl text-foreground-muted leading-relaxed font-medium tracking-tight">
              "{{ testimonial.quote }}"
            </p>
          </div>

          <div class="mt-16 pt-8 border-t border-lighter flex justify-between items-end">
            <div class="flex flex-col gap-1">
              <span class="text-lg font-black text-foreground tracking-tight">{{
                testimonial.author
              }}</span>
              <span
                class="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground-subtle"
              >
                {{ testimonial.role }}
              </span>
            </div>
            <span
              class="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-accent-hover/40"
              >{{ testimonial.company }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
