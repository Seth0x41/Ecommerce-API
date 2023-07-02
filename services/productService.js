const ProductModel = require("../models/productModel");
const factory = require("./handlerFactory");

// @desc        Get list of Products
// @route       GET /api/v1/Products
// @access      Public

exports.getProducts = factory.getAll(ProductModel, "Products");

// @desc        Get Spacific Product by id
// @route       GET /api/v1/Products/:id
// @access      Public

exports.getProduct = factory.getOne(ProductModel);

// @desc        Create Product
// @route       POST /api/v1/Products
// @access      Private
exports.createProduct = factory.createOne(ProductModel);

// @desc        Update spacific Product
// @route       PUT /api/v1/Products/:id
// @access      Private
exports.updateProduct = factory.updateOne(ProductModel);

// @desc        Delete spacific Product
// @route       DELETE /api/v1/Products/:id
// @access      Private

exports.deleteProduct = factory.deleteOne(ProductModel);
