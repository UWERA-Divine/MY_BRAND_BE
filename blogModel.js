const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A blog must have a title"],
    min: 5,
  },
  content: {
    type: String,
    required: [true, "a blog must have content"],
  },
  image: {
    type: String,
    required: [true, "A blog must have an image"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
