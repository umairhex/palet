<script setup lang="ts">
import {
  Star,
  Zap,
  ShieldCheck,
  ArrowRight,
  BarChart,
  Users,
  Activity,
  Check,
  X,
} from 'lucide-vue-next'

interface ColorSlot {
  hex: string
  isLocked: boolean
}

const props = defineProps<{
  colors: ColorSlot[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const getContrastColor = (hex?: string) => {
  if (!hex) return '#ffffff'
  const r = parseInt(hex.slice(1, 3), 16) || 0
  const g = parseInt(hex.slice(3, 5), 16) || 0
  const b = parseInt(hex.slice(5, 7), 16) || 0
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}

const c = (index: number) => Math.min(index, props.colors.length - 1)
</script>

<template>
  <div
    class="fixed inset-0 z-100 bg-[#F9FAFB] flex flex-col overflow-y-auto animate-in fade-in duration-500 custom-scrollbar"
  >
    <button
      @click="emit('close')"
      class="fixed top-6 right-6 z-110 size-12 bg-white rounded-full shadow-xl border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:scale-110 transition-transform"
    >
      <X class="size-6" />
    </button>

    <div class="max-w-6xl mx-auto w-full p-6 md:p-10 space-y-16 lg:space-y-24">
      <nav
        class="flex items-center justify-between p-4 bg-white rounded-3xl border border-gray-100 shadow-sm transition-transform"
      >
        <div class="flex items-center gap-3 px-2">
          <div
            class="size-8 rounded-xl flex items-center justify-center shrink-0"
            :style="{ backgroundColor: colors[c(0)]?.hex }"
          >
            <Zap class="size-4" :style="{ color: getContrastColor(colors[c(0)]?.hex) }" />
          </div>
          <span class="font-extrabold text-gray-900 tracking-tight text-lg">PaletCorp</span>
        </div>
        <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
          <a href="#" class="hover:text-gray-900 transition-colors">Products</a>
          <a href="#" class="hover:text-gray-900 transition-colors">Solutions</a>
          <a href="#" class="hover:text-gray-900 transition-colors">Pricing</a>
        </div>
        <div class="flex items-center gap-3">
          <button
            class="hidden sm:block px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Log in
          </button>
          <button
            class="px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-transform hover:scale-105"
            :style="{
              backgroundColor: colors[c(1)]?.hex,
              color: getContrastColor(colors[c(1)]?.hex),
            }"
          >
            Get Started
          </button>
        </div>
      </nav>

      <section class="flex flex-col items-center text-center space-y-8 pt-8 md:pt-12">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border"
          :style="{
            backgroundColor: `${colors[c(2)]?.hex}15`,
            borderColor: `${colors[c(2)]?.hex}30`,
            color: colors[c(2)]?.hex,
          }"
        >
          <Star class="size-3.5" />
          <span>New Features Announced</span>
        </div>

        <h1
          class="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 max-w-4xl leading-[1.1]"
        >
          Build interfaces that <br class="hidden md:block" />
          <span
            class="bg-clip-text text-transparent relative"
            :style="{
              backgroundImage: `linear-gradient(135deg, ${colors[c(0)]?.hex}, ${colors[c(1)]?.hex})`,
            }"
          >
            inspire trust
          </span>
        </h1>

        <p class="text-lg md:text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
          The ultimate platform for modern engineering teams. Preview your beautiful color palettes
          in real-time with responsive UI components.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <button
            class="h-14 px-8 rounded-2xl font-bold text-base shadow-xl flex items-center gap-2 transition-transform hover:-translate-y-1"
            :style="{
              backgroundColor: colors[c(0)]?.hex,
              color: getContrastColor(colors[c(0)]?.hex),
            }"
          >
            Start Building Free
            <ArrowRight class="size-4" />
          </button>
          <button
            class="h-14 px-8 rounded-2xl font-bold text-base border-2 transition-all hover:bg-gray-50 flex items-center gap-2"
            :style="{
              borderColor: colors[c(1)]?.hex,
              color: colors[c(1)]?.hex,
            }"
          >
            View Documentation
          </button>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <div
          class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"
            :style="{ backgroundColor: colors[c(2)]?.hex }"
          ></div>
          <div
            class="size-12 rounded-2xl flex items-center justify-center relative z-10"
            :style="{
              backgroundColor: colors[c(2)]?.hex,
              color: getContrastColor(colors[c(2)]?.hex),
            }"
          >
            <BarChart class="size-6" />
          </div>
          <div class="space-y-1 relative z-10">
            <h4 class="text-gray-500 font-semibold text-sm">Total Revenue</h4>
            <p class="text-3xl font-black text-gray-900">$2.4M</p>
          </div>
        </div>

        <div
          class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"
            :style="{ backgroundColor: colors[c(3)]?.hex }"
          ></div>
          <div
            class="size-12 rounded-2xl flex items-center justify-center relative z-10"
            :style="{
              backgroundColor: colors[c(3)]?.hex,
              color: getContrastColor(colors[c(3)]?.hex),
            }"
          >
            <Users class="size-6" />
          </div>
          <div class="space-y-1 relative z-10">
            <h4 class="text-gray-500 font-semibold text-sm">Active Users</h4>
            <p class="text-3xl font-black text-gray-900">84.5k</p>
          </div>
        </div>

        <div
          class="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col gap-6 relative overflow-hidden group"
        >
          <div
            class="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full opacity-20 -mr-10 -mt-10 transition-transform group-hover:scale-110"
            :style="{ backgroundColor: colors[c(4)]?.hex || colors[c(1)]?.hex }"
          ></div>
          <div
            class="size-12 rounded-2xl flex items-center justify-center relative z-10"
            :style="{
              backgroundColor: colors[c(4)]?.hex || colors[c(1)]?.hex,
              color: getContrastColor(colors[c(4)]?.hex || colors[c(1)]?.hex),
            }"
          >
            <Activity class="size-6" />
          </div>
          <div class="space-y-1 relative z-10">
            <h4 class="text-gray-500 font-semibold text-sm">System Health</h4>
            <p class="text-3xl font-black text-gray-900">99.9%</p>
          </div>
        </div>
      </section>

      <section
        class="bg-white rounded-[3rem] border border-gray-100 shadow-xl overflow-hidden flex flex-col lg:flex-row"
      >
        <div class="p-10 lg:p-14 lg:w-1/2 space-y-8 flex flex-col justify-center">
          <h2 class="text-3xl md:text-4xl font-black tracking-tight text-gray-900">
            Design at the speed of thought.
          </h2>
          <p class="text-gray-500 leading-relaxed font-medium text-lg">
            Every component is crafted carefully to map directly to your brand's unique color
            palette identity automatically.
          </p>

          <ul class="space-y-4 pt-2">
            <li class="flex items-center gap-3">
              <div
                class="size-6 rounded-full flex items-center justify-center shrink-0"
                :style="{
                  backgroundColor: colors[c(1)]?.hex,
                  color: getContrastColor(colors[c(1)]?.hex),
                }"
              >
                <Check class="size-3" />
              </div>
              <span class="font-bold text-gray-700">Automated contrast checking</span>
            </li>
            <li class="flex items-center gap-3">
              <div
                class="size-6 rounded-full flex items-center justify-center shrink-0"
                :style="{
                  backgroundColor: colors[c(1)]?.hex,
                  color: getContrastColor(colors[c(1)]?.hex),
                }"
              >
                <Check class="size-3" />
              </div>
              <span class="font-bold text-gray-700">Accessible by default</span>
            </li>
            <li class="flex items-center gap-3">
              <div
                class="size-6 rounded-full flex items-center justify-center shrink-0"
                :style="{
                  backgroundColor: colors[c(1)]?.hex,
                  color: getContrastColor(colors[c(1)]?.hex),
                }"
              >
                <Check class="size-3" />
              </div>
              <span class="font-bold text-gray-700">Perfect color harmony scales</span>
            </li>
          </ul>
        </div>

        <div
          class="lg:w-1/2 bg-gray-50 border-l border-gray-100 p-8 flex items-center justify-center"
        >
          <div class="w-full max-w-sm space-y-4">
            <div
              class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4 hover:shadow-md transition-shadow"
            >
              <div class="flex items-center gap-3">
                <div
                  class="size-10 rounded-xl"
                  :style="{ backgroundColor: colors[c(2)]?.hex }"
                ></div>
                <div>
                  <div class="h-3 w-24 bg-gray-200 rounded-full mb-1"></div>
                  <div class="h-2 w-16 bg-gray-100 rounded-full"></div>
                </div>
              </div>
              <div class="flex gap-2">
                <div
                  class="h-2 flex-1 rounded-full opacity-40"
                  :style="{ backgroundColor: colors[c(0)]?.hex }"
                ></div>
                <div
                  class="h-2 flex-1 rounded-full opacity-40"
                  :style="{ backgroundColor: colors[c(1)]?.hex }"
                ></div>
                <div
                  class="h-2 flex-1 rounded-full opacity-40"
                  :style="{ backgroundColor: colors[c(2)]?.hex }"
                ></div>
              </div>
            </div>

            <div
              class="p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold"
              :style="{
                backgroundColor: `${colors[c(1)]?.hex}15`,
                color: colors[c(1)]?.hex,
              }"
            >
              <ShieldCheck class="size-5 shrink-0" />
              Your settings have been saved to the cloud successfully.
            </div>

            <div
              class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between"
            >
              <div class="font-bold text-gray-700">Dark Mode</div>
              <div
                class="w-12 h-6 rounded-full relative transition-colors duration-300"
                :style="{ backgroundColor: colors[c(0)]?.hex }"
              >
                <div class="absolute right-1 top-1 size-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="rounded-[3rem] p-12 text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden"
        :style="{
          backgroundColor: colors[c(0)]?.hex,
          color: getContrastColor(colors[c(0)]?.hex),
        }"
      >
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="relative z-10 max-w-2xl space-y-6">
          <h2 class="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to deploy your next big idea?
          </h2>
          <p class="opacity-80 font-medium text-lg max-w-lg mx-auto">
            Join thousands of developers building fast, beautiful, and accessible web experiences
            today.
          </p>
          <div class="pt-4">
            <button
              class="px-8 py-4 rounded-2xl font-black transition-transform hover:scale-105 shadow-xl"
              :style="{
                backgroundColor: getContrastColor(colors[c(0)]?.hex),
                color: colors[c(0)]?.hex,
              }"
            >
              Sign Up For Free
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 10px;
}
</style>
