const CategoryModel = require("../models/categoryModel");
const factory = require("./handlerFactory");

// @desc        Get list of categories
// @route       GET /api/v1/categories
// @access      Public

exports.getCategories = factory.getAll(CategoryModel);
// @desc        Get Spacifix Category by id
// @route       GET /api/v1/categories/:id
// @access      Public
exports.getCategory = factory.getOne(CategoryModel);

// @desc        Create Category
// @route       POST /api/v1/categories
// @access      Private
exports.createCategory = factory.createOne(CategoryModel);

// @desc        Update spacific category
// @route       PUT /api/v1/categories/:id
// @access      Private
exports.updateCategory = factory.updateOne(CategoryModel);

// @desc        Delete spacific category
// @route       DELETE /api/v1/categories/:id
// @access      Private

exports.deleteCategory = factory.deleteOne(CategoryModel);
