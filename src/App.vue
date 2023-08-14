<template>
  <ElContainer>
    <ElHeader>
      <h1>
        Header content
      </h1>
    </ElHeader>
    <ElMain>
      <ElCard>
        <router-view/>
      </ElCard>
    </ElMain>
    <ElFooter>© Footer content, 2023</ElFooter>
  </ElContainer>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { ElContainer, ElHeader, ElMain, ElFooter } from 'element-plus';

  export default defineComponent({
    name: 'App',
    components: {
      ElContainer,
      ElHeader,
      ElMain,
      ElFooter,
    },
  })
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
