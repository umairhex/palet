<script setup lang="ts">
import { type Component } from 'vue'
import { CheckCircle2, ArrowUpRight } from 'lucide-vue-next'

export interface ProductProps {
  variant?: 'hero' | 'side'
  badge: {
    text: string
    icon: Component
    colorClass: string
  }
  title: string
  description: string
  features: string[]
  image: {
    src: string
    alt: string
    transformClass: string
  }
  gradientFrom: string
  gradientTo: string
  borderColor: string
  primaryBtn: {
    text: string
    colorClass: string
    shadowClass?: string
  }
  secondaryBtn?: boolean
}

withDefaults(defineProps<ProductProps>(), {
  variant: 'side',
  secondaryBtn: false,
})
</script>

<template>
  <div
    :class="[
      'relative rounded-[2.5rem] overflow-hidden border transition-all duration-300',
      variant === 'hero'
        ? 'w-full p-8 md:p-16 flex flex-col md:flex-row items-center gap-12'
        : 'flex flex-col gap-10 p-8 md:p-12 h-full',
      borderColor,
    ]"
    :style="{
      background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientTo})`,
    }"
  >
    <div :class="[variant === 'hero' ? 'flex-1 space-y-8' : 'space-y-6']">
      <div
        class="flex items-center gap-2 uppercase tracking-widest text-[10px] md:text-xs transition-colors duration-300"
        :class="[badge.colorClass.replace('bg-', 'text-').replace('-500', '-700')]"
      >
        <span
          :class="[
            'size-7 rounded-full flex items-center justify-center text-white shrink-0',
            badge.colorClass,
          ]"
        >
          <component :is="badge.icon" class="size-3.5" />
        </span>
        <span class="font-bold text-black/80">{{ badge.text }}</span>
      </div>

      <h3
        :class="[
          'font-semibold text-foreground leading-tight ',
          variant === 'hero' ? 'text-3xl md:text-5xl' : 'text-2xl md:text-4xl',
        ]"
        v-html="title"
      ></h3>

      <p
        :class="[
          'text-foreground-lighter leading-relaxed',
          variant === 'hero' ? 'text-lg max-w-md' : '',
        ]"
      >
        {{ description }}
      </p>

      <div
        :class="[variant === 'hero' ? 'flex flex-wrap gap-x-10 gap-y-5' : 'flex flex-col gap-4']"
      >
        <div
          v-for="feature in features"
          :key="feature"
          class="flex items-center gap-3 group/feature"
        >
          <div
            :class="[
              'shrink-0 size-6 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover/feature:scale-110',
              badge.colorClass,
            ]"
          >
            <CheckCircle2 class="size-3.5 text-white" />
          </div>
          <span
            :class="[
              'font-semibold text-foreground-muted leading-tight',
              variant === 'hero' ? 'text-base' : 'text-sm',
            ]"
          >
            {{ feature }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-4 pt-4">
        <button
          :class="[
            'rounded-full text-white font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group',
            variant === 'hero' ? 'px-8 py-4 text-sm' : 'px-6 py-3 text-xs',
            primaryBtn.colorClass,
          ]"
        >
          {{ primaryBtn.text }}
          <ArrowUpRight
            class="size-4 md:size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>

        <button
          v-if="secondaryBtn"
          :class="[
            'rounded-full border border-black/5 font-bold transition-all bg-white/40 hover:bg-white/60 active:scale-95 text-foreground shadow-sm',
            variant === 'hero' ? 'px-8 py-4 text-sm' : 'px-6 py-3 text-xs',
          ]"
        >
          Learn more
        </button>
      </div>
    </div>

    <div
      :class="[
        variant === 'hero'
          ? 'flex-1 relative w-full h-[300px] md:h-[450px]'
          : 'mt-auto h-64 overflow-hidden rounded-xl',
      ]"
    >
      <div
        :class="[
          'rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 h-full w-full',
          image.transformClass,
        ]"
      >
        <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>
