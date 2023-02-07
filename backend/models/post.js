const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, require: true, default: "" },
  content: { type: String, require: true, default: "" },
});

module.exports = mongoose.model("Post", postSchema);
