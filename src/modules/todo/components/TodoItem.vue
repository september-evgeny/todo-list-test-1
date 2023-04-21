<template>
  <div class="mb-2 p-3 rounded-md border border-gray-300">
    {{ todo.text }}
  </div>
</template>

<script setup lang="ts">
import { ITodoItem } from '@/todo/interfaces'

defineProps<{ todo: ITodoItem }>()
</script>

<style scoped></style>
