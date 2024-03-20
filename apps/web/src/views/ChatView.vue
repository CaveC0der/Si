<script setup lang="ts">
import UsersList from '@/components/UsersList.vue';
import SendMessage from '@/components/SendMessage.vue';
import VMe from '@/components/VMe.vue';
import { onErrorCaptured, onUnmounted } from 'vue';
import MessageFeed from '@/components/MessageFeed.vue';
import { useRouter } from 'vue-router';
import NullishError from '@/errors/NullishError';
import { useAuthStore } from '@/stores/authStore';

onUnmounted(() => {
  useAuthStore().leave();
});

onErrorCaptured((err) => {
  useRouter().push({ name: 'error', query: { message: 'Unexpected null' } });
  return !(err instanceof NullishError);
});
</script>

<template>
  <div class="grid h-full w-full grid-cols-[minmax(14rem,2fr)_10fr] grid-rows-[1fr_auto]">
    <users-list />
    <message-feed />
    <v-me v-once />
    <send-message />
  </div>
</template>
