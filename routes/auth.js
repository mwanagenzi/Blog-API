// todo: import ("express").Router()
// todo: import ("../models/User")
// todo install bcrypt

// Router() methods
// put - update
// post - add/create
// get - read
// delete - delete

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
//async function async(req,res) - because we have no clue how long post request will take
//wrap in try catch to handle errors

// * REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(2);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    const user = await newUser.save(); // save() is a method of mongoose
    //if successful, send a status back to the client
    res.status(200).json(user); // json() formats the user object in json format
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

//* LOGIN
// router.post("/login", cb) callback function that runs asynchronously
// try catch block as in register
// retrieve a unique user object using User.findOne(//condition) condition - username:req.body.username
// there is no user send a 404 as res and "Wrong credentials" as json message
//      !user && res....
// validate whether passwords are similar ... bcrypt.compare(req password, generated password)
// if validation is false return a message via the res ... !validate && res.400 ... as above

router.post("/login", async (req, res) => {
  try {
    //check username
    const user = await User.findOne({ username: req.body.username }); // this method accesses the mongodb
    !user && res.status(400).json("Wrong credentials!!!");
    //check password
    const validate = await bcrypt.compare(req.body.password, user.password);
      !validate && res.status(400).json("Wrong credentials!!!"); //! How does the && symbol work here
      
      //after all that return the user object to client

      //* once can fileter some data in the object e.g remove the password from being returned to the user
      const { password, ...otherDetails } = user._doc;
      // const {property removed, ...properies left} //! What does this mean, how does it work
      res.status(200).json(otherDetails);


  } catch (error) {
      res.status(500).json(error);
      console.log(error);
  }
});

module.exports = router;