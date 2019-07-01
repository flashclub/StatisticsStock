<template>
  <div class='wrap'>
    <div>
      <el-card>
        <el-form>
          <el-form-item label='用户名'>
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label='密码'>
            <el-input v-model="model.password"></el-input>
          </el-form-item>
          <div class="btn-wrap">
            <el-button type='primary' @click="login">登录</el-button>
            <el-button type='primary' @click="regisitorFn">注册</el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model:{},
    };
  },
  mounted() {},
  methods: {
    async regisitorFn(){
      try {
        const res = await this.$http.post('regisitor',this.model);
        this.$message({message:'成功'})
      } catch (error) {
        // this.$message({message:'报错'})
      }
    },
    async login(){
      try {
        const res = await this.$http.post('login',this.model);
        localStorage.token = res.token;
        this.$message({
          type:'success',
          message:'登录成功'
        })
        this.$router.push('/')
        
      } catch (error) {

      }

      
    },
  }
};
</script>
<style lang="less" scoped>
.wrap {
  width: 50%;
  margin: 5rem auto;
}
.btn-wrap{
  display: flex;
  justify-content: space-around;
}
</style>
