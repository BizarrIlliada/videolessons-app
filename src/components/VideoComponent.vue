<template>
  <div class="video-container">
    <video
      @pause="console.log('Is stopped!')"
      @play="console.log('Is playing!')"
      controls
    >
      <source :src="videoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'YouTubeVideoComponent',
    props: {
      videoUrl: {
        type: String,
        required: true,
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

  .video-container video {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
