const BrandModel = require("../models/brandModel");
const factory = require("./handlerFactory");

// @desc        Get list of brands
// @route       GET /api/v1/brands
// @access      Public

exports.getBrands = factory.getAll(BrandModel);

// @desc        Get Spacifix Brand by id
// @route       GET /api/v1/brands/:id
// @access      Public
exports.getBrand = factory.getOne(BrandModel);

// @desc        Create Brand
// @route       POST /api/v1/brands
// @access      Private
exports.createBrand = factory.createOne(BrandModel);

// @desc        Update spacific Brand
// @route       PUT /api/v1/brands/:id
// @access      Private
exports.updateBrand = factory.updateOne(BrandModel);

// @desc        Delete spacific Brand
// @route       DELETE /api/v1/brands/:id
// @access      Private

exports.deleteBrand = factory.deleteOne(BrandModel);
