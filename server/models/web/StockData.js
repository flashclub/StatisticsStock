const mongoose = require("mongoose");
// 用户打新数据
const schema = new mongoose.Schema({
  // broker: { type: String },   //券商
  // account: { type: String },    //账户
  code: { type: String },         //代码
  company: { type: String },      //公司
  listingDate: { type: String },  //上市日期
  publishPrice: { type: String }, //发行价
  marketValue: { type: String },  //发行市值
  sponsor: { type: String },      //保荐人
  margin: { type: String },       //孖展倍数
  subscriptionMultiple: { type: String },//认购倍数
  subscriptionPersons: { type: String },  //认购人数
  oneHandSignRate: { type: String },      //一手中签率
  darkDiskGain: { type: String },         //暗盘涨幅
  firstDayGain: { type: String },         //首日涨幅
  handTurnoverRate: { type: String },     //首日换手率
});
module.exports = mongoose.model("StockData", schema);
