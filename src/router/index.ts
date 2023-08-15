import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import LessonsPage from '../views/LessonsPage.vue';
import LessonComponent from '../components/LessonComponent.vue';

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
    children: [
      {
        name: 'lesson',
        path: ':lessonId',
        props: true,
        component: LessonComponent,
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

export default router
