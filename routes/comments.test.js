// 통합테스트

const request = require("supertest");
const { Post, Comment, Member } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await Post.sync({ force: true });
  await Member.sync({ force: true });
  await Comment.sync({ force: true });
});

describe("로그인 한 경우", () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5IjoiMSJ9.0SPwOFnTHecWvOvU6wN0uJkrkOBEyrmZEc-2m9U1EqU";

  test("회원가입 - 신규 가입", (done) => {
    const content = {
      nickname: "test",
      password: "1234",
      confirm: "1234",
    };
    request(app)
      .post("/signup")
      .send(content)
      // .expect((res) => {
      //   console.log("신규 회원 가입 시 db : ", res.body);
      // })
      .expect(201, done);
  });

  test("게시글 작성", (done) => {
    const body = {
      title: "제목",
      content: "12314",
    };
    request(app)
      .post("/posts")
      .set("authorization", "Bearer " + token)
      .send(body)
      // .expect((res) => console.log("body : ", res.body))
      .expect(201, done);
  });

  test("POST /comments/:postId", (done) => {
    request(app)
      .post("/comments/1")
      .set("authorization", "Bearer " + token)
      .send({ comment: "test" })
      // .expect((res) => {
      //   console.log("포스트comment: ", res.body);
      // })
      .expect(201, done);
  });

  test("GET /comments/:postId", (done) => {
    request(app)
      .get("/comments/1")
      // .expect((res) => {
      //   console.log("겟comment: ", res.body);
      // })
      .expect(200, done);
  });

  test("PUT /comments/:commentId", (done) => {
    request(app)
      .put("/comments/1")
      .set("authorization", "Bearer " + token)
      .send({ comment: "test 수정이지롱" })
      // .expect((res) => {
      //   console.log("포스트comment: ", res.body);
      // })
      .expect(200, done);
  });

  test("DELETE /comments/:commentId", (done) => {
    request(app)
      .delete("/comments/1")
      .set("authorization", "Bearer " + token)
      // .expect((res) => {
      //   console.log("포스트comment: ", res.body);
      // })
      .expect(200, done);
  });
});

describe("로그인 안 한 경우", () => {
  test("GET /comments/:postId", (done) => {
    request(app)
      .get("/comments/1")
      // .expect((res) => {
      //   console.log("겟comment: ", res.body);
      // })
      .expect(200, done);
  });

  test("POST /comments/:postId", (done) => {
    request(app)
      .post("/comments/1")
      .send({ comment: "test" })
      .expect(401, done);
  });

  test("PUT /comments/:postId", (done) => {
    request(app).put("/comments/1").send({ comment: "test" }).expect(401, done);
  });

  test("DELETE /comments/:postId", (done) => {
    request(app).delete("/comments/1").expect(401, done);
  });
});
