const express = require("express");
const {
  getCategoryValidator,
  createCateogoryValidator,
  updateCateogoryValidator,
  deleteCateogoryValidator,
} = require("../utils/validators/categoryValidator");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
  resizeImage,
} = require("../services/categoryService");
const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();
router.use("/:categoryId/subcategories", subCategoryRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeImage,
    createCateogoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    uploadCategoryImage,
    resizeImage,
    updateCateogoryValidator,
    updateCategory
  )
  .delete(deleteCateogoryValidator, deleteCategory);

module.exports = router;
