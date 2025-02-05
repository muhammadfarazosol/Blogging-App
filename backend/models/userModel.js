const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    avatar: { type: String },
    posts: { type: Number, default: 0 },
    bio: { type: String },
    headline: { type: String },
  },
  { timestamps: true }
);
module.exports = model("User", userSchema);
