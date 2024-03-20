<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore';
import { ref } from 'vue';
import VInput from '@/components/VInput.vue';

const message = ref('');
const chatStore = useChatStore();

const send = () => {
  if (message.value) {
    chatStore.sendMessage(message.value);
  }
  message.value = '';
};
</script>

<template>
  <form class="flex items-center gap-1 bg-slate-50 p-2" @submit.prevent="send">
    <v-input
      v-model="message"
      name="nickname"
      class="flex-1"
      placeholder="Write a message..."
      autocomplete="off"
    />
    <button
      class="w-9 rounded-full p-1 text-green-700 transition duration-150 hover:bg-green-700 hover:text-slate-50"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2 10h16m0 0l-7-7m7 7l-7 7"
          ></path>
        </g>
      </svg>
    </button>
  </form>
</template>
