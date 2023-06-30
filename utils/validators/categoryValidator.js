const { check } = require("express-validator");
const ValidatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  ValidatorMiddleware,
];
exports.createCateogoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required")
    .isLength({ min: 3 })
    .withMessage("Too short category name")
    .isLength({ max: 32 })
    .withMessage("Too long category name"),
  ValidatorMiddleware,
];

exports.updateCateogoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  ValidatorMiddleware,
];
exports.deleteCateogoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  ValidatorMiddleware,
];
