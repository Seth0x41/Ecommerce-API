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

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageURL = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageURL;
  }
};
categorySchema.post("init", (doc) => {
  setImageUrl(doc);
});
categorySchema.post("save", (doc) => {
  setImageUrl(doc);
});
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
