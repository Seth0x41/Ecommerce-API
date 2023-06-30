const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const BrandModel = require("../models/brandModel");
const ApiError = require("../utils/apiError");

// @desc        Get list of brands
// @route       GET /api/v1/brands
// @access      Public

exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await BrandModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc        Get Spacifix Brand by id
// @route       GET /api/v1/brands/:id
// @access      Public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findById(id);
  if (!Brand) {
    // res.status(404).json({ msg: `No Brand for this id ${id}` });
    return next(new ApiError(`No Brand for this id ${id}`, 404));
    // @ To Fix
    // Fixing it's doesn't go inside!
  }
  res.status(200).json({ data: Brand });
});

// @desc        Create Brand
// @route       POST /api/v1/brands
// @access      Private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const Brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: Brand });
});

// @desc        Update spacific Brand
// @route       PUT /api/v1/brands/:id
// @access      Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const Brand = await BrandModel.findOneAndUpdate(
    { _id: id },
    { name: name, slug: slugify(name) },
    { new: true }
  );
  if (!Brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));

    // @ To Fix
    // Fixing it's doesn't go inside!
  }
  res.status(200).json({ data: Brand });
});

// @desc        Delete spacific Brand
// @route       DELETE /api/v1/brands/:id
// @access      Private

exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await BrandModel.findByIdAndDelete(id);
  if (!Brand) {
    return next(new ApiError(`No Brand for this id ${id}`, 404));

    // @ To Fix
    // Fixing it's doesn't go inside!
  }
  res.status(200).json({ msg: "Brand Deleted!" });
});
