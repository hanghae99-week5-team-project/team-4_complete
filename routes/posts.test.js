const supertest = require("supertest");
const app = require("../app")
const { Post,Member } = require("../models");


beforeAll(async () => {
    await Post.sync();
    await Member.sync();
    });

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5IjoxfQ.94InjJFaxm2tdM-W7mPwL4UODOtgbRIOb5SJxkbgT0o";
const token2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcml2YXRla2V5IjoyfQ.DSmG4FaQvSN-xlnCkp2hMUommcsCKraJHDaN2-SOROg";
describe("POST", ()=>{
    test("회원가입 - 신규 가입",  done=>{
        const content = {
            "nickname" : "asdf1234",
            "password" : "1234",
            "confirm" : "1234"}
        supertest(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log("신규 회원 가입 시 db : ",res.body)})
        .expect(201, done);
    });

    test("회원가입 - 신규 가입2",  done=>{
        const content = {
            "nickname" : "test2",
            "password" : "1234",
            "confirm" : "1234"}
        supertest(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log("신규 회원 가입 시 db : ",res.body)})
        .expect(201, done);
    });

    test("포스트 작성", (done) =>{
        const body = {
            "title" : "제목",
            "content" : "12314",
            }
        supertest(app)
            .post("/posts")
            .set("authorization", "Bearer " + token)
            .send(body)
            .expect((res) => console.log("포스트 작성 : ", res.body))
            .expect(201, done)        
    })

    
    test("포스트 작성2", (done) =>{
        const body = {
            "title" : "제목2",
            "content" : "123142",
            }
        supertest(app)
            .post("/posts")
            .set("authorization", "Bearer " + token2)
            .send(body)
            .expect((res) => console.log("포스트 작성 : ", res.body))
            .expect(201, done)        
    })

    test("포스트 작성 미로그인시 실패", (done) =>{
        const body = {
            "title" : "제목",
            "content" : "12314",
            }
        supertest(app)
            .post("/posts")
            .send(body)
            .expect((res) => console.log("포스트 작성 미로그인시 실패 : ", res.body))
            .expect(401, done)        
    })

    test("포스트 작성 제목 미기입", (done) =>{
        const body = {
            "title" : "",
            "content" : "12314",
            }
        supertest(app)
            .post("/posts")
            .set("authorization", "Bearer " + token)
            .send(body)
            .expect((res) => console.log("포스트 작성 제목 미기입 : ", res.body))
            .expect(400, done)        
    })

    



    test("게시글 조회",(done) =>{
        supertest(app)
        .get("/posts")
        .expect((res) => console.log("게시글 조회 :", res.body))
        .expect(200, done) 
        // .expect((json)=> console.log("body : ", res.body), done)
    })

    test("게시글 상세조회",(done) =>{
        supertest(app)
        .get("/posts/1")
        .expect((res) => console.log("게시글 상세조회 : ", res.body))
        .expect(200, done) 
        // .expect((json)=> console.log("body : ", res.body), done)
    })


    test("게시글 수정 내용 미기입",(done) =>{
        const body = {
            "title" : "",
            "content" : "",
            }
        supertest(app)
        .put("/posts/1")
        .set("authorization", "Bearer " + token)
        .send(body)
        .expect((res) => console.log("게시글 수정 로그인 실패 : ", res.body))
        .expect(400, done) 
        // .expect((json)=> console.log("body : ", res.body), done)
    })

    test("게시글 수정",(done) =>{
        const body = {
            "title" : "제목수정",
            "content" : "내용수정",
            }
        supertest(app)
        .put("/posts/1")
        .set("authorization", "Bearer " + token)
        .send(body)
        .expect((res) => console.log("게시글 수정 : ", res.body))
        .expect(201, done) 
    })
    
   

    

    test("게시글 삭제",(done) =>{
        supertest(app)
        .delete("/posts/1")
        .set("authorization", "Bearer " + token)
        .expect((res) => console.log("게시글 삭제: ", res.body))
        .expect(200, done) 
    })

    test("타인 게시물 삭제",(done) =>{
        supertest(app)
        .delete("/posts/2")
        .set("authorization", "Bearer " + token)
        .expect((res) => console.log("게시글 타인 게시물 : ", res.body))
        .expect(400, done) 
    })




})



afterAll(async () => {
    await Post.sync({force:true});
    await Member.sync({force:true});
    });
