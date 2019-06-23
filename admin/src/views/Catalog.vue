<template>
  <div>
    <h1>分类列表</h1>
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
        prop='parent.name'
        label='上级分类'
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
          <el-button
            type="text"
            size="small"
            @click='deleteData(scope.row)'
          >删除</el-button>
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
    async deleteData(row) {
      console.log(row);

      this.$confirm(`此操作将永久删除${row.name}文件, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`categories/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async fetch() {
      const res = await this.$http.get("categories");
      this.items = res.data;
    }
  }
};
</script>
<style lang="less">
</style>
