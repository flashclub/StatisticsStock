const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String },
  password: {
    type: String,
    select: false, //不带出password字段
    set(val) {
      return require("bcrypt").hashSync(val, 12);
    }
  }
});
module.exports = mongoose.model("WebUser", schema);
