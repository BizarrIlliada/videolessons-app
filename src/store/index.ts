import { createStore } from 'vuex'
import { Lesson, AvailableLessons } from '@/types/global-types';
import { loadLessons } from '../api/lessons-requests';

interface State {
  lessons: Lesson[],
  lessonsIdList: string[],
  availableLessons: AvailableLessons,
}

export default createStore<State>({
  state() {
    return {
      lessons: [] as Lesson[],
      lessonsIdList: [],
      availableLessons: {},
    }
  },

  getters: {
    getLessons(state) {
      return state.lessons;
    },

    getLessonsIdList(state) {
      return state.lessonsIdList;
    },

    getAvailableLessons(state) {
      return state.availableLessons;
    },

    getFirstLessonId(_, getters) {
      return getters.getLessonsIdList[0];
    }
  },

  mutations: {
    setLessons(state, payload: Lesson[]) {
      state.lessons = payload;
    },

    setLessonsIdList(state, payload) {
      state.lessonsIdList = payload;
    },

    setAvailableLessons(state, payload) {
      state.availableLessons = payload;
    },
  },

  actions: {
   async setLessons(context) {
      const lessons = await loadLessons();

      context.commit('setLessons', lessons);
    },

    setLessonsIdList(context) {
      const lessonsIdList = context.getters.getLessons.map((lesson: Lesson) => lesson.id)

      context.commit('setLessonsIdList', lessonsIdList);
    },

    setAvailableLessons(context, payload: AvailableLessons | string) {
      if (typeof payload === 'string') {
        const newPayload = context.getters.getAvailableLessons;
        newPayload[payload] = true;

        context.commit('setAvailableLessons', newPayload);
      } else {
        context.commit('setAvailableLessons', payload);
      }
    },
  },
})
