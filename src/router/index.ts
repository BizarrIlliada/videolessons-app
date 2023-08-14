import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LessonsPage from '../views/LessonsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/lessons',
  },
  {
    path: '/lessons',
    name: 'lessons-page',
    component: LessonsPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
