const express = require("express");
const router = express.Router();
const { removeUser, getUsers } = require("../controllers/admin");
const {
  editUser,
  searchUser,
  getProfile,
  getHistory,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");

router.route("/").get(protect, getUsers);
router.route("/:id").get(protect, getProfile);
router.route("/:id").delete(protect, removeUser);
router.route("/:id").put(protect, editUser);

router.route("/history").get(protect, getHistory);
router.route("/search").get(protect, searchUser);


module.exports = router;
