<template>
  <div class="video-container">
    <video
      @ended="onVideoEnd"
      controls
    >
      <source :src="videoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default defineComponent({
    name: 'YouTubeVideoComponent',
    props: {
      videoUrl: {
        type: String,
        required: true,
      }
    },

    computed: {
      ...mapGetters({
        lessonsIdList: 'getLessonsIdList',
      })
    },

    methods: {
      onVideoEnd() {
        const currentIndex = this.lessonsIdList.findIndex((el: string) => el === this.$route.params.lessonId);

        if(currentIndex + 1 >= this.lessonsIdList.length) {
          return;
        }

        this.setAvailableLessons(this.lessonsIdList[currentIndex + 1])
      },

      ...mapActions(['setAvailableLessons']),
    }
  })
</script>

<style scoped>
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    margin-bottom: 10px;
  }

  .video-container video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
