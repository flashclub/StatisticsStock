<template>
  <el-container style="height: 100vh; ">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router  >
        <el-button style="width:100%" type="primary" @click="$router.push('/')">回到首页</el-button>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-message"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="/userlist">用户列表</el-menu-item>
            <el-menu-item index="/cataloglist">分类列表</el-menu-item>
            <el-menu-item index="/editcatalog">新建分类</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/itemslist">物品列表</el-menu-item>
            <el-menu-item index="/edititems">新建物品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-message"></i>用户管理</template>
          <el-menu-item-group>
            <el-menu-item index="/admin_users/edit">新建分类</el-menu-item>
            <el-menu-item index="/admin_users/list">分类列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>

</template>

<style>
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>