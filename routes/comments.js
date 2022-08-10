const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth_middlewares");

const CommentController = require("../controllers/comment.controller");
const commentController = new CommentController();

router.get("/:postId", commentController.getComments);
router.post("/:postId", authMiddleware, commentController.createComment);
router.put("/:commentId", authMiddleware, commentController.updateComment);
router.delete("/:commentId", authMiddleware, commentController.deleteComment);

module.exports = router;
