<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import WithToolTip from '@/components/WithToolTip.vue';
import { useRouter } from 'vue-router';
import VInput from '@/components/VInput.vue';

const username = ref('');
const failed = ref(false);

const authStore = useAuthStore();
const router = useRouter();

const join = () => {
  if (username.value) {
    authStore.join(username.value, (ok) => {
      if (ok) {
        router.push({ name: 'chat' });
      } else {
        failed.value = true;
        setTimeout(() => {
          failed.value = false;
        }, 3000);
      }
    });
  }
  username.value = '';
};
</script>

<template>
  <div class="logo-bg grid h-full w-full place-items-center">
    <div class="flex flex-col items-center rounded-lg bg-slate-50 p-10">
      <h1 class="mb-3 text-2xl font-bold text-green-700">Welcome</h1>
      <form class="flex flex-col gap-2" @submit.prevent="join">
        <v-input
          v-model="username"
          name="username"
          placeholder="Enter your username"
          required
          autocomplete="off"
        />
        <with-tool-tip :visible="failed" tip="Failed to join, try another username">
          <button
            class="w-full rounded bg-green-700 px-5 py-0.5 text-center font-medium text-slate-50"
          >
            Join
          </button>
        </with-tool-tip>
      </form>
    </div>
  </div>
</template>
