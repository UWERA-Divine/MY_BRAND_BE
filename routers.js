const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
} = require("./blogController");
const app = express();

const router = express.Router();

router.route("/").get(getAllBlogs).post(createBlog);

router.route("/:id").get(getBlog).patch(updateBlog).delete(deleteBlog);
module.exports = router;
