const CommentRepository = require("../repositories/comment.repository");

class CommentService {
  commentRepository = new CommentRepository();

  findAllComments = async (postId) => {
    const allComments = await this.commentRepository.findAllComments(postId);

    allComments.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return allComments.map((comment) => {
      return {
        postId: comment.postId,
        commentId: comment.commentId,
        nickname: comment.nickname,
        comment: comment.comment,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      };
    });
  };

  createComment = async (postId, nickname, comment) => {
    if (!comment) throw new Error("댓글 내용을 입력해주세요.");

    const createCommentData = await this.commentRepository.createComment(
      postId,
      nickname,
      comment
    );

    return {
      postId: createCommentData.postId,
      nickname: createCommentData.nickname,
      comment: createCommentData.comment,
      createdAt: createCommentData.createdAt,
      updatedAt: createCommentData.updatedAt,
    };
  };

  updateComment = async (commentId, nickname, comment) => {
    const targetComment = await this.commentRepository.targetComment(commentId);

    if (nickname !== targetComment.nickname)
      throw new Error("본인 댓글만 수정 가능합니다.");
    if (!comment) throw new Error("댓글 내용을 입력해주세요.");

    await this.commentRepository.updateComment(commentId, comment);

    const updateComment = await this.commentRepository.findCommentById(
      commentId
    );

    return {
      commentId: updateComment.commentId,
      nickname: updateComment.nickname,
      comment: updateComment.comment,
      createdAt: updateComment.createdAt,
      updatedAt: updateComment.updatedAt,
    };
  };

  deleteComment = async (commentId, nickname) => {
    const targetComment = await this.commentRepository.targetComment(commentId);
    const findComment = await this.commentRepository.findCommentById(commentId);

    if (nickname !== targetComment.nickname)
      throw new Error("본인 댓글만 삭제 가능합니다.");
    if (!findComment) throw new Error("댓글이 존재하지 않습니다.");

    await this.commentRepository.deleteComment(commentId);

    return {
      commentId: findComment.commentId,
      nickname: findComment.nickname,
      comment: findComment.comment,
      createdAt: findComment.createdAt,
      updatedAt: findComment.updatedAt,
    };
  };
}

module.exports = CommentService;
