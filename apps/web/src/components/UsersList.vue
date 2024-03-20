<script setup lang="ts">
import { useUsersStore } from '@/stores/usersStore';
import { onMounted, onUnmounted } from 'vue';
import VUser from '@/components/VUser.vue';

const usersStore = useUsersStore();

onMounted(() => {
  usersStore.subscribe();
});

onUnmounted(() => {
  usersStore.unsubscribe();
});
</script>

<template>
  <transition-group
    tag="ul"
    name="list"
    class="scroll flex flex-col gap-3 overflow-y-auto bg-slate-50 p-2"
  >
    <v-user v-for="u in usersStore.users" :key="u.id" :user="u" />
  </transition-group>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
