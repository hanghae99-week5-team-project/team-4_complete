const CommentController = require("./comment.controller");
jest.mock("../models");
const { Comment } = require("../models");

const commentController = new CommentController();
const req = {
  params: {},
  body: {},
};
const res = {
  locals: { user: { nickname: "test" } },
  status: jest.fn(() => res),
  send: jest.fn(() => res),
  json: jest.fn(),
};

describe("GET /comments/:postId", () => {
  test("GET 요청이 오면 해당 게시글의 댓글을 json 형식으로 보낸다", async () => {
    commentController.CommentService.commentRepository.findAllComments =
      jest.fn(() => [{}]);
    await commentController.getComments(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      comment: [
        {
          comment: undefined,
          commentId: undefined,
          createdAt: undefined,
          nickname: undefined,
          postId: undefined,
          updatedAt: undefined,
        },
      ],
    });
  });
});

describe("POST /comments/:postId", () => {
  test("POST 요청이 오면 데이터베이스에 댓글을 생성하고 json 메시지를 응답한다.", async () => {
    const req = {
      params: { postId: "1" },
      body: {
        comment: "test",
      },
    };
    await Comment.create.mockReturnValue({
      postId: 1,
      nickname: "test",
      comment: "test",
      createdAt: "2022.07.01",
      updatedAt: "2022.07.01",
    });
    await commentController.createComment(req, res);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledWith({ message: "댓글을 생성하였습니다." });
  });

  test("댓글 내용을 입력하지 않은 경우 error를 보낸다", async () => {
    const req = {
      params: { postId: "1" },
      body: {
        comment: null,
      },
    };
    try {
      await Comment.findOne.mockReturnValue({ nickname: "test" });
      await commentController.updateComment(req, res);
    } catch (error) {
      expect(error).toEqual(new Error("댓글 내용을 입력해주세요."));
    }
  });
});

describe("PUT /comments/commentId", () => {
  test("PUT 요청이 오면 댓글을 수정하고 json 메시지를 응답한다", async () => {
    const req = {
      params: {},
      body: {
        comment: "test",
      },
    };
    await Comment.findOne.mockReturnValue({ nickname: "test" });
    await Comment.findByPk.mockReturnValue({
      commentId: 1,
    });
    await Comment.update.mockReturnValue({
      commentId: 1,
      nickname: "test",
      comment: "test",
      createdAt: "2022.07.01",
      updatedAt: "2022.07.01",
    });
    await commentController.updateComment(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ message: "댓글을 수정하였습니다." });
  });

  test("본인 댓글이 아닐 경우 error를 보낸다", async () => {
    try {
      await Comment.findOne.mockReturnValue({ nickname: "틀렸지롱" });
      await commentController.updateComment(req, res);
    } catch (error) {
      expect(error).toEqual(new Error("본인 댓글만 수정 가능합니다."));
    }
  });

  test("댓글 내용을 입력하지 않은 경우 error를 보낸다", async () => {
    const req = {
      params: { commentId: "1" },
      body: {
        comment: null,
      },
    };
    try {
      await Comment.findOne.mockReturnValue({ nickname: "test" });
      await commentController.updateComment(req, res);
    } catch (error) {
      expect(error).toEqual(new Error("댓글 내용을 입력해주세요."));
    }
  });
});

describe("DELETE /comments/:commentId", () => {
  test("DELETE 요청이 오면 댓글을 삭제하고 json으로 메시지를 보내준다", async () => {
    await commentController.deleteComment(req, res);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ message: "댓글을 삭제하였습니다." });
  });

  test("본인 댓글이 아닐 경우 error를 보낸다", async () => {
    try {
      await Comment.findOne.mockReturnValue({ nickname: "틀렸지롱" });
      await commentController.deleteComment(req, res);
    } catch (error) {
      expect(error).toEqual(new Error("본인 댓글만 삭제 가능합니다."));
    }
  });

  test("댓글이 존재하지 않는 경우 error를 보낸다", async () => {
    try {
      await Comment.findOne.mockReturnValue({ nickname: "test" });
      await Comment.findByPk.mockReturnValue(null);
      await commentController.deleteComment(req, res);
    } catch (error) {
      expect(error).toEqual(new Error("댓글이 존재하지 않습니다."));
    }
  });
});
