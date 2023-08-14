<template>
  <div class="video-container">
    <iframe :src="embedUrl" width="640" height="360" frameborder="0" allowfullscreen></iframe>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'YouTubeVideoComponent',
    props: {
      videoUrl: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        videoDetails: {},
      }
    },

    computed: {
      videoId() {
        return this.videoUrl.split('v=')[1];
      },

      embedUrl() {
        return `https://www.youtube.com/embed/${this.videoId}?token=AIzaSyC2aHL2yiWvsjx7vDRQhVUs1CPPW4V-s68`;
      }
    },
  })
</script>

<style scoped>
  .video-container {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    margin-bottom: 10px;
  }

  .video-container iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
