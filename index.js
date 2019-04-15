// include .env variables
require("dotenv").config();

// require necessary modules
let express = require("express");
let flash = require("connect-flash");
let layouts = require("express-ejs-layouts");
let session = require("express-session");

// declare express app
let app = express();

// set view engine
app.set("view engine", "ejs");

// include (use) middleware
app.use("/", express.static("public"));
app.use(layouts);
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// custom middleware - write data to locals
app.use((req, res, next) => {
  res.locals.alerts = req.flash();
  next();
});

// include routes from controllers
app.use("/auth", require("./controllers/auth"));

// make a home route: GET /
app.get("/", (req, res) => {
  res.render("home");
});

// listen on specified port
app.listen(process.env.PORT || 3000);
