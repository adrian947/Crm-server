const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const orderSchema = Schema({
  order: {
    type: Array,
    require: true,
  },
  total: {
    type: Number,
    require: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Client",
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  state: {
    type: String,
    default: "Pending",
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Order", orderSchema);
