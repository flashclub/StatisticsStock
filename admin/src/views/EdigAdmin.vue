<template>
  <div>
    <h1>{{id?'编辑':'新增'}}管理员</h1>
    <el-form label-width='120px' @submit.native.prevent="save">
      <el-form-item label='用户名'>
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label='密码'>
        <el-input v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type='primary' native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  created() {
    this.id && this.fetch();
  },
  updated() {
    if (!this.id && this.model.name) {
      console.log(this.model);
      // this.model={}
    }
  },
  mounted() {
    console.log(this.id);
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        const res = await this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("rest/admin_users", this.model);
      }
      this.$router.push("/admin_users/list");
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    },
  }
};
</script>
<style lang="less">
</style>
