const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name Required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    profileImage: String,
    password: {
      type: String,
      required: [true, "Password Required"],
      minlength: [6, "Password shoud be more than 6"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// const setImageUrl = (doc) => {
//   if (doc.image) {
//     const imageURL = `${process.env.BASE_URL}/brands/${doc.image}`;
//     doc.image = imageURL;
//   }
// };
// UserSchema.post("init", (doc) => {
//   setImageUrl(doc);
// });
// UserSchema.post("save", (doc) => {
//   setImageUrl(doc);
// });

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
