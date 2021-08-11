const express = require("express");
const router = express.Router();
const { allTasks } = require("../controllers/user");
const { removeTask } = require("../controllers/admin");
const { protect, admin } = require("../middlewares/auth");

const {
    newTask,
    getTask,
    editTask,
    searchTask,
} = require("../controllers/task");


router.route("/").get(protect, allTasks);
router.route("/search").get(protect, searchTask);
router.route("/:id").get(protect, getTask);
router.route("/:id").put(protect,  editTask);
router.route("/:id").delete(protect, removeTask);
router.route("/").post(protect, newTask);

module.exports = router;
