const Comment = require("../models/commentModel");

exports.getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find();
    if (comments.length === 0) {
      return res.status(200).json({
        status: "success",
        message: "create A comment before!",
      });
    }
    res.status(200).json({
      status: "ok",
      data: comments,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body);

    res.status(200).json({
      status: "ok",
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id);
    res.status(200).json({
      status: "ok",
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.updateComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "ok",
      data: comment,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "ok",
      message: "deleted",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
