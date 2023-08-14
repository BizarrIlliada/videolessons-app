<template>
  <ElCard>
    <h2>{{ currentLesson.title }}</h2>
    <h3>{{ currentLesson.subtitle }}</h3>
    <iframe src="" frameborder="0"></iframe>
    <p>{{ currentLesson.description }}</p>
  </ElCard>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters } from 'vuex';
  import { Lesson } from '@/types/global-types';

  export default defineComponent({
    name: 'LessonComponent',
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
        const lesson = this.lessons.filter((el: Lesson) => el.id === this.lessonId)[0];

        return lesson;
      }
    }
  })
</script>
