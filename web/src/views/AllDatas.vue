<template>
  <div class='alldatas-style'>
    <div>
      所有数据
      <div id="myChart" :style="{width:'100%',height:'300px'}">
      </div>
      <ve-line :data="chartData"></ve-line>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
      dataArr : [{name: 'one', value: 32},
                {name: 'two', value: 36},
                {name: 'three', value: 40},
                {name: 'four', value: 44},
                {name: 'five', value: 48},
                {name: 'six', value: 52},
                {name: 'seven', value: 56},
                {name: 'eight', value: 60},
                {name: 'nine', value: 64},]
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
        xAxis:{type:'category',data:['0','6H','12H']},
        yAxis:{type:'value'},
        series:[{data:[],type:'line'}],
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
