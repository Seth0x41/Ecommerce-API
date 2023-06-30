const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "brand must be unique"],

      required: [true, "brand required"],
      // @ To Fix ---- it's not unique
      minlength: [2, "Too short brand name"],
      maxlength: [32, "Too long brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const brandModel = mongoose.model("brand", brandSchema);

module.exports = brandModel;
