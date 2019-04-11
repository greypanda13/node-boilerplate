// include .env variables
require("dotenv").config();

// require necessary modules
let express = require("express");

// declare express app
let app = express();

// set view engine
app.set("view engine", "ejs");

// include (use) middleware


// include routes from controllers


// make a home route: GET /
app.get("/", (req, res) => {
  res.send("<h1>STUB</h1>");
});

// listen on specified port
app.listen(process.env.PORT || 3000);
