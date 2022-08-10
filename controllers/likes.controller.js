const LikeService = require("../services/likes.service");

class LikeController {
  likeService = new LikeService();

  // 좋아요 누른 게시물 보여주는 컨트롤러
  getLikes = async (req, res) => {
    const { nickname } = res.locals.user;
    const likepost = await this.likeService.getLikePosts(nickname);

    res.json({ data: likepost });
  };

  // 좋아요 누르기(좋아요취소)
  putLike = async (req, res) => {
    const { nickname } = res.locals.user;
    const postId = req.params._postId;

    const message = await this.likeService.pushLike(postId, nickname);

    res.json({ message });
  };
}

module.exports = LikeController;
