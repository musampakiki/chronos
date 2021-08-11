const express = require("express");
const router = express.Router();
const { allColors } = require("../controllers/user");
const { removeColor } = require("../controllers/admin");
const { protect, admin } = require("../middlewares/auth");

const {
    newColor,
    getColor,
    editColor,
    searchColor,
} = require("../controllers/color");

router.route("/").post(protect, newColor);
router.route("/").get(protect,  allColors);
router.route("/search").get(protect,  searchColor);
router.route("/:id").get(protect, getColor);
router.route("/:id").put(protect, editColor);
router.route("/:id").delete(protect, removeColor);

module.exports = router;
