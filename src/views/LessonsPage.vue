<template>
  <section v-if="!isLoading">
    <ElTabs tab-position="right">
      <ElTabPane v-for="lesson in lessons" :key="lesson.id" :disabled="!areLessonsAvailable[lesson.id]">
        <template #label>
          <router-link :to="{ name: 'lesson', params: { lessonId: lesson.id } }">
            <ElButton :disabled="!areLessonsAvailable[lesson.id]" size="large">
              {{ lesson.title }}
            </ElButton>
          </router-link>
        </template>
      </ElTabPane>
      <router-view></router-view>
    </ElTabs>
  </section>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  import { ElTabs, ElTabPane } from 'element-plus';

  interface LessonsAvailability {
    [key: string]: boolean,
  }

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
        },
      ),

      areLessonsAvailable() {
        const result: LessonsAvailability = {};

        for (const lessonId of this.lessonsIdList) {
          result[lessonId] = this.firstLessonId === lessonId;
        }

        return result;
      },

      firstLessonId() {
        return this.lessonsIdList[0];
      },
    },

    methods: {
      ...mapActions(['setLessons', 'setLessonsIdList']),
    },

    async created() {
      this.isLoading = true;

      await this.setLessons();
      this.setLessonsIdList();
      this.$router.push({ name: 'lesson', params: { lessonId: this.firstLessonId } });
      
      this.isLoading = false;
    },

    beforeRouteUpdate(to, from, next) {
      let toLessonPath = '';

      if (!Array.isArray(to.params.lessonId)) {
        toLessonPath = to.params.lessonId;
      }

      if (this.areLessonsAvailable[toLessonPath]) {
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
