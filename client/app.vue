<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <todo></todo>
    <!-- <router-view /> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import todo from './views/todo/todo.vue'
import Footer from './layout/footer.jsx'

export default {
  name: 'App',
  components: {
    Header,
    todo,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    #cover {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #999;
      opacity: 0.6;
      z-index: -1;
    }
  }
</style>
