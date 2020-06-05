const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const Category = require("../models/Category");



// @desc    Get all Categories
// @route   GET /api/v1/categories
// @access  Public
exports.getAllCategories = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});



// @desc      Create Category
// @route     POST /api/v1/categories
// @access    Private
exports.createCategory = asyncHandler(async (req, res, next) => {
  const newCategory = new Category({title: req.body.title});
  const category = await newCategory.save();
  res.status(200).json({ success: true, data: category });
});



// @desc      Get Category by ID
// @route     GET /api/v1/categories/:category_id
// @access    public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.category_id);
  if (!category) return next(new ErrorResponse(404, `Category Not Found`));
  res.status(200).json({ success: true, data: category });
});



// @desc      Delete Category by Id
// @route     DELETE /api/v1/categories/:category_id
// @access    Private
exports.deleteCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.category_id);
  if (!category) return next(new ErrorResponse(404, `Category Not Found`));
  await category.remove();
  res.status(200).json({ success: true, data: {} });
});