const express = require("express");

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdTobody,
  createFilterObj,
} = require("../services/subCategoryService");
const {
  createCateogoryValidator,
  getsubCategoryValidator,
  updateCateogoryValidator,
  deleteCateogoryValidator,
} = require("../utils/validators/subCategoryValidator");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdTobody, createCateogoryValidator, createSubCategory)
  .get(createFilterObj, getSubCategories);

router
  .route("/:id")
  .get(getsubCategoryValidator, getSubCategory)
  .put(updateCateogoryValidator, updateSubCategory)
  .delete(deleteCateogoryValidator, deleteSubCategory);
module.exports = router;
