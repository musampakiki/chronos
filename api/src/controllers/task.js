const { Op } = require("sequelize");
const {
    User,
    Task,
    List,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.newTask = asyncHandler(async (req, res, next) => {
    const task = await Task.create({
        ...req.body,
        userId: req.user.id,
    });

    res.status(200).json({ success: true, data: task });
});

exports.getTask = asyncHandler(async (req, res, next) => {
    const task = await Task.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
        ],
        include: [
            {
                model: List,
                attributes: ["id", "name"],
            },
        ],
    });

    if (!task) {
        return next({
            message: `No task found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    // const isTaskMine = req.user.id === task.userId;

    res.status(200).json({ success: true, data: task });
});

exports.searchTask = asyncHandler(async (req, res, next) => {
    if (!req.query.searchterm) {
        return next({ message: "Please enter the searchterm", statusCode: 400 });
    }

    const tasks = await Task.findAll({
        include: [{ model: User, attributes: ["id", "avatar", "username"] },{ model: List, attributes: ["id", "name", "listId"] }],
        where: {
            [Op.or]: {
                title: {
                    [Op.substring]: req.query.searchterm,
                },
                description: {
                    [Op.substring]: req.query.searchterm,
                },
            },
        },
    });

    if (!tasks.length)
        return res.status(200).json({ success: true, data: tasks });

    tasks.forEach(async (task, index) => {
        const views = await View.count({ where: { taskId: task.id } });
        task.setDataValue("views", views);

        if (index === tasks.length - 1) {
            return res.status(200).json({ success: true, data: tasks });
        }
    });
});


exports.editTask = asyncHandler(async (req, res, next) => {
    await Task.update(req.body, {
        where: { id: req. params.id },
    });

    const task = await Task.findByPk(req.params.id, {
        attributes: [
            "id",
            "title",
            "description",
            "text",
            "dataCreated",
            "dataEnd",
            "createdAt"
        ],
    });

    res.status(200).json({ success: true, data: task });
});