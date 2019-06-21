<template>
  <div>
    <h1>{{id?'编辑':'新增'}}分类</h1>
    <el-form @submit.native.prevent="save">
      <el-form-item>

        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type='primary'
          native-type="submit"
        >保存</el-button>
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
      model: {}
    };
  },
  created() {
    // this.$http.post(`/catalog/${this.id}`)
    if (this.id) {
      this.fetch();
    }
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
        const res = await this.$http.put(`categories/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/cataloglist");
    },
    async fetch() {
      const res = await this.$http.get(`categories/${this.id}`);
      console.log(res);

      this.model = res.data;
    }
  }
};
</script>
<style lang="less">
</style>
