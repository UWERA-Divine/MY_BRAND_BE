const Blog = require("../models/blogModel");

exports.createBlog = async (req, res, next) => {
  const newBlog = req.body;
  await Blog.create(newBlog);
  res.status(201).json({
    status: "ok",
    message: "created",
  });
};
exports.getAllBlogs = async (req, res, next) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: "ok",
    data: [blogs],
  });
};
exports.getBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  res.status(200).json({
    status: "ok",
    data: blog,
  });
};
exports.updateBlog = async (req, res, next) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "ok",
    message: "updated",
  });
};

exports.deleteBlog = async (req, res, next) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(203).json({
    status: "ok",
    message: "Deleted",
  });
};
