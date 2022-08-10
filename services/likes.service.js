const LikeRepository = require("../repositories/likes.repository");

class LikeService {
  likeRepository = new LikeRepository();

  getLikePosts = async (nickname) => {
    const likeid = await this.likeRepository.findAllLike(nickname);
    // console.log("좋아요아이디 : ", likeid);

    const postId = await likeid.map((a) => {
      return a.postId;
    });
    // console.log("포스트아이디 : ", postId);
    const likepost = await this.likeRepository.findAllPost(postId);

    return likepost
      .map((posts) => ({
        postId: posts.id,
        title: posts.title,
        nickname: posts.nickname,
        content: posts.content,
        Like: posts.Like,
        createdAt: posts.createdAt,
        updatedAt: posts.updatedAt,
      }))
      .sort((a, b) => b.Like - a.Like);
  };

  pushLike = async (postId, nickname) => {
    const existedlike = await this.likeRepository.findOneLike(postId, nickname);
    let message;

    if (existedlike) {
      await this.likeRepository.destroy(postId, nickname);
      await this.likeRepository.decrement(postId);
      return (message = "게시글의 좋아요를 취소하였습니다.");
    } else {
      await this.likeRepository.create(postId, nickname);
      await this.likeRepository.increment(postId);
      return (message = "게시글의 좋아요를 등록하였습니다.");
    }
  };
}

module.exports = LikeService;
