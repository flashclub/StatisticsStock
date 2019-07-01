<template>
  <div>
    <el-container>
      <el-header class='header'>
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
          <el-dropdown>
            <span type="primary">
              我的<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item>资料</el-dropdown-item>
              <el-dropdown-item @click="logoutFn">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async logoutFn(){
      const res = await this.$http('logout')
      try {
        this.$router.push('/login')
      } catch (error) {
        
      }
    },
    handleCommand(command) {
      this.$message("click on item " + command);
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  line-height: 60px;
  box-shadow: 0 0 10px #ccc;
  div {
    display: flex;
    justify-content: flex-end;
    span {
      padding: 0 5px;
      // border: 1px solid #ccc;
    }
  }
}
.title {
  height: 50px;
  width: 100%;
}
</style>
