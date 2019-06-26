<template>
  <div>
    <div>
      我的数据：总体账户
      <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="券商" ></el-table-column>
        <el-table-column prop="id" label="账户" ></el-table-column>
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
      tableData: [
        {
          agency: "huasheng",
          id: "12987122",
          name: "王小虎1",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          agency: "huasheng",
          id: "12987123",
          name: "王小虎2",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          agency: "huasheng",
          id: "12987124",
          name: "王小虎3",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          agency: "futu",
          id: "12987125",
          name: "王小虎4",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          agency: "futu",
          id: "12987126",
          name: "王小虎5",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        },
        {
          agency: "fuchang",
          id: "12987126",
          name: "王小虎6",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        },
        {
          agency: "fuchang",
          id: "12987126",
          name: "王小虎7",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        },
        {
          agency: "fuchang",
          id: "12987126",
          name: "王小虎8",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      arr: []
    };
  },
  mounted() {
    this.resetData()
  },
  methods: {
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
      console.log(this.arr);
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if(columnIndex === 0){
        if (this.arr[rowIndex]) {
          return {
            rowspan: this.arr[rowIndex],
            colspan: 1
          }
        } else {
          return {
              rowspan: 0,
              colspan: 0
            };
        }
      }
      // if (columnIndex === 0) {
      //   if (rowIndex % 3 === 0) {
      //     return {
      //       rowspan: 3,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    }
  }
};
</script>
<style lang="less">
</style>
