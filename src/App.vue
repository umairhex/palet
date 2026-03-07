<script setup lang="ts">
import '@/style.css'
import Navbar from './components/Navbar.vue'
import HeroSection from './components/landing/HeroSection.vue'
import UsageImpact from './components/landing/UsageImpact.vue'
import ProductShowcase from './components/landing/ProductShowcase.vue'
import InteractivePalette from './components/landing/InteractivePalette.vue'
import ResourcesSection from './components/landing/ResourcesSection.vue'
import TargetAudience from './components/landing/TargetAudience.vue'
import FaqSection from './components/landing/FaqSection.vue'
import TestimonialSection from './components/landing/TestimonialSection.vue'
import BottomCTA from './components/landing/BottomCTA.vue'
import FooterSection from './components/landing/FooterSection.vue'
</script>
<template>
  <div class="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <UsageImpact />
    <ProductShowcase />
    <InteractivePalette />
    <ResourcesSection />
    <TargetAudience />
    <FaqSection />
    <TestimonialSection />
    <BottomCTA />
    <FooterSection />
  </div>
</template>
