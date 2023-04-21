import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ITodoItem } from '@/todo/interfaces';
import { getTodos, createTodo } from '@/todo/service';
import { FIRST_PAGE_PAGINATION } from '@/common/constants';

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<ITodoItem[]>([])
  const currentPage = ref<number>(FIRST_PAGE_PAGINATION)
  const totalPages = ref<number>(10)
  const isLoading = ref<boolean>(false)
  const perPage = ref<number>(8)

  async function fetchTodos(page: number = FIRST_PAGE_PAGINATION, limit: number = 8): Promise<void> {
    isLoading.value = true
    perPage.value = limit
    const data = await getTodos(page, limit)
    todos.value = data.todos
    totalPages.value = data.totalPages
    currentPage.value = data.currentPage
    isLoading.value = false
  }

  async function addTodo(text: string): Promise<void> {
    isLoading.value = true
    await createTodo({ text })
    await fetchTodos()
    isLoading.value = false
  }

  return { todos, currentPage, totalPages, perPage, isLoading, fetchTodos, addTodo }
})