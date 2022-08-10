 const UserService = require("./users.service");
//jest.mock("../models");
const { Member, Post } = require("../models");
const userService = new UserService();

// beforeAll(async () => {
//     await Member.sync();
//     //await Post.sync();
//     });

describe("signsup", () => {
  const userService = new UserService();

  test("아이디 없을 때 회원가입 완료", async () => {
    userService.userRepository.existUser = jest.fn();
    userService.userRepository.createUser = jest.fn(()=>({
        "nickname":"bcbc2",
        "password":"1234"
    }));
    expect(await userService.createUser("bcbc2", "1234", "1234")).toHaveProperty("nickname","bcbc2"); // 데이터 생성
    //expect(await userService.createUser("a1", "1234", "1234")).toBeTruthy();
  });



});


test("login test", async () => {
    expect(await userService.existUser("aa1", "1234")).toBeTruthy(); // 아이디가 없을 때
    expect(await userService.existUser("aaaa1", "1234")).toBeTruthy(); // 아이디가 있을 때
  });

