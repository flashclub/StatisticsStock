<template>
  <div>
    <div>
      我的数据：总体账户
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" plain>添加</el-button>
      </div>
      <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="券商" width="180"></el-table-column>
        <el-table-column prop="id" label="账户" width="180"></el-table-column>
        <el-table-column prop="name" label="代码"></el-table-column>
        <el-table-column prop="name" label="公司名称"></el-table-column>
        <el-table-column prop="amount1" label="上市日期"></el-table-column>
        <el-table-column prop="amount2" label="发行价"></el-table-column>
        <el-table-column prop="amount3" label="发行市值(亿)"></el-table-column>
        <el-table-column prop="amount3" label="保荐人"></el-table-column>
        <el-table-column prop="amount3" label="孖展倍数"></el-table-column>
        <el-table-column prop="amount3" label="认购倍数"></el-table-column>
        <el-table-column prop="amount3" label="认购人数"></el-table-column>
        <el-table-column prop="amount3" label="一手中签率"></el-table-column>
        <el-table-column prop="amount3" label="暗盘涨幅"></el-table-column>
        <el-table-column prop="amount3" label="首日涨幅"></el-table-column>
        <el-table-column prop="amount3" label="首日换手率"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [{
        value: 'futu',
        label: '富途'
      }, {
        value: 'zunjia',
        label: '尊嘉'
      }, {
        value: 'huasheng',
        label: '华盛'
      },],
      value: '',
      tableData: [],
      arr: []
    };
  },
  mounted() {
    this.getDataFn();
  },
  methods: {
    async getDataFn(){
      const res = await this.$http.post('user_datas');
      this.tableData.push(...res.data);
      console.log(this.tableData);
      this.resetData()
    },
    resetData() {
      let target = 0;
      this.tableData.forEach((ele, index) => {
        if (!index) {
          this.arr.push(0);
        } else if (this.tableData[index - 1].agency == this.tableData[index].agency) {
          !this.arr[target] && this.arr[target]++
          this.arr[target]++
          this.arr.push(0)
        } else{
          target = index;
          this.arr.push(0)
        }
      });
      // console.log(this.arr);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (this.arr[rowIndex]) {
          return {
            rowspan: this.arr[rowIndex],
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }      
      return;
    }
  }
};
</script>
<style lang="less">
</style>
