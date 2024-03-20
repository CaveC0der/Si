<script setup lang="ts">
defineProps<{
  visible: boolean;
  tip?: string;
}>();
</script>

<template>
  <div class="relative">
    <slot />
    <transition>
      <div
        v-show="visible"
        class="absolute left-1/2 top-[calc(100%+.1rem)] z-10 -translate-x-1/2 rounded bg-slate-50 p-1 shadow"
      >
        <p class="whitespace-nowrap text-nowrap text-green-900">{{ tip ?? 'Hmmm...' }}</p>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
