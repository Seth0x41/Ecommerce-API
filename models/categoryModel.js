const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Category must be unique"],

      required: [true, "Category required"],
      // @ To Fix ---- it's not unique
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
