const { Op } = require("sequelize");
const {
  User,
  Task,
  List,
  Color,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.toggleSubscribe = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.id) {
    return next({
      message: "You cannot to subscribe to your own channel",
      statusCode: 400,
    });
  }

  const user = await User.findByPk(req.params.id);

  if (!user) {
    return next({
      message: `No user found for ID - '${req.params.id}'`,
      statusCode: 404,
    });
  }

  const isSubscribed = await Subscription.findOne({
    where: {
      subscriber: req.user.id,
      subscribeTo: req.params.id,
    },
  });

  if (isSubscribed) {
    await Subscription.destroy({
      where: {
        subscriber: req.user.id,
        subscribeTo: req.params.id,
      },
    });
  } else {
    await Subscription.create({
      subscriber: req.user.id,
      subscribeTo: req.params.id,
    });
  }

  res.status(200).json({ success: true, data: {} });
});

exports.editUser = asyncHandler(async (req, res, next) => {
  await User.update(req.body, {
    where: { id: req.user.id },
  });

  const user = await User.findByPk(req.user.id, {
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "channelDescription",
      "avatar",
      "cover",
      "email",
    ],
  });

  res.status(200).json({ success: true, data: user });
});

exports.searchUser = asyncHandler(async (req, res, next) => {
  if (!req.query.searchterm) {
    return next({ message: "Please enter your search term", statusCode: 400 });
  }

  const users = await User.findAll({
    attributes: ["id", "username", "avatar", "channelDescription"],
    where: {
      username: {
        [Op.substring]: req.query.searchterm,
      },
    },
  });

  if (!users.length)
    return res.status(200).json({ success: true, data: users });

  users.forEach(async (user, index) => {
    const subscribersCount = await Subscription.count({
      where: { subscribeTo: user.id },
    });

    const tasksCount = await Task.count({
      where: { userId: user.id },
    });

    const isSubscribed = await Subscription.findOne({
      where: {
        [Op.and]: [{ subscriber: req.user.id }, { subscribeTo: user.id }],
      },
    });

    const isMe = req.user.id === user.id;

    user.setDataValue("subscribersCount", subscribersCount);
    user.setDataValue("tasksCount", tasksCount);
    user.setDataValue("isSubscribed", !!isSubscribed);
    user.setDataValue("isMe", isMe);

    if (index === users.length - 1) {
      return res.status(200).json({ success: true, data: users });
    }
  });
});

exports.getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: [
      "id",
      "firstname",
      "lastname",
      "username",
      "cover",
      "avatar",
      "email",
      "channelDescription",
    ],
  });

  if (!user) {
    return next({
      message: `No user found for ID - ${req.params.id}`,
      statusCode: 404,
    });
  }

  const isMe = req.user.id === req.params.id;
  user.setDataValue("isMe", isMe);

  const tasks = await Task.findAll({
    where: { userId: req.params.id },
    attributes: ["id", "title", "description", "text", "completed", "dataCreated", "dataEnd", "createdAt"],
  });

  if (!tasks.length)
    return res.status(200).json({ success: true, data: user });

  tasks.forEach(async (task, index) => {
    const views = await View.count({ where: { taskId: task.id } });
    task.setDataValue("views", views);

    if (index === tasks.length - 1) {
      user.setDataValue("tasks", tasks);
      return res.status(200).json({ success: true, data: user });
    }
  });


  const lists = await List.findAll({
    where: { userId: req.params.id },
    attributes: ["id", "name", "createdAt"],
  });

  if (!lists.length)
    return res.status(200).json({ success: true, data: user });

  lists.forEach(async (list, index) => {
    const views = await View.count({ where: { listId: list.id } });
    list.setDataValue("views", views);

    if (index === lists.length - 1) {
      user.setDataValue("lists", lists);
      return res.status(200).json({ success: true, data: user });
    }
  });

  const colors = await Color.findAll({
    where: { userId: req.params.id },
    attributes: ["id", "hex", "name", "createdAt"],
  });

  if (!colors.length)
    return res.status(200).json({ success: true, data: user });

  colors.forEach(async (coor, index) => {
    const views = await View.count({ where: { colorId: color.id } });
    color.setDataValue("views", views);

    if (index === colors.length - 1) {
      user.setDataValue("colors", colors);
      return res.status(200).json({ success: true, data: user });
    }
  });
});


