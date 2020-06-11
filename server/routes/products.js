const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");
const queryFilter = require("../middleware/queryFilter");
const multerFileUpload = require('../middleware/multerFileUpload');
const Product = require("../models/Product");

const {
  getAllProducts,
  createProduct,
  getProductById,
  deleteProductById,
  updateProductById
} = require("../controllers/products");


router.get("/", queryFilter(Product), getAllProducts);
router.post("/", protect, authorize('admin'), multerFileUpload.single('picture'), createProduct);
router.get("/:product_id", getProductById);
router.delete("/:product_id", protect, authorize('admin'), deleteProductById);
router.put('/:product_id', protect, authorize('admin'), multerFileUpload.single('picture'), updateProductById);


module.exports = router;
