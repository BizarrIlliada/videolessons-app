import { createStore } from 'vuex'
import { Lesson } from '@/types/global-types';
import { loadLessons } from '../api/lessons-requests';

interface State {
  lessons: Lesson[],
  firstLessonId: string,
}

export default createStore<State>({
  state() {
    return {
      lessons: [] as Lesson[],
      firstLessonId: '',
    }
  },

  getters: {
    getLessons(state) {
      return state.lessons;
    },

    getFirstLessonId(state) {
      return state.firstLessonId;
    }
  },

  mutations: {
    setLessons(state, payload: Lesson[]) {
      state.lessons = payload;
    },

    setFirstLessonId(state, payload: string) {
      state.firstLessonId = payload;
    }
  },

  actions: {
   async setLessons(context) {
      const lessons = await loadLessons();

      context.commit('setLessons', lessons);
    },

    setFirstLessonId(context) {
      const lessonId = context.getters.getLessons[0].id;

      context.commit('setFirstLessonId', lessonId);
    }
  },
})
