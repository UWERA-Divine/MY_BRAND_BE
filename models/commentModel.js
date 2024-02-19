const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  reply: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
