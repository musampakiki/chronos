const { Op } = require("sequelize");
const {
    User,
    Task,
    List,
    Color,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.newList = asyncHandler(async (req, res, next) => {
    const list = await List.create({
        ...req.body,
        userId: req.user.id,
    });

    res.status(200).json({ success: true, data: list });
});

exports.getList = asyncHandler(async (req, res, next) => {
    const list = await List.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
        ],
        include: [
            {
                model: Color,
                attributes: ["id", "hex", "name"],
            },
        ],
    });

    if (!list) {
        return next({
            message: `No list found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    const tasks = await list.getTasks({
        order: [["createdAt", "DESC"]],
        attributes: ["id", "title", "createdAt"],
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
        ],
    });

    const tasksCount = await Task.count({
        where: {
            listId: req.params.id,
        },
    });

    // const isTaskMine = req.user.id === task.userId;


    // likesCount, disLikesCount, views
    list.setDataValue("tasks", tasks);
    list.setDataValue("tasksCount", tasksCount);

    res.status(200).json({ success: true, data: list });
});

exports.searchList = asyncHandler(async (req, res, next) => {
    if (!req.query.searchterm) {
        return next({ message: "Please enter the searchterm", statusCode: 400 });
    }

    const lists = await List.findAll({
        include: [{ model: User, attributes: ["id", "avatar", "username"] },{ model: Color, attributes: ["id", "hex", "name"] }],
        where: {
            [Op.or]: {
                name: {
                    [Op.substring]: req.query.searchterm,
                },
            },
        },
    });

    if (!lists.length)
        return res.status(200).json({ success: true, data: lists });

    lists.forEach(async (task, index) => {
        const views = await View.count({ where: { taskId: task.id } });
        list.setDataValue("views", views);

        if (index === lists.length - 1) {
            return res.status(200).json({ success: true, data: lists });
        }
    });
});


exports.editList = asyncHandler(async (req, res, next) => {
    await List.update(req.body, {
        where: { id: req. params.id },
    });

    const list = await List.findByPk(req.params.id, {
        attributes: [
            "id",
            "name",
            "createdAt"
        ],
    });

    res.status(200).json({ success: true, data: list });
});