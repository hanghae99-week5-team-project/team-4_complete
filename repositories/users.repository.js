const { Op } = require("sequelize");
const { Member } = require("../models");

class UserRepository {
  // DB애 기존 유저 확인 메서드
  existUser = async (nickname, password = undefined) => {
    if (!password) {
      // 또다른 방법으로 오버로딩을 해도 된다.
      const existUserData = await Member.findOne({
        where: { nickname },
      });
      return existUserData;
    } else {
      const existUserData = await Member.findOne({
        where: { nickname, password },
      });
      return existUserData;
    }
  };

  // DB에 새로운 유저 삽입
  createUser = async (nickname, password) => {
    const createUserData = await Member.create({ nickname, password });
    return createUserData;
  };
}

module.exports = UserRepository;
