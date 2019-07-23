<template>
  <div class='alldatas-style'>
    <div>
      所有数据
      <div id="myChart" :style="{width:'100%',height:'300px'}">
      </div>
      <ve-histogram :data="chartData"></ve-histogram>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: {
        columns: ['日期', '上市新股数', '暗盘破发', '首日破发'],
        rows: [
          { '日期': '7/1', '上市新股数': 20, '暗盘破发': 8, '首日破发': 3 },
          { '日期': '7/2', '上市新股数': 24, '暗盘破发': 8, '首日破发': 3 },
          { '日期': '7/3', '上市新股数': 30, '暗盘破发': 8, '首日破发': 3 },
          { '日期': '7/4', '上市新股数': 23, '暗盘破发': 8, '首日破发': 3 },
          { '日期': '7/5', '上市新股数': 18, '暗盘破发': 8, '首日破发': 3 },
        ]
      },
      dataArr:[
        {name:'one',value:32},
        {name:'one',value:10},
        {name:'one',value:22},
        {name:'one',value:40},
      ]
    };
  },
  mounted() {
    this.baseCode();
    this.initData()
  },
  methods: {
    initData(){
      const myCharts = this.$echarts.init(document.getElementById('myChart'))
      myCharts.setOption({
        xAxis:{type:'category',data:['0','6H','12H','18H']},
        yAxis:{type:'value'},
        series:[{data:this.dataArr,type:'line'}],
      })
    },
    async baseCode() {
      const res = await this.$http.post("rest/stock_datas/basedata");
    }
  }
};
</script>
<style lang="less">
.alldatas-style{

}
</style>
