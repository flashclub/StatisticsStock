const mongoose = require("mongoose");
// 券商信息：暂时不使用
const schema = new mongoose.Schema({
  name: { type: String }
});
module.exports = mongoose.model("Purchase", schema);
