<template>
  <div>
    <el-container>
      <el-header class='header'>
        <Nav></Nav>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Nav from './Nav'
export default {
  data() {
    return {};
  },
  components:{
    Nav
  },
  mounted() {},
  methods: {
  }
};
</script>
<style lang="less" scoped>
.header {
  line-height: 60px;
  box-shadow: 0 0 10px #ccc;
}
.title {
  height: 50px;
  width: 100%;
}
</style>
