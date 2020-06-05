const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const queryFilter = require("../middleware/queryFilter");
const Category = require("../models/Category");

const {
  getAllCategories,
  createCategory,
  getCategoryById,
  deleteCategoryById
} = require("../controllers/categories");


router.get("/", queryFilter(Category), getAllCategories);
router.post("/", protect, authorize('admin'), createCategory);
router.get("/:category_id", getCategoryById);
router.delete("/:category_id", protect, authorize('admin'), deleteCategoryById);


module.exports = router;
