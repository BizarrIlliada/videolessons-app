<template>
  <ElCard>
    <h2>{{ currentLesson.title }}</h2>
    <h3>{{ currentLesson.subtitle }}</h3>
    <VideoComponent
      :key="currentLesson.video_url"
      :videoUrl="currentLesson.video_url"
    />
    <p>{{ currentLesson.description }}</p>
  </ElCard>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters } from 'vuex';
  import { Lesson } from '@/types/global-types';
  import VideoComponent from './VideoComponent.vue';

  export default defineComponent({
    name: 'LessonComponent',
    components: {
      VideoComponent,
    },
    props: {
      lessonId: {
        type: String,
        required: true,
      }
    },

    computed: {
      ...mapGetters({
        lessons: 'getLessons',
      }),

      currentLesson() {
        return this.lessons.filter((el: Lesson) => el.id === this.lessonId)[0];
      }
    }
  })
</script>

<style scoped>
  h2, h3, p {
    text-align: left;
  }

  p {
    font-size: 20px;
  }
</style>
