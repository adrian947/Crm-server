const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = Schema({
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
  email: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    trim: true,
  },
  create: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("User", UserSchema);
