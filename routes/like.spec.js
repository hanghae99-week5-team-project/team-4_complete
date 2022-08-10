const request = require("supertest");
const { Post, Like, Member } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await Post.sync({ force: true });
  await Like.sync({ force: true });
  await Member.sync({ force: true });
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5IjoxfQ.94InjJFaxm2tdM-W7mPwL4UODOtgbRIOb5SJxkbgT0o";

test("회원가입 - 신규 가입", (done) => {
  const content = {
    nickname: "jin",
    password: "1q1q",
    confirm: "1q1q",
  };
  request(app)
    .post("/signup")
    .send(content)
    .expect((res) => {
      console.log("신규 회원 가입 시 db : ", res.body);
    })
    .expect(201, done);
});

test("게시글 작성", (done) => {
  const body = {
    title: "jin 제목",
    content: "jin 내용",
  };
  request(app)
    .post("/posts")
    .set("authorization", "Bearer " + token)
    .send(body)
    .expect((res) => console.log("body : ", res.body))
    .expect(201, done);
});

test("좋아요 등록", (done) => {
  request(app)
    .put("/posts/1/like")
    .set("authorization", "Bearer " + token)
    .expect((res) => {
      console.log("like message: ", res.body);
    })
    .expect(200, done);
});

test("좋아요 게시물 보여주기", (done) => {
  request(app)
    .get("/posts/like")
    .set("authorization", "Bearer " + token)
    .expect((res) => console.log("body : ", res.body))
    .expect(200, done);
});

test("좋아요 취소", (done) => {
  request(app)
    .put("/posts/1/like")
    .set("authorization", "Bearer " + token)
    .expect((res) => {
      console.log("cancel message: ", res.body);
    })
    .expect(200, done);
});

afterAll(async () => {
  await Post.sync({ force: true });
  await Like.sync({ force: true });
  await Member.sync({ force: true });
});
