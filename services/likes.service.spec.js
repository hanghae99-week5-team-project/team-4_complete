const LikeService = require("./likes.service");

const { Post, Like } = require("../models");

beforeAll(async () => {
  await Post.sync();
  await Like.sync();
});

describe("getLikePosts", () => {
  const likeservice = new LikeService();
  const nickname = "jinjin";

  test("좋아요 게시물 보여주기", async () => {
    likeservice.likeRepository.findAllPost = jest.fn(() => [
      {
        id: 1,
        title: "title1",
        nickname: "nick1",
        content: "content1",
        Like: 1,
        createdAt: "2022-08-02T15:03:26.000Z",
        updatedAt: "2022-08-05T08:43:20.000Z",
      },
      {
        id: 2,
        title: "title2",
        nickname: "nick2",
        content: "content2",
        Like: 1,
        createdAt: "2022-08-02T15:03:26.000Z",
        updatedAt: "2022-08-05T08:43:20.000Z",
      },
    ]);
    const likeposts = await likeservice.getLikePosts(nickname);
    expect(likeposts).toEqual([
      {
        postId: 1,
        title: "title1",
        nickname: "nick1",
        content: "content1",
        Like: 1,
        createdAt: "2022-08-02T15:03:26.000Z",
        updatedAt: "2022-08-05T08:43:20.000Z",
      },
      {
        postId: 2,
        title: "title2",
        nickname: "nick2",
        content: "content2",
        Like: 1,
        createdAt: "2022-08-02T15:03:26.000Z",
        updatedAt: "2022-08-05T08:43:20.000Z",
      },
    ]);
  });
});

describe("pushLike", () => {
  const likeservice = new LikeService();
  const postId = "9";
  const nickname = "jinjin";

  test("좋아요 등록", async () => {
    likeservice.likeRepository.findOneLike = jest.fn(() => "");

    likeservice.likeRepository.increment = jest.fn();

    const message = await likeservice.pushLike(postId, nickname);

    expect(message).toEqual("게시글의 좋아요를 등록하였습니다.");
  });

  test("좋아요 취소", async () => {
    likeservice.likeRepository.findOneLike = jest.fn(() => ({
      postId,
      nickname,
    }));
    likeservice.likeRepository.decrement = jest.fn();

    const message = await likeservice.pushLike(postId, nickname);

    expect(message).toEqual("게시글의 좋아요를 취소하였습니다.");
  });
});
