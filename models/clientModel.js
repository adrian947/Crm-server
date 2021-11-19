const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ClientSchema = Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  surName: {
    type: String,
    require: true,
    trim: true,
  },
  company: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  create: {
    type: Date,
    default: Date.now(),
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  },
});

module.exports = mongoose.model("Client", ClientSchema);
