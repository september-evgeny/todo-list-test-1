<template>
  <div class="flex mb-4">
    <input
      @keyup.enter="addTodo"
      type="text"
      v-model="newTodo"
      class="border border-gray-300 rounded-md p-2 w-full mr-2"
      placeholder="Add new todo"
    />
    <button
      :disabled="!newTodo.length || props.isLoading"
      type="button"
      @click="addTodo"
      class="bg-blue-500 text-white rounded-md py-2 px-4 disabled:opacity-50"
    >
      Add
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })

const emit = defineEmits(['onAddTodo'])
const newTodo = ref<string>('')

function addTodo() {
  emit('onAddTodo', newTodo.value.trim())
  newTodo.value = ''
}
</script>
