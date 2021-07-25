const { Op } = require("sequelize");
const {
    Color,
    User,
} = require("../sequelize");
const asyncHandler = require("../middlewares/asyncHandler");

exports.newColor = asyncHandler(async (req, res, next) => {
    const color = await Color.create({
        ...req.body,
        userId: req.user.id,
    });

    res.status(200).json({ success: true, data: color });
});

exports.getColor = asyncHandler(async (req, res, next) => {
    const color = await Color.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ["id", "username", "avatar"],
            },
        ],
    });

    if (!color) {
        return next({
            message: `No color found for ID - ${req.params.id}`,
            statusCode: 404,
        });
    }

    // const isTaskMine = req.user.id === task.userId;

    res.status(200).json({ success: true, data: color });
});

exports.searchColor = asyncHandler(async (req, res, next) => {
    if (!req.query.searchterm) {
        return next({ message: "Please enter the searchterm", statusCode: 400 });
    }

    const colors = await Color.findAll({
        include: [{ model: User, attributes: ["id", "avatar", "username"] }],
        where: {
            [Op.or]: {
                name: {
                    [Op.substring]: req.query.searchterm,
                },
            },
        },
    });

    if (!colors.length)
        return res.status(200).json({ success: true, data: colors });

    colors.forEach(async (color, index) => {
        const views = await View.count({ where: { colorId: color.id } });
        color.setDataValue("views", views);

        if (index === colors.length - 1) {
            return res.status(200).json({ success: true, data: colors });
        }
    });
});


exports.editColor = asyncHandler(async (req, res, next) => {
    await Color.update(req.body, {
        where: { id: req. params.id },
    });

    const color = await Color.findByPk(req.params.id, {
        attributes: [
            "id",
            "hex",
            "name",
            "createdAt"
        ],
    });

    res.status(200).json({ success: true, data: color });
});