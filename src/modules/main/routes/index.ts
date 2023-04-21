import { MAIN_URL } from '@/main/constants';
import { MAIN_TITLE } from '@/main/constants';
import { MAIN_ROUTE_NAME } from '@/main/constants';
import { RouteRecordRaw } from 'vue-router'

export const mainRoutes: RouteRecordRaw[] = [
  { path: MAIN_URL, name: MAIN_ROUTE_NAME, component: () => import('@/main/pages/MainPage.vue'), meta: {title: MAIN_TITLE} },
]