const express = require("express");
const router = express.Router();
const {
  getUsers,
  removeUser,
  getTasks,
  removeTask,
  getLists,
  removeList,
  getColors,
  removeColor,
} = require("../controllers/admin");
const { admin, protect } = require("../middlewares/auth");

router.route("/users").get(protect, admin, getUsers);
router.route("/users/:username").delete(protect, admin, removeUser);
router.route("/tasks").get(protect, admin, getTasks);
router.route("/tasks/:id").delete(protect, admin, removeTask);
router.route("/colors").get(protect, admin, getColors);
router.route("/colors/:id").delete(protect, admin, removeColor);
router.route("/lists").get(protect, admin, getLists);
router.route("/lists/:id").delete(protect, admin, removeList);

module.exports = router;
