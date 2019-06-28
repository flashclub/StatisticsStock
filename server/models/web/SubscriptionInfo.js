const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  broker: { type: String },
  account: { type: String },
  code: { type: String },
  company: { type: String },
  listingDate: { type: String },
  publishPrice: { type: String },
  marketValue: { type: String },
  sponsor: { type: String },
  margin: { type: String },
  subscriptionMultiple: { type: String },
  subscriptionPersons: { type: String },
  oneHandSignRate: { type: String },
  darkDiskGain: { type: String },
  firstDayGain: { type: String },
  handTurnoverRate: { type: String },
});
module.exports = mongoose.model("SubscriptionInfo", schema);
