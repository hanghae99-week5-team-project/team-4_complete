const UserService = require("../services/users.service");

class UsersController {
  userService = new UserService();

  // 유저 인증 컨트롤러 메서드
  getUser = async (req, res, next) => {
    const { user } = res.locals;
    res.send({
      user: {
        nickname: user.nickname,
      },
    });
  };

  // 회원가입 컨트롤러 메서드
  postUser = async (req, res, next) => {
    try {
      const {authorization} = req.headers;
      if (authorization){
        return res.status(400).send({
          errorMessage: "로그인한 상태에서 회원가입을 하실 수 없습니다.",
        });
      }

      const { nickname, password, confirm } = req.body;
      const createUserData = await this.userService.createUser(
        nickname,
        password,
        confirm
      );
      if (createUserData.errorMessage) {
        return res.status(400).json(createUserData);
      }
      res.status(201).json(createUserData);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        errorMessage: "요청한 데이터 형식이 알맞지 않습니다.",
      });
    }
  };

  // 로그인 컨트롤러 메서드
  loginUser = async (req, res, next) => {
    try {
      const {authorization} = req.headers;
      console.log("로그인 메서드 중 로그인 되어 있을 때 : ",authorization);
      if (authorization){
        return res.status(400).send({
          errorMessage: "로그인한 상태에서 로그인을 하실 수 없습니다.",
        });
      }

      const { nickname, password } = req.body;
      const loginUserData = await this.userService.existUser(
        nickname,
        password
      );
      if (loginUserData.errorMessage) {
        return res.status(400).json(loginUserData);
      }
      res.status(200).json(loginUserData);
    } catch (err) {
      console.log(err);
      res.status(400).send({
        errorMessage: "요청한 데이터 형식이 알맞지 않습니다.",
      });
    }
  };
}

module.exports = UsersController;
