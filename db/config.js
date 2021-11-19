const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB connect");
  } catch (error) {
    console.log("error DBMONGO", error);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
