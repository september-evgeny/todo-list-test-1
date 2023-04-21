import { createRouter, createWebHistory } from 'vue-router';

import { mainRoutes } from '@/main/routes';
import { todoRoutes } from '@/todo/routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    ...todoRoutes,
  ],
});

router.beforeEach((to, from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = title
  }
  next()
})

export default router;