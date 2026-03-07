<script setup lang="ts">
export interface PalettePreview {
  primary: string
  secondary: string
  bg: string
  border: string
  titleColor: string
  subtitleColor: string
  cancelBtnClass: string
}

export interface PaletteItem {
  name: string
  colors: string[]
  preview: PalettePreview
}

defineProps<{
  palette: PaletteItem
}>()
</script>

<template>
  <div
    :class="[
      'rounded-[3rem] p-12 md:p-16 border transition-all duration-700 relative group',
      palette.preview.bg,
      palette.preview.border,
    ]"
  >
    <div
      class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] rounded-[3rem]"
    ></div>

    <div class="relative space-y-8">
      <div class="flex items-center justify-between">
        <div class="flex gap-2">
          <div class="size-3 rounded-full bg-red-accent"></div>
          <div class="size-3 rounded-full bg-yellow-accent"></div>
          <div class="size-3 rounded-full bg-green-accent"></div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          :class="[
            'w-1/2 h-4 rounded-full opacity-20 transition-all duration-500',
            palette.preview.primary,
          ]"
        ></div>
        <h3
          :class="[
            'text-3xl md:text-5xl font-black leading-tight transition-all duration-500',
            palette.preview.titleColor,
          ]"
        >
          Designing with <br />
          purpose.
        </h3>
        <p
          :class="[
            'text-lg opacity-40 max-w-sm transition-all duration-500',
            palette.preview.subtitleColor,
          ]"
        >
          Visual asset management is the key primitives of brand identity.
        </p>
      </div>

      <div class="flex gap-4 pt-4">
        <div
          :class="[
            'px-8 py-4 rounded-full text-sm transition-all duration-500 text-white',
            palette.preview.primary,
          ]"
        >
          Action
        </div>
        <div
          :class="[
            'px-8 py-4 rounded-full text-sm border transition-all duration-500',
            palette.preview.cancelBtnClass,
          ]"
        >
          Cancel
        </div>
      </div>
    </div>
  </div>
</template>
