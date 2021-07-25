const {
  User,
  Task,
  List,
  Color,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll({
    attributes: ["id", "firstname", "lastname", "username", "email"],
  });

  res.status(200).json({ success: true, data: users });
});

exports.removeUser = asyncHandler(async (req, res, next) => {
  await User.destroy({
    where: { username: req.params.username },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.removeTask = asyncHandler(async (req, res, next) => {
  await Task.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.findAll({
    attributes: ["id", "title", "description", "text", "completed", "dataCreated", "dataEnd", "createdAt"],
  });

  res.status(200).json({ success: true, data: tasks });
});

exports.removeList = asyncHandler(async (req, res, next) => {
  await List.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.getLists = asyncHandler(async (req, res, next) => {
  const lists = await List.findAll({
    attributes: ["id", "name", "createdAt"],
  });

  res.status(200).json({ success: true, data: lists });
});

exports.removeColor = asyncHandler(async (req, res, next) => {
  await Color.destroy({
    where: { id: req.params.id },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.getColors = asyncHandler(async (req, res, next) => {
  const colors = await Color.findAll({
    attributes: ["id", "name", "createdAt"],
  });

  res.status(200).json({ success: true, data: colors });
});