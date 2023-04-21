import { TODO_URL } from '@/todo/constants';
import { TODO_TITLE } from '@/todo/constants';
import { TODO_ROUTE_NAME } from '@/todo/constants';
import { RouteRecordRaw } from 'vue-router'

export const todoRoutes: RouteRecordRaw[] = [
  { path: TODO_URL, name: TODO_ROUTE_NAME, component: () => import('@/todo/pages/TodoListPage.vue'), meta: {title: TODO_TITLE} },
]