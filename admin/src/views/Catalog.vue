<template>
  <div>
    <el-table
      :data='items'
      border
      style="width:100%"
    >
      <el-table-column
        prop='_id'
        label='ID'
      ></el-table-column>
      <el-table-column
        prop='name'
        label='分类名称'
      ></el-table-column>
      <el-table-column
        prop='name'
        label='操作'
      ><template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click='$router.push(`editcatalog/${scope.row._id}`)'
          >编辑</el-button>
        </template></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {},
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    }
  }
};
</script>
<style lang="less">
</style>
