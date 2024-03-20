<script setup lang="ts">
import VMessage from '@/components/VMessage.vue';
import { useChatStore } from '@/stores/chatStore';
import { onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { nonNullish } from '@/common/nonNullish';
import { mention } from '@/common/mention';

const user = nonNullish(useAuthStore().user);
const chatStore = useChatStore(); // undefined in template if user is unexpectedly null

const mentioned = mention(user.username);

onMounted(() => {
  chatStore.subscribe();
});

onUnmounted(() => {
  chatStore.unsubscribe();
});

const scroll = (el: Element) => {
  el.scrollIntoView({ behavior: 'smooth' });
};
</script>

<template>
  <transition-group
    tag="div"
    name="feed"
    class="logo-bg flex flex-col gap-2 overflow-y-auto overflow-x-hidden p-2"
    @enter="scroll"
  >
    <v-message
      v-for="msg in chatStore?.messages"
      :key="msg.timestamp"
      :message="msg"
      :sent="msg.user.id === user.id"
      :highlight="mentioned(msg.data)"
    />
  </transition-group>
</template>

<style scoped>
.feed-enter-active,
.feed-leave-active {
  transition: all 0.25s ease;
}

.feed-enter-from,
.feed-leave-to {
  opacity: 0;
}
</style>