exports.allTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.findAll({
    attributes: [
      "id",
      "title",
      "description",
      "text",
      "completed",
      "dataCreated",
      "dataEnd",
      "userId",
      "listId",
      "createdAt",
    ],
    include: [{ model: User, attributes: ["id", "avatar", "username"] }, { model: List, attributes: ["id", "name", "colorId"] }],
    order: [["createdAt", "DESC"]],
  });

  if (!tasks.length)
    return res.status(200).json({ success: true, data: tasks });

  tasks.forEach(async (task, index) => {

    if (index === tasks.length - 1) {
      return res.status(200).json({ success: true, data: tasks });
    }
  });
});

exports.allLists = asyncHandler(async (req, res, next) => {
  const lists = await List.findAll({
    attributes: [
      "id",
      "name",
      "userId",
      "colorId",
      "createdAt",
    ],
    include: [{ model: User, attributes: ["id", "avatar", "username"] }, { model: Color, attributes: ["id", "hex", "name"] }],
    order: [["createdAt", "DESC"]],
  });

  if (!lists.length)
    return res.status(200).json({ success: true, data: lists });

  lists.forEach(async (list, index) => {

    if (index === lists.length - 1) {
      return res.status(200).json({ success: true, data: lists });
    }
  });
});

exports.allColors = asyncHandler(async (req, res, next) => {
  const colors = await Color.findAll({
    attributes: [
      "id",
      "hex",
      "name",
      "userId",
      "createdAt",
    ],
    include: [{ model: User, attributes: ["id", "avatar", "username"] }],
    order: [["createdAt", "DESC"]],
  });

  if (!colors.length)
    return res.status(200).json({ success: true, data: colors });

  colors.forEach(async (color, index) => {

    if (index === colors.length - 1) {
      return res.status(200).json({ success: true, data: colors });
    }
  });
});

exports.recommendChannels = asyncHandler(async (req, res, next) => {
  const channels = await User.findAll({
    limit: 10,
    attributes: ["id", "username", "avatar", "channelDescription"],
    where: {
      id: {
        [Op.not]: req.user.id,
      },
    },
  });

  if (!channels.length)
    return res.status(200).json({ success: true, data: channels });

  channels.forEach(async (channel, index) => {
    const subscribersCount = await Subscription.count({
      where: { subscribeTo: channel.id },
    });
    channel.setDataValue("subscribersCount", subscribersCount);

    const isSubscribed = await Subscription.findOne({
      where: {
        subscriber: req.user.id,
        subscribeTo: channel.id,
      },
    });

    channel.setDataValue("isSubscribed", !!isSubscribed);

    const tasksCount = await Task.count({ where: { userId: channel.id } });
    channel.setDataValue("tasksCount", tasksCount);

    if (index === channels.length - 1) {
      return res.status(200).json({ success: true, data: channels });
    }
  });
});

exports.getHistory = asyncHandler(async (req, res, next) => {
  return (getTasks(View, req, res, next))
});

const getTasks = async (model, req, res, next) => {
  const taskRelations = await model.findAll({
    where: { userId: req.user.id },
    order: [["createdAt", "ASC"]],
  });

  const taskIds = taskRelations.map((taskRelation) => taskRelation.taskId);

  const tasks = await Task.findAll({
    attributes: ["id", "title", "description", "text", "completed", "dataCreated", "dataEnd", "createdAt"],
    include: {
      model: List,
      attributes: ["id", "name", "colorId"],
    },
    include: {
      model: User,
      attributes: ["id", "username", "avatar"],
    },
    where: {
      id: {
        [Op.in]: taskIds,
      },
    },
  });

  if (!tasks.length) {
    return res.status(200).json({ success: true, data: tasks });
  }

  tasks.forEach(async (task, index) => {
    const views = await View.count({ where: { taskId: task.id } });
    task.setDataValue("views", views);

    if (index === tasks.length - 1) {
      return res.status(200).json({ success: true, data: tasks });
    }
  });
};

