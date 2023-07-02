const { check, body } = require("express-validator");
const slugify = require("slugify");
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
    .withMessage("Too long category name")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  ValidatorMiddleware,
];

exports.updateCateogoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  body("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  ValidatorMiddleware,
];
exports.deleteCateogoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category id format"),
  ValidatorMiddleware,
];
