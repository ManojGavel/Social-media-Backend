const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    min: 3,
    max: 50,
  },
  description: {
    type: String,
    // required: true,
    min: 6,
    max: 50,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
