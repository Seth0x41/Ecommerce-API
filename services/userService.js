const UserModel = require("../models/userModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImagesMiddleware");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const ApiError = require("../utils/apiError");
const bcrypt = require("bcryptjs");

exports.uploadUserImage = uploadSingleImage("profileImage");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `User-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/Users/${filename}`);
    req.body.profileImage = filename;
  }
  next();
});
// @desc        Get list of Users
// @route       GET /api/v1/users
// @access      Public

exports.getUsers = factory.getAll(UserModel);

// @desc        Get Spacifix User by id
// @route       GET /api/v1/users/:id
// @access      Public
exports.getUser = factory.getOne(UserModel);

// @desc        Create User
// @route       POST /api/v1/users
// @access      Private
exports.createUser = factory.createOne(UserModel);

// @desc        Update spacific User
// @route       PUT /api/v1/users/:id
// @access      Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const Document = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      sluf: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!Document) {
    return next(new ApiError(`No Document for this id ${req.params.id}`, 404));

    // @ To Fix
    // Fixing it's doesn't go inside!
  }
  res.status(200).json({ data: Document });
});

exports.changePassword = asyncHandler(async (req, res, next) => {
  const Document = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    {
      password: await bcrypt.hash(req.body.password, 12),
    },
    {
      new: true,
    }
  );
  if (!Document) {
    return next(new ApiError(`No Document for this id ${req.params.id}`, 404));

    // @ To Fix
    // Fixing it's doesn't go inside!
  }
  res.status(200).json({ data: Document });
});
// @desc        Delete spacific User
// @route       DELETE /api/v1/users/:id
// @access      Private

exports.deleteUser = factory.deleteOne(UserModel);
