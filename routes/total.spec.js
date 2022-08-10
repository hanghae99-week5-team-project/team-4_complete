const request = require("supertest");
const { Post, Comment, Like, Member } = require("../models");
const app = require("../app");

beforeAll(async () => {
  await Post.sync({ force: true });
  await Like.sync({ force: true });
  await Member.sync({ force: true });
  await Comment.sync({ force: true });
});

// 회원가입 및 로그인
describe("POST / signup", () => {
  test("회원가입 - 신규 가입", (done) => {
    const content = {
      nickname: "asdf1234",
      password: "1234",
      confirm: "1234",
    };
    request(app)
      .post("/signup")
      .send(content)
      .expect((res) => {
        console.log("신규 회원 가입 시 db : ", res.body);
      })
      .expect(201, done);
  });

  test("회원가입 - 아이디 양식에 맞지 않을 때", (done) => {
    const content = {
      nickname: "aa",
      password: "1234",
      confirm: "1234",
    };
    request(app)
      .post("/signup")
      .send(content)
      .expect((res) => {
        console.log("아이디 양식 맞지 않을 때 에러 메세지", res.body);
      })
      .expect(400, done);
  });

  test("회원가입 - 패스워드 형식이 맞지 않을 떄", (done) => {
    const content = {
      nickname: "asdf1234",
      password: "123",
      confirm: "123",
    };
    request(app)
      .post("/signup")
      .send(content)
      .expect((res) => {
        console.log("패스워드 양식이 맞지 않을 떄 에러 메세지", res.body);
      })
      .expect(400, done);
  });

  test("회원가입 - 패스워드 확인란 불일치 할 떄", (done) => {
    const content = {
      nickname: "asdf1234",
      password: "1234",
      confirm: "1111",
    };
    request(app)
      .post("/signup")
      .send(content)
      .expect((res) => {
        console.log("패스워드 확인 불일치", res.body);
      })
      .expect(400, done);
  });

  test("회원가입 - 이미 가입된 닉네임", (done) => {
    const content = {
      nickname: "asdf1234",
      password: "1234",
      confirm: "1234",
    };
    request(app)
      .post("/signup")
      .send(content)
      .expect((res) => {
        console.log("DB에 기존 유저가 있습니다", res.body);
      })
      .expect(400, done);
  });
});

describe("POST / login", () => {
  test("로그인 - 정상 로그인", (done) => {
    const content = {
      nickname: "asdf1234",
      password: "1234",
    };
    request(app)
      .post("/login")
      .send(content)
      .expect((res) => {
        console.log("로그인에 대한 토큰", res.body);
      })
      .expect(200, done);
  });

  test("로그인 - 실패", (done) => {
    const content = {
      nickname: "asdf12",
      password: "1234",
    };
    request(app)
      .post("/login")
      .send(content)
      .expect((res) => {
        console.log("아이디나 비번이 일치하지 않음 : ", res.body);
      })
      .expect(400, done);
  });
});

describe("로그인한 상태", () => {
  const agent = request.agent(app);

  test("이미 로그인 된 상태에서 회원가입", (done) => {
    request(app)
      .post("/signup")
      .send({
        nickname: "bbbb1235",
        password: "1234",
        confirm: "1234",
      })
      .set("Authorization", ["nameOne=valueOne; namewo=valueTwo"])
      .expect((res) => {
        console.log("로그인된 상태 회원가입 메세지 : ", res.body);
      })
      .expect(400, done);
  });

  test("이미 로그인 된 상태에서 로그인", (done) => {
    request(app)
      .post("/login")
      .send({
        nickname: "bbbb1235",
        password: "1234",
      })
      .set("Authorization", ["nameOne=valueOne; namewo=valueTwo"])
      .expect((res) => {
        console.log("로그인된 상태 로그인 메세지 : ", res.body);
      })
      .expect(400, done);
  });
});

