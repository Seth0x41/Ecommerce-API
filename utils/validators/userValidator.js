const { check, body } = require("express-validator");
const slugify = require("slugify");
const ValidatorMiddleware = require("../../middlewares/validatorMiddleware");
const UserModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

exports.getUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  ValidatorMiddleware,
];
exports.createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("User required")
    .isLength({ min: 2 })
    .withMessage("Too short User name")
    .isLength({ max: 32 })
    .withMessage("Too long User name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email Already exist"));
        }
      })
    ),
  check("password")
    .notEmpty()
    .withMessage("Password Required")
    .isLength({ min: 6 })
    .withMessage("Password must be more than 6 characters")
    .custom((password, { req }) => {
      if (password !== req.body.passwordConfirm) {
        throw new Error("Password Confimation incorrect");
      }
      return true;
    }),
  check("passwordConfirm").notEmpty().withMessage("Password Confirm Required"),
  check("phone").optional().isMobilePhone("ar-EG"),
  check("profileImage").optional(),
  check("role").optional(),
  ValidatorMiddleware,
];

exports.updateUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  body("name")
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("email")
    .notEmpty()
    .withMessage("Email Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("Email Already exist"));
        }
      })
    ),
  check("phone").optional().isMobilePhone("ar-EG"),
  check("profileImage").optional(),
  check("role").optional(),
  ValidatorMiddleware,
];
exports.changePasswordValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),

  body("currentPassword")
    .notEmpty()
    .withMessage("Current password Field required"),
  body("passwordConfirm")
    .notEmpty()
    .withMessage("Password Confirm Field required"),
  body("password")
    .notEmpty()
    .withMessage("Password Field required")
    .custom(async (val, { req }) => {
      const user = await UserModel.findById(req.params.id);

      if (!user) {
        throw new Error("There is no user for this id");
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("incorrent current password");
      }
    }),
  ValidatorMiddleware,
];
exports.deleteUserValidator = [
  check("id").isMongoId().withMessage("Invalid User id format"),
  ValidatorMiddleware,
];
