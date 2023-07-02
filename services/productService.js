const ProductModel = require("../models/productModel");
const factory = require("./handlerFactory");

const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const { uploadImages } = require("../middlewares/uploadImagesMiddleware");
const asyncHandler = require("express-async-handler");

exports.uploadProductImages = uploadImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductSizes = asyncHandler(async (req, res, next) => {
  if (req.files.imageCover) {
    const ImageCoverfilename = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${ImageCoverfilename}`);
    req.body.imageCover = ImageCoverfilename;
  }

  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);
        req.body.images.push(imageName);
      })
    );
    next();
  }
});
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
