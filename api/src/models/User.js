const { Sequelize, DataTypes } = require("sequelize");



module.exports = (Sequelize, DataTypes) => {
  return Sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 6,
      },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
          "https://png.pngtree.com/element_our/20190529/ourlarge/pngtree-user-icon-image_1187018.jpg",
    },
    cover: {
      type: DataTypes.STRING,
      defaultValue:
          "https://res.cloudinary.com/tylerdurden/image/upload/v1617334073/random/Rectangle_2_mbyujf.png",
    },
    channelDescription: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
