import { createStore } from 'vuex'
import { Lesson } from '@/types/global-types';
import { loadLessons } from '../api/lessons-requests';

interface State {
  lessons: Lesson[],
}

export default createStore<State>({
  state() {
    return {
      lessons: [] as Lesson[],
    }
  },

  getters: {
    getLessons(state) {
      return state.lessons;
    }
  },

  mutations: {
    setLessons(state, payload: Lesson[]) {
      state.lessons = payload;
    }
  },

  actions: {
   async setLessons(context) {
      const lessons = await loadLessons();

      context.commit('setLessons', lessons);
    }
  },
})
