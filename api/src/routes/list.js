const express = require("express");
const router = express.Router();
const { allLists } = require("../controllers/user");
const { removeList } = require("../controllers/admin");
const { protect } = require("../middlewares/auth");

const {
    newList,
    getList,
    editList,
    searchList,
} = require("../controllers/list");

router.route("/").post(protect, newList);
router.route("/").get(protect, allLists);
router.route("/search").get(protect, searchList);
router.route("/:id").get(protect, getList);
router.route("/:id").put(protect, editList);
router.route("/:id").delete(protect, removeList);

module.exports = router;
