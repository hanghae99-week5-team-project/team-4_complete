const UserRepository = require("../repositories/users.repository");
const jwt = require("jsonwebtoken");


class UserService{
    userRepository = new UserRepository();

    // 회원가입 서비스 메서드
    createUser = async ( nickname, password, confirm ) => {
        const Idtest = /^[a-zA-z0-9]{3,}/;
        const Pwtest = /^.{4,}$/;

        if (!Idtest.test(nickname)){
            return ({errorMessage: "닉네임 형식과 맞지 않습니다."});

        }
        if (!Pwtest.test(password) || password.search(nickname) > -1){
            return ({errorMessage: "패스워드 형식과 맞지 않습니다."});
        }

        if (password !== confirm ) {
            return ({errorMessage: "패스워드가 패스워드 확인란과 일치하지 않습니다."});

        }
        const existUserData = await this.userRepository.existUser(nickname);
        if (existUserData){
            return ({ errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'});
        }
        const createUserData = await this.userRepository.createUser(nickname, password, confirm);

        return createUserData;
    }



    // 로그인 서비스 메서드
    existUser = async (nickname, password) => {
        const existUserData = await this.userRepository.existUser(nickname, password);
        if (!existUserData){
            return ({errorMessage: '잘못된 닉네임 또는 패스워드입니다.'});         
        }
        const token = jwt.sign({ privatekey : existUserData.id}, "secret_key");
        return ({token})
    }
}

module.exports = UserService;