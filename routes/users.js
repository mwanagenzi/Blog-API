// todo: import user
// todo: import bcrypt
// todo: import router
// todo: implement delete and update routes i.e router.put and router.delete
// pass the user Id as a named parameter of the put route
// check whether the userId passed on the url (req.body) is similar to req.param.id
//check whether the password is valid then replace the password with a new genrated password
// operations : get, put, delete

const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Post = require("../models/Post");

//* UPDATE
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      //if there is any password within our body
      const salt = bcrypt.genSalt(10);
      req.body.password = bcrypt.hash(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, //* The userId here is the first property of an object on mongoose collection
      {
        $set: req.body, //$set is a method
      },
      { new: true } // setting this to true configures mogoose to send the new user
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(401).json("You are only allowed to update your account!!!");
  }
});

// //*DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    //todo: deleting the posts before the user
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username }); //condition to fetch then delete the posts by the retrieved user
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been successfully deleted");
      } catch (error) {
        // res.status(500).json(`${error}`);
        res.status(404).json("User not found...");
        console.log(`${error}`);
      }
    } catch (error) {
      res.status(404).json("User not found...");
    }
  } else {
    res.status(401).json("You can only delete your account!!!");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // then return user object without the password property and value
    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    res.status(404).json("User not found!!!");
  }
});

module.exports = router;

// A "code along" tutorial on server application development for blog web apps suing Node.js. Express.js and MongoDB