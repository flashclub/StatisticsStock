<template>
  <div>
    <div>
      我的数据：所有账户
      <div>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" plain>搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="addDataFn" plain>添加</el-button>
      </div>
      <template>
        <el-table stripe :data="tableData" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
          <el-table-column prop="broker" label="券商"></el-table-column>
          <el-table-column prop="account" label="账户"></el-table-column>
          <el-table-column prop="code" label="代码"></el-table-column>
          <el-table-column prop="company" label="公司名称"></el-table-column>
          <el-table-column prop="handNumber" label="申购手数"></el-table-column>
          <el-table-column prop="listingDate" label="上市日期"></el-table-column>
          <el-table-column prop="publishPrice" label="发行价"></el-table-column>
          <el-table-column prop="marketValue" label="发行市值(亿)"></el-table-column>
          <el-table-column prop="sponsor" label="保荐人"></el-table-column>
          <el-table-column prop="margin" label="孖展倍数"></el-table-column>
          <el-table-column prop="subscriptionMultiple" label="认购倍数"></el-table-column>
          <el-table-column prop="subscriptionPersons" label="认购人数"></el-table-column>
          <el-table-column prop="oneHandSignRate" label="一手中签率"></el-table-column>
          <el-table-column prop="darkDiskGain" label="暗盘涨幅"></el-table-column>
          <el-table-column prop="firstDayGain" label="首日涨幅"></el-table-column>
          <el-table-column prop="handTurnoverRate" label="首日换手率"></el-table-column>
          <el-table-column prop="" width="150" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <template>
        <el-dialog title="添加数据" :visible.sync="centerDialogVisible" width="50%" center>
          <div>
            <el-form inline>
              <el-form-item label='申购公司'>

                <el-select v-model="uploadData.code" placeholder="请选择公司">
                  <el-option v-for="item in codeList" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='申购手数'>
                <el-input-number  v-model="uploadData.handNumber" @change="handleChange" :min="1" :max="10"></el-input-number>
              </el-form-item>
            </el-form>

          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirmDialog">确 定</el-button>
          </span>
        </el-dialog>
      </template>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "futu",
          label: "富途"
        },
        {
          value: "zunjia",
          label: "尊嘉"
        },
        {
          value: "huasheng",
          label: "华盛"
        }
      ],
      value: "",
      addvalue: "",
      tableData: [],
      arr: [],
      centerDialogVisible: false,
      addData: [{}],
      codeList: [],
      uploadData: {
        handNumber: "",
        code: ""
      }
    };
  },
  mounted() {
    this.baseCode();
    this.getDataFn();
  },
  methods: {
    confirmDialog(){
      console.log(this.uploadData);
      this.postDataFn();
    },
    async postDataFn(){
      let postData = this.uploadData;
      const res = await this.$http.post("rest/subscription_infos/subscribeinfo",postData);
      console.log(res);
      if (res.status === 1) {
        this.centerDialogVisible = false;
        this.getDataFn();
      }
    },
    handleChange(){

    },
    async baseCode() {
      const res = await this.$http.post("rest/stock_datas/basedata");
      try {
        let datas = [];
        let resData = res.data;
        console.log(res);
        resData.forEach(ele => {
          datas.push({
            value: ele.code,
            label: ele.company
          });
        });
        this.codeList.push(...datas);
      } catch (error) {}
    },
    changeFn(e) {
      console.log(e);
      if (this.addData[0] && this.addData[0].broker) {
        this.addData[0].broker = e;
      } else {
        this.addData.push({ broker: e });
      }
    },
    addDataFn() {
      this.centerDialogVisible = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    async getDataFn() {
      const res = await this.$http.get("rest/subscription_infos/userinfo");
      console.log(res);
      
      try {
        this.tableData = [];
        this.tableData.push(...res.data);
        this.resetData();
      } catch (error) {}
    },
    resetData() {
      let target = 0;
      this.arr = [];
      this.tableData.forEach((ele, index) => {
        if (!index) {
          this.arr.push(1);
        } else if (
          this.tableData[index - 1].broker == this.tableData[index].broker
        ) {
          !this.arr[target] && this.arr[target]++;
          this.arr[target]++;
          this.arr.push(0);
        } else {
          target = index;
          this.arr.push(0);
        }
      });
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
