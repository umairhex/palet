<script setup lang="ts">
import HeroSection from '../components/landing/HeroSection.vue'
import UsageImpact from '../components/landing/UsageImpact.vue'
import ProductShowcase from '../components/landing/ProductShowcase.vue'
import InteractivePalette from '../components/landing/InteractivePalette.vue'
import ResourcesSection from '../components/landing/ResourcesSection.vue'
import TargetAudience from '../components/landing/TargetAudience.vue'
import FaqSection from '../components/landing/FaqSection.vue'
import TestimonialSection from '../components/landing/TestimonialSection.vue'
import BottomCTA from '../components/landing/BottomCTA.vue'
</script>

<template>
  <div class="w-full flex flex-col min-h-[calc(100vh-80px)]">
    <HeroSection />
    <UsageImpact />
    <ProductShowcase />
    <InteractivePalette />
    <ResourcesSection />
    <TargetAudience />
    <FaqSection />
    <TestimonialSection />
    <BottomCTA />
  </div>
</template>
