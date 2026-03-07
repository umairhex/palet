<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import { SHOWCASE_PRODUCTS } from '../../constants/landing'
</script>
<template>
  <section class="w-full bg-white pt-16 pb-32 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      <h2
        class="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground-muted leading-tight"
      >
        Simple tools for <span class="text-indigo-accent">beautiful</span> workflows.
      </h2>

      <div class="space-y-8">
        <ProductCard v-if="SHOWCASE_PRODUCTS[0]" v-bind="SHOWCASE_PRODUCTS[0]" />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ProductCard
            v-for="(product, index) in SHOWCASE_PRODUCTS.slice(1)"
            :key="index"
            v-bind="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>
