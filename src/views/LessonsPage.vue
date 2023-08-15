<template>
  <section v-if="!isLoading">
    <ElTabs tab-position="right">
      <ElTabPane v-for="lesson in lessons" :key="lesson.id" :disabled="!availableLessons[lesson.id]">
        <template #label>
          <router-link :to="{ name: 'lesson', params: { lessonId: lesson.id } }">
            <ElButton :disabled="!availableLessons[lesson.id]" size="large">
              {{ lesson.title }}
            </ElButton>
          </router-link>
        </template>
      </ElTabPane>
      <router-view v-if="lessonsIdList.includes($route.params.lessonId)"></router-view>
    </ElTabs>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  import { ElTabs, ElTabPane } from 'element-plus';

  import { AvailableLessons } from '@/types/global-types';

  export default defineComponent({
    name: 'LessonsPage',
    components: {
      ElTabs,
      ElTabPane,
    },

    data() {
      return {
        isLoading: false,
      }
    },

    computed: {
      ...mapGetters(
        {
          lessons: 'getLessons',
          lessonsIdList: 'getLessonsIdList',
          availableLessons: 'getAvailableLessons',
          firstLessonId: 'getFirstLessonId',
        },
      ),
    },

    methods: {
      ...mapActions(['setLessons', 'setLessonsIdList', 'setAvailableLessons']),

      initAvailableLessons() {
        const availableLessons: AvailableLessons = {};

        for (const lessonId of this.lessonsIdList) {
          availableLessons[lessonId] = lessonId === this.firstLessonId;
        }

        this.setAvailableLessons(availableLessons);
      },
    },

    async created() {
      this.isLoading = true;

      await this.setLessons();
      this.setLessonsIdList();
      this.initAvailableLessons();

      this.$router.push({ name: 'lesson', params: { lessonId: this.firstLessonId } });
      this.isLoading = false;
    },

    beforeRouteUpdate(to, from, next) {
      let toLessonPath = '';

      if (!Array.isArray(to.params.lessonId)) {
        toLessonPath = to.params.lessonId;
      }

      if (this.availableLessons[toLessonPath]) {
        next();
      }
    },
  })
</script>

<style>
  button {
    width: 100px;
  }
</style>
