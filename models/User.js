// todo: import mongoose
// define schema mongoose.Schema({object})
// username type-string, required-true, unique-true
// email same as username
// password same as above but not unique
// profilePic same as above (string) but neither unique nor required
// another parameter of Schema() is timestamps-true creates the create and updated at timestamps
// export as mongoose.model("modelname", schemaobject)

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("User", UserSchema);
