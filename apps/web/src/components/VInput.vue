<script setup lang="ts">
const model = defineModel();
</script>

<template>
  <input
    v-model="model"
    class="border-b-2 border-b-green-700 bg-transparent px-3 py-1 text-green-900 placeholder:font-thin placeholder:text-green-900 focus:outline-none"
  />
</template>
