const { check } = require("express-validator");
const ValidatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getsubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  ValidatorMiddleware,
];

exports.createCateogoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("subCategory required")
    .isLength({ min: 2 })
    .withMessage("Too short subCategory name")
    .isLength({ max: 32 })
    .withMessage("Too long subCategory name"),
  check("category")
    .notEmpty()
    .withMessage("SubCategory must be belog to Categoty>")
    .isMongoId()
    .withMessage("Invalid subCategory id format"),
  ValidatorMiddleware,
];

exports.updateCateogoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  ValidatorMiddleware,
];
exports.deleteCateogoryValidator = [
  check("id").isMongoId().withMessage("Invalid subCategory id format"),
  ValidatorMiddleware,
];
