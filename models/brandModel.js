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

const setImageUrl = (doc) => {
  if (doc.image) {
    const imageURL = `${process.env.BASE_URL}/brands/${doc.image}`;
    doc.image = imageURL;
  }
};
brandSchema.post("init", (doc) => {
  setImageUrl(doc);
});
brandSchema.post("save", (doc) => {
  setImageUrl(doc);
});
const brandModel = mongoose.model("brand", brandSchema);

module.exports = brandModel;
