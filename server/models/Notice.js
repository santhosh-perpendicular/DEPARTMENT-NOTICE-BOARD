const mongoose = require("mongoose");

// Each notice has two fields: title and message
const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
});

// Collection name: notices
module.exports = mongoose.model("Notice", noticeSchema, "notices");
