const mongoose = require("mongoose");

const subCategotySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "SubCategory must be unique"],
      minlenght: [2, "Too short SubCategory name"],
      maxlength: [32, "Too long SubCategory name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "SubCategory must be belong to parent Category"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subCategotySchema);
