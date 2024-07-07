<script setup lang="ts">
import { ref } from 'vue'

const b = ref<number>(0)
</script>

<template>
  <div>{{ b }}</div>
  <button @click="b++">
    add
  </button>
</template>
