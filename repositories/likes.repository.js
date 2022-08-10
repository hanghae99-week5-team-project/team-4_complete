const { Post, Like } = require("../models");

class LikeRepository {
  findAllLike = async (nickname) => {
    const likeid = await Like.findAll({ where: { nickname } });
    return likeid;
  };

  findAllPost = async (postId) => {
    const likepost = await Post.findAll({ where: { id: postId } });
    return likepost;
  };

  findOnePost = async (postId) => {
    const post = await Post.findOne({ where: { id: postId } });
    return post;
  };

  findOneLike = async (postId, nickname) => {
    const existedlike = await Like.findOne({
      where: { postId: postId, nickname: nickname },
    });
    return existedlike;
  };

  destroy = async (postId, nickname) => {
    await Like.destroy({ where: { postId, nickname } });
  };

  create = async (postId, nickname) => {
    await Like.create({ postId, nickname });
  };

  decrement = async (postId) => {
    const post = await Post.findOne({ where: { id: postId } });
    await post.decrement("Like");
  };

  increment = async (postId) => {
    const post = await Post.findOne({ where: { id: postId } });
    await post.increment("Like");
  };
}

module.exports = LikeRepository;
