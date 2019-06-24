<template>
  <div class='login-page'>
    <el-card header='请先登录'>
      <el-form @submit.native.prevent="login">
        <el-form-item label='用户名'>
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label='密码'>
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-button type='primary' native-type='submit'>登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model:{}
    };
  },
  mounted() {},
  methods: {
    async login(){
      const res = await this.$http.post('login',this.model)
      console.log(res.data);
      
    }
  }
};
</script>
<style >
.login-page{
  width: 25rem;
  margin: 5rem auto;
}
</style>
