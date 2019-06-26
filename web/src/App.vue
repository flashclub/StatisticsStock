<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import '@/style/reset.less'
export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>

</style>
