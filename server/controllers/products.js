const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");



// @desc    Get all Products
// @route   GET /api/v1/products
// @access  Public
exports.getAllProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.filteredResults);
});



// @desc      Create Product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = asyncHandler(async (req, res, next) => {
  const file = req.file;
  const fileName = file ? file.filename : '';
  let newProd = {
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    picture: fileName
  };
  const newProduct = new Product(newProd);
  const product = await newProduct.save();
  res.status(200).json({ success: true, data: product });
});



// @desc      Get Product by ID
// @route     GET /api/v1/products/:product_id
// @access    public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.product_id);
  if (!product) return next(new ErrorResponse(404, `Product Not Found`));
  res.status(200).json({ success: true, data: product });
});



// @desc      Delete Product by Id
// @route     DELETE /api/v1/products/:product_id
// @access    Private
exports.deleteProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.product_id);
  if (!product) return next(new ErrorResponse(404, `Product Not Found`));
  
  // delete previous file if exists
  if(product.picture && product.picture !== "no-photo.jpg"){
    const filePath = path.join(process.env.FILE_UPLOAD_PATH, product.picture);
    if (fs.existsSync(filePath)) {
      console.log(` Deleting ${filePath} `.black.bgMagenta);
      fs.unlink(filePath, (err) => err && next(err));
    }
  }

  await product.remove();

  res.status(200).json({ success: true, data: {} });
});


// @desc      Update Product
// @route     PUT /api/v1/products/:product_id
// @access    Private
exports.updateProductById = asyncHandler(async (req, res, next) => {

  const product = await Product.findById(req.params.product_id);
  
  product.title = req.body.title;
  product.price = req.body.price;
  product.quantity = req.body.quantity;
  product.category = req.body.category;

  const file = req.file;

  // delete previous file if exists
  if(file){
    if(product.picture && product.picture !== "no-photo.jpg"){
      const filePath = path.join(process.env.FILE_UPLOAD_PATH, product.picture);
      if (fs.existsSync(filePath)) {
        console.log(` Deleting ${filePath} `.black.bgMagenta);
        fs.unlink(filePath, (err) => err && next(err));
      }
    }

    product.picture= file.filename;
  }

  // update product
  await product.save();
  res.status(200).json({ success: true, data: product });
});