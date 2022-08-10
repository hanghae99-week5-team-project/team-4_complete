const LikeController = require("./likes.controller");

// jest.mock("../models/like");
// const { Like } = require("../models/like");

const likeController = new LikeController();
const req = {
  params: { _postId: 1 },
};
const res = {
  locals: { user: { nickname: "jinjin" } },
  status: jest.fn(() => res),
  json: jest.fn(),
};

describe("GET /post/like", () => {
  test("좋아요 게시믈 보여주기", async () => {
    likeController.likeService.getLikePosts = jest.fn(() => [
      {
        postId: 1,
        title: "title1",
        nickname: "nick1",
        content: "content1",
        Like: 1,
        createdAt: "2022-08-02T15:03:26.000Z",
        updatedAt: "2022-08-05T08:43:20.000Z",
      },
    ]);
    await likeController.getLikes(req, res);
    expect(res.json).toBeCalledWith({
      data: [
        {
          postId: 1,
          title: "title1",
          nickname: "nick1",
          content: "content1",
          Like: 1,
          createdAt: "2022-08-02T15:03:26.000Z",
          updatedAt: "2022-08-05T08:43:20.000Z",
        },
      ],
    });
  });
});

describe("PUT /posts/:_postId/like", () => {
  test("좋아요 등록 컨트롤러", async () => {
    likeController.likeService.pushLike = jest.fn(
      () => "게시글의 좋아요를 등록/취소하였습니다."
    );
    await likeController.putLike(req, res);
    expect(res.json).toBeCalledWith({
      message: "게시글의 좋아요를 등록/취소하였습니다.",
    });
  });
});
