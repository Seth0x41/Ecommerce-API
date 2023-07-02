const BrandModel = require("../models/brandModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImagesMiddleware");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

exports.uploadBrandImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${filename}`);
  req.body.image = filename;
  next();
});
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
