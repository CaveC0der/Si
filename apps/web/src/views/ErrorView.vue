<script setup lang="ts">
defineProps<{
  codeOrName?: number | string;
  message?: string;
}>();
</script>

<template>
  <div class="logo-bg grid h-full w-full place-items-center">
    <div class="flex flex-col items-center gap-1">
      <h1 class="text-7xl font-bold text-slate-50">{{ codeOrName ?? 'Error' }}</h1>
      <p class="text-xl font-medium text-slate-50">{{ message ?? 'Hmmm...' }}</p>
    </div>
  </div>
</template>
