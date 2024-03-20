<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { nonNullish } from '@/common/nonNullish';

const user = nonNullish(useAuthStore().user);
</script>

<template>
  <div class="flex w-full items-center gap-1 bg-slate-50 p-2">
    <p class="flex-grow rounded bg-green-700 px-3 py-1 text-center font-semibold text-slate-50">
      {{ user?.username }}
    </p>
  </div>
</template>
