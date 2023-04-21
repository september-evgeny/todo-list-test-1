<template>
  <div>
    <TodoForm :is-loading="isLoading" @on-add-todo="addTodo" />
    <Loading :is-loading="isLoading">
      <div v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" />
      </div>
    </Loading>
    <Pagination
      @page-changed="fetchTodos"
      :total-pages="totalPages"
      :items-per-page="perPage"
      :current-page="currentPage"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useTodoStore } from '@/todo/store'
import { storeToRefs } from 'pinia'
import { FIRST_PAGE_PAGINATION } from '@/common/constants'
import Pagination from '@/common/components/TPagination.vue'
import Loading from '@/common/components/TLoading.vue'
import TodoForm from '@/todo/components/TodoForm.vue'
import TodoItem from '@/todo/components/TodoItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { TODO_URL } from '@/todo/constants'

const router = useRouter()
const route = useRoute()

const todoStore = useTodoStore()
const { addTodo, fetchTodos } = todoStore
const { todos, currentPage, totalPages, perPage, isLoading } =
  storeToRefs(todoStore)

onMounted(() => {
  fetchTodos(getQueryPageNumber())
})

function getQueryPageNumber(): number {
  const queryPage = route.query.page
  return queryPage === null ? FIRST_PAGE_PAGINATION : +queryPage
}

watch(currentPage, () => {
  router.push({ path: TODO_URL, query: { page: currentPage.value } })
})
</script>
