import { createStore } from 'vuex'
import { Lesson } from '@/types/global-types';
import { loadLessons } from '../api/lessons-requests';

interface State {
  lessons: Lesson[],
  lessonsIdList: string[],
}

export default createStore<State>({
  state() {
    return {
      lessons: [] as Lesson[],
      lessonsIdList: [],
    }
  },

  getters: {
    getLessons(state) {
      return state.lessons;
    },

    getLessonsIdList(state) {
      return state.lessonsIdList;
    },
  },

  mutations: {
    setLessons(state, payload: Lesson[]) {
      state.lessons = payload;
    },

    setLessonsIdList(state, payload) {
      state.lessonsIdList = payload;
    }
  },

  actions: {
   async setLessons(context) {
      const lessons = await loadLessons();

      context.commit('setLessons', lessons);
    },

    setLessonsIdList(context) {
      const lessonsIdList = context.getters.getLessons.map((lesson: Lesson) => lesson.id)

      context.commit('setLessonsIdList', lessonsIdList);
    }
  },
})
