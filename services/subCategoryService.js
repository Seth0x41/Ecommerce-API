const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const SubCategoryModel = require("../models/subCategoryModel");

const ApiError = require("../utils/apiError");

exports.setCategoryIdTobody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc        Create SubCategory
// @route       POST /api/v1/subcategories
// @access      Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategoryModel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

// @desc        Get list of SubCategories
// @route       GET /api/v1/subcategories
// @access      Public

exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const subCategories = await SubCategoryModel.find(req.filterObj)
    .skip(skip)
    .limit(limit);

  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

// @desc        Get spacific SubCategory
// @route       GET /api/v1/subcategories/:id
// @access      Public

exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const subCategories = await SubCategoryModel.findById(id);
  if (!subCategories) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategories });
});

// @desc        update spacific SubCategory
// @route       PUT /api/v1/subcategories/:id
// @access      Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategories = await SubCategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategories) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategories });
});

// @desc        Delete spacific SubCategory
// @route       DELETE /api/v1/subcategories/:id
// @access      Private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategories = await SubCategoryModel.findOneAndDelete(id);
  if (!subCategories) {
    return next(new ApiError(`No subCategory for this id ${id}`, 404));
  }
  res.status(200).json({ msg: "SubCategory Deleted!" });
});
