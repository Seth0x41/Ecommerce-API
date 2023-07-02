const SubCategoryModel = require("../models/subCategoryModel");
const factory = require("./handlerFactory");

exports.setCategoryIdTobody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc        Get list of SubCategories
// @route       GET /api/v1/subcategories
// @access      Public

exports.getSubCategories = factory.getAll(SubCategoryModel);
// @desc        Get spacific SubCategory
// @route       GET /api/v1/subcategories/:id
// @access      Public

exports.getSubCategory = factory.getOne(SubCategoryModel);

// @desc        Create SubCategory
// @route       POST /api/v1/subcategories
// @access      Private
exports.createSubCategory = factory.createOne(SubCategoryModel);

// @desc        update spacific SubCategory
// @route       PUT /api/v1/subcategories/:id
// @access      Private

exports.updateSubCategory = factory.updateOne(SubCategoryModel);

// @desc        Delete spacific SubCategory
// @route       DELETE /api/v1/subcategories/:id
// @access      Private

exports.deleteSubCategory = factory.deleteOne(SubCategoryModel);
