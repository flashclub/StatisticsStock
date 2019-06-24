<template>
  <div>
    <h1>{{id?'编辑':'新增'}}分类</h1>
    <el-form label-width='120px' @submit.native.prevent="save">
      <el-form-item label='上级分类'>
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key='item._id' :label='item.name' :value='item._id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label='名称'>

        <el-input v-model="model.name"></el-input>
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
    this.fetchParents();
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
        const res = await this.$http.put(`rest/categories/${this.id}`, this.model);
      } else {
        const res = await this.$http.post("rest/categories", this.model);
      }
      this.$router.push("/cataloglist");
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.id}`);

      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    }
  }
};
</script>
<style lang="less">
</style>
