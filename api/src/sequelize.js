const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/User");
const TaskModel = require("./models/Task");
const ColorModel = require("./models/Color");
const ListModel = require("./models/List");

const sequelize = new Sequelize("test1","postgres", "postgres", {
  dialect: "postgres"
});

(async () => await sequelize.sync({ alter: true }))();

const User = UserModel(sequelize, DataTypes);
const Task = TaskModel(sequelize, DataTypes);
const Color = ColorModel(sequelize, DataTypes);
const List = ListModel(sequelize, DataTypes);

Task.belongsTo(User, { foreignKey: "userId" });
List.belongsTo(User, { foreignKey: "userId" });
Color.belongsTo(User, { foreignKey: "userId" });
List.belongsTo(Color, { foreignKey: "colorId" });
Task.belongsTo(List, { foreignKey: "listId" });

List.hasMany(Task, {foreignKey: "listId",});

module.exports = {
  User,
  Task,
  Color,
  List,
};
