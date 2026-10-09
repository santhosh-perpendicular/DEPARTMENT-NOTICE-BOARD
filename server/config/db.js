const mongoose = require("mongoose");

const DEFAULT_URI = "mongodb://127.0.0.1:27017/department_notice_board";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || DEFAULT_URI;
    await mongoose.connect(uri);
    console.log("MongoDB connected: department_notice_board");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
