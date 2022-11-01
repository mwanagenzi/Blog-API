// todo: import mongoose
// define schema mongoose.Schema({object})
// title: required-true, unique-true, type string
// descrption, photo, username have the above properties except unique
// categories property accepts an array of string

const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Post", PostSchema);
