const { Router } = require("express");

const {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");
const router = Router();

router.route("/").get(getAllComments).post(createComment);
router.route("/:id").get(getComment).patch(updateComment).delete(deleteComment);

module.exports = router;
