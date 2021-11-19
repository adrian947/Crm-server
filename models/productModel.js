const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  stock: {
    type: Number,
    require: true,
    trim: true,
  },
  price: {
    type: Number,
    require: true,
    trim: true,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
});

ProductSchema.index({ name: "text" });

module.exports = mongoose.model("Product", ProductSchema);
