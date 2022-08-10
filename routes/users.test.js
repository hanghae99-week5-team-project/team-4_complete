const request = require("supertest");
const { Member} = require("../models");
const app = require("../app");


beforeAll(async () => {
    await Member.sync();
});

describe("POST / signup", ()=>{

    test("회원가입 - 신규 가입",  done=>{
        const content = {
            "nickname" : "asdf1234",
            "password" : "1234",
            "confirm" : "1234"}
        request(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log("신규 회원 가입 시 db : ",res.body)})
        .expect(201, done);
    });


    test("회원가입 - 아이디 양식에 맞지 않을 때", done => {
        const content = {
            "nickname" : "aa",
            "password" : "1234",
            "confirm" : "1234"
        }
        request(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log("아이디 양식 맞지 않을 때 에러 메세지",res.body)})
        .expect(400, done);
    });


    test("회원가입 - 패스워드 형식이 맞지 않을 떄", done =>{
        const content = {
            "nickname" : "asdf1234",
            "password" : "123",
            "confirm" : "123"
        }
        request(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log("패스워드 양식이 맞지 않을 떄 에러 메세지", res.body)})
        .expect(400, done);
    });


    test("회원가입 - 패스워드 확인란 불일치 할 떄", done =>{
        const content = {
            "nickname" : "asdf1234",
            "password" : "1234",
            "confirm" : "1111"
        }
        request(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log("패스워드 확인 불일치", res.body)})
        .expect(400, done);
    });

    test("회원가입 - 이미 가입된 닉네임", done => {
        const content = {
            "nickname" : "asdf1234",
            "password" : "1234",
            "confirm" : "1234"
        }
        request(app)
        .post("/signup")
        .send(content)
        .expect((res)=>{console.log('DB에 기존 유저가 있습니다', res.body)})
        .expect(400, done);
    });
});


describe("POST / login", ()=>{
    test("로그인 - 정상 로그인", done => {
        const content = {
            "nickname" : "asdf1234",
            "password" : "1234"
        }
        request(app)
        .post("/login")
        .send(content)
        .expect((res)=>{console.log('로그인에 대한 토큰', res.body)})
        .expect(200, done);
    });

    test("로그인 - 실패", done => {
        const content ={
            "nickname" : "asdf12",
            "password" : "1234"
        }
        request(app)
        .post("/login")
        .send(content)
        .expect((res)=>{console.log('아이디나 비번이 일치하지 않음 : ',res.body)})
        .expect(400, done);
    });
});


describe("로그인한 상태", ()=>{
    const agent = request.agent(app);

    test("이미 로그인 된 상태에서 회원가입", done => {
        request(app)
        .post("/signup")
        .send({
            "nickname" : "bbbb1235",
            "password" : "1234",
            "confirm" : "1234"
        })
        .set("Authorization", ['nameOne=valueOne; namewo=valueTwo'])
        .expect((res)=>{console.log("로그인된 상태 회원가입 메세지 : ",res.body)})
        .expect(400, done);
    });



    test("이미 로그인 된 상태에서 로그인", done => {
        request(app)
        .post("/login")
        .send({
            "nickname" : "bbbb1235",
            "password" : "1234"
        })
        .set("Authorization", ['nameOne=valueOne; namewo=valueTwo'])
        .expect((res)=>{console.log("로그인된 상태 로그인 메세지 : ",res.body)})
        .expect(400, done);
    });
});




afterAll(async () => {
    await Member.sync({force:true});
});