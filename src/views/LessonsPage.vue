<template>
  <section v-if="lessons.length">
    <ElTabs tab-position="right">
      <ElTabPane v-for="lesson in lessons" :key="lesson.id">
        <template #label>
          <router-link :to="lesson.id">
            <ElButton :link="true">
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
      ...mapGetters({ lessons: 'getLessons' }),
    },

    methods: {
      ...mapActions(['setLessons']),
    },

    async created() {
      this.isLoading = true;
      await this.setLessons();
      this.isLoading = false;
    },
  })
</script>

<style>
  
</style>
