const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    image: {
      type: String,
      required: true,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    bio: {
      type: String,
      default: "",
    },
  },
  { timestamps: true, bufferTimeoutMS: 60000 }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
