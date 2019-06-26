<template>
  <div class='wrap'>
    <div>
      <el-card>
        <el-form>
          <el-form-item label='用户名'>
            <el-input></el-input>
          </el-form-item>
          <el-form-item label='密码'>
            <el-input></el-input>
          </el-form-item>
          <el-button type='primary'>登录</el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.wrap {
  width: 50%;
  margin: 5rem auto;
}
</style>
