"use strict";
const { INTEGER } = require("sequelize");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      nickname: DataTypes.STRING,
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      Like: {
        defaultValue: 0, // INTEGER(0),
        type: DataTypes.INTEGER,
      },
      Like_Id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};