<template>
  <section v-if="!isLoading">
    <ElTabs tab-position="right">
      <ElTabPane v-for="lesson in lessons" :key="lesson.id">
        <template #label>
          <router-link :to="{ name: 'lesson', params: { lessonId: lesson.id } }">
            <ElButton size="large">
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
          firstLessonId: 'getFirstLessonId',
        },
      ),
    },

    methods: {
      ...mapActions(['setLessons', 'setFirstLessonId']),
    },

    async created() {
      this.isLoading = true;
      await this.setLessons();
      this.setFirstLessonId();
      this.$router.push({ name: 'lesson', params: { lessonId: this.firstLessonId } });
      console.log(this.firstLessonId);
      
      this.isLoading = false;
    },
  })
</script>

<style>
  button {
    width: 100px;
  }
</style>
