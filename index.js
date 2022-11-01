const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); //this is then used as a middleware function with express like so in line 16
const usersRoute = require("./routes/users");

dotenv.config();
app.use(express.json()); //to enable the application send json objects nside req.body

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Created MongoDb connection"))
  .catch((error) => {
    console.log(`error from mongoDB creation ${error}`);
  });

app.use("/api/auth/", authRoute); // "/api/auth/" is a standard way of denoting REST APIs
app.use("/api/users/", usersRoute); 

// app.use("/mwana", (req, res) => {
//   console.log("/ route has been hit and mwanagenzi is on!");
//   res.send("/ route has been hit and mwanagenzi is on!");
// });

app.listen("5000", (req, res) => {
  console.log("Backend server is up and running at port 5000");
});
