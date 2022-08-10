const express = require("express");
const { Comment } = require("../models");

class CommentRepository {
  findAllComments = async (postId) => {
    const comments = await Comment.findAll({ where: { postId } });

    return comments;
  };

  findCommentById = async (commentId) => {
    const comment = await Comment.findByPk(commentId);

    return comment;
  };

  createComment = async (postId, nickname, comment) => {
    const createCommentData = await Comment.create({
      postId,
      nickname,
      comment,
    });

    return createCommentData;
  };

  updateComment = async (commentId, comment) => {
    const updateCommentData = await Comment.update(
      { comment },
      { where: { commentId } }
    );

    return updateCommentData;
  };

  deleteComment = async (commentId) => {
    const deleteCommentData = await Comment.destroy({ where: { commentId } });

    return deleteCommentData;
  };

  targetComment = async (commentId) => {
    const targetCommentData = await Comment.findOne({ where: { commentId } });

    return targetCommentData;
  };
}

module.exports = CommentRepository;
