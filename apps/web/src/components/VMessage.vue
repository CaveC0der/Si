<script setup lang="ts">
import type Message from '@/common/message';

defineProps<{
  message: Message;
  sent?: boolean;
  highlight?: boolean;
}>();
</script>

<template>
  <div
    class="flex rounded-lg"
    :class="[sent ? 'justify-end pl-10' : 'pr-10', { 'bg-green-700/40': highlight && !sent }]"
  >
    <div
      class="w-fit min-w-64 rounded-lg p-2"
      :class="sent ? 'bg-green-900 text-slate-50' : 'bg-slate-50 text-green-900'"
    >
      <h4 v-if="!sent" class="font-semibold">{{ message.user.username }}</h4>
      <p class="break-anywhere">{{ message.data }}</p>
      <p class="text-end text-xs">
        {{ new Date(message.timestamp).toLocaleTimeString(undefined, { hourCycle: 'h23' }) }}
      </p>
    </div>
  </div>
</template>