// 토큰
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5IjoiMSJ9.0SPwOFnTHecWvOvU6wN0uJkrkOBEyrmZEc-2m9U1EqU";

const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5IjoyfQ.DSmG4FaQvSN-xlnCkp2hMUommcsCKraJHDaN2-SOROg";

// 게시물 작성
describe("POST", () => {
  test("회원가입 - 신규 가입2", (done) => {
    const content = {
      nickname: "test2",
      password: "1234",
      confirm: "1234",
    };
    request(app)
      .post("/signup")
      .send(content)
      .expect((res) => {
        console.log("신규 회원 가입 시 db : ", res.body);
      })
      .expect(201, done);
  });

  test("포스트 작성", (done) => {
    const body = {
      title: "제목",
      content: "12314",
    };
    request(app)
      .post("/posts")
      .set("authorization", "Bearer " + token)
      .send(body)
      .expect((res) => console.log("포스트 작성 : ", res.body))
      .expect(201, done);
  });

  test("포스트 작성2", (done) => {
    const body = {
      title: "제목2",
      content: "123142",
    };
    request(app)
      .post("/posts")
      .set("authorization", "Bearer " + token2)
      .send(body)
      .expect((res) => console.log("포스트 작성 : ", res.body))
      .expect(201, done);
  });

  test("포스트 작성 미로그인시 실패", (done) => {
    const body = {
      title: "제목",
      content: "12314",
    };
    request(app)
      .post("/posts")
      .send(body)
      .expect((res) => console.log("포스트 작성 미로그인시 실패 : ", res.body))
      .expect(401, done);
  });

  test("포스트 작성 제목 미기입", (done) => {
    const body = {
      title: "",
      content: "12314",
    };
    request(app)
      .post("/posts")
      .set("authorization", "Bearer " + token)
      .send(body)
      .expect((res) => console.log("포스트 작성 제목 미기입 : ", res.body))
      .expect(400, done);
  });

  test("게시글 조회", (done) => {
    request(app)
      .get("/posts")
      .expect((res) => console.log("게시글 조회 :", res.body))
      .expect(200, done);
    // .expect((json)=> console.log("body : ", res.body), done)
  });

  test("게시글 상세조회", (done) => {
    request(app)
      .get("/posts/1")
      .expect((res) => console.log("게시글 상세조회 : ", res.body))
      .expect(200, done);
    // .expect((json)=> console.log("body : ", res.body), done)
  });

  test("게시글 수정 내용 미기입", (done) => {
    const body = {
      title: "",
      content: "",
    };
    request(app)
      .put("/posts/1")
      .set("authorization", "Bearer " + token)
      .send(body)
      .expect((res) => console.log("게시글 수정 내용 미기입 : ", res.body))
      .expect(400, done);
    // .expect((json)=> console.log("body : ", res.body), done)
  });

  test("게시글 수정", (done) => {
    const body = {
      title: "제목수정",
      content: "내용수정",
    };
    request(app)
      .put("/posts/1")
      .set("authorization", "Bearer " + token)
      .send(body)
      .expect((res) => console.log("게시글 수정 : ", res.body))
      .expect(201, done);
  });

  test("게시글 삭제", (done) => {
    request(app)
      .delete("/posts/2")
      .set("authorization", "Bearer " + token2)
      .expect((res) => console.log("게시글 삭제: ", res.body))
      .expect(200, done);
  });

  test("타인 게시물 삭제", (done) => {
    request(app)
      .delete("/posts/1")
      .set("authorization", "Bearer " + token2)
      .expect((res) => console.log("게시글 타인 게시물 : ", res.body))
      .expect(400, done);
  });
});

// 댓글 작성
describe("로그인 한 경우", () => {
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

// 좋아요
describe("좋아요 기능", () => {
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
});

// afterAll(async () => {
//   await Post.sync({ force: true });
//   await Like.sync({ force: true });
//   await Member.sync({ force: true });
//   await Comment.sync({ force: true });
// });
