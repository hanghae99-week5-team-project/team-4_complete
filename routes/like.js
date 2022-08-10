// routes/like.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth_middlewares");

const LikeController = require("../controllers/likes.controller");
const likeController = new LikeController();

//좋아요 게시글 조회
router.get("/posts/like", authMiddleware, likeController.getLikes);

//게시글 좋아요
router.put("/posts/:_postId/like", authMiddleware, likeController.putLike);

module.exports = router;
