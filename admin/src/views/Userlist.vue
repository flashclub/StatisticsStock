<template>
  <div>
    <h1>用户列表</h1>
    <el-form @submit.native.prevent='save'>
      <el-form-item label='名称'>
        <el-input v-model="model.name">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-table :data="tableData" border style="width:60%" >
          <el-table-column
            prop="id"
            label="id"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="regisitortime"
            label="注册时间"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop="lastlogintime"
            label="最后登录时间"
            width="220"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
            width='auto'
          >
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-button
        type='primary'
        native-type="submit"
      >
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    const item = {
      id: "1",
      name: "王小虎",
      regisitortime: "2019年6月21日11:36:14",
      lastlogintime: "2019年6月21日11:36:23"
    };
    return {
      tableData: Array(5).fill(item),
      model: {}
    };
  },
  mounted() {},
  methods: {
    async save() {
      const res = this.$http.post("userlist", this.model);
      console.log(res);
      
      this.$router.push("/");
    }
  }
};
</script>
<style lang="less">
</style>
