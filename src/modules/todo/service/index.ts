import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ITodoItem } from '@/todo/interfaces'
import { TODO_API_PATH } from '@/todo/constants'

type TodoResponse = {
  todos: ITodoItem[],
  totalPages: number,
  currentPage: number,
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URI,
})

export const getTodos = async (page: number, limit: number): Promise<TodoResponse> => {
  const response: AxiosResponse<TodoResponse> = await axiosInstance.get(`${TODO_API_PATH}`, {params: {page, limit}})
  return response.data
}

export const createTodo = async (todo: ITodoItem): Promise<ITodoItem> => {
  const response: AxiosResponse<ITodoItem> = await axiosInstance.post(`${TODO_API_PATH}`, todo)
  return response.data
}

