const CommentService = require("../services/comment.service");

class CommentController {
  CommentService = new CommentService();

  getComments = async (req, res) => {
    const { postId } = req.params;
    const comment = await this.CommentService.findAllComments(postId);

    res.status(200).json({ comment });
  };

  createComment = async (req, res) => {
    const { postId } = req.params;
    const { nickname } = res.locals.user;
    const { comment } = req.body;
    await this.CommentService.createComment(postId, nickname, comment);

    res.status(201).json({ message: "댓글을 생성하였습니다." });
  };

  updateComment = async (req, res) => {
    const { commentId } = req.params;
    const { nickname } = res.locals.user;
    const { comment } = req.body;

    await this.CommentService.updateComment(commentId, nickname, comment);

    res.status(200).json({ message: "댓글을 수정하였습니다." });
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { nickname } = res.locals.user;

    await this.CommentService.deleteComment(commentId, nickname);

    res.status(200).json({ message: "댓글을 삭제하였습니다." });
  };
}

module.exports = CommentController;
