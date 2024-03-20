<script setup lang="ts">
import type { User } from '@/types/user';
import WithToolTip from '@/components/WithToolTip.vue';
import { ref } from 'vue';

defineProps<{
  user: User;
}>();

const copied = ref(false);

const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 750);
};
</script>

<template>
  <with-tool-tip :visible="copied" tip="Copied">
    <li
      @click="copyToClipboard(user.username)"
      class="cursor-pointer text-ellipsis rounded-r border-l-2 border-l-green-700 px-3 py-1 font-semibold text-green-900 transition duration-150 hover:bg-slate-200 active:bg-slate-300"
    >
      {{ user.username }}
    </li>
  </with-tool-tip>
</template>
