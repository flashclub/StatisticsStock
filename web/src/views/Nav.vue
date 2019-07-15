<template>
  <div class='nav-style top-wrap' >
    <div>
      <el-button @click="toDataFn">港股数据</el-button>
      <el-button @click="toMyPageFn">打新统计</el-button>
    </div>
    <div>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          <el-dropdown-item command="b">狮子头</el-dropdown-item>
          <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown>
        <span type="primary">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="logoutFn">
        <span type="primary">
          我的<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item>资料</el-dropdown-item>
          <el-dropdown-item command='logout'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toDataFn(){
      this.$router.push('/datas')
    },
    toMyPageFn(){
      this.$router.push('/')
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    logoutFn(c){
      console.log('子组件事件',c);
      if (c==='logout') {
        localStorage.token = '';
        this.$router.push('/login')
      }
      
    },
  }
};
</script>
<style lang="less">
.nav-style{
  display: flex;
  justify-content: space-between;
}
</style>
