let express = require("express");
let router = express.Router();
let db = require("../models");

// include middleware to ensure users are logged in
let adminLoggedIn = require("../middleware/adminLoggedIn")
let loggedIn = require("../middleware/loggedIn")

// GET /profile
router.get("/", loggedIn, (req, res) => {
  res.render("profile/index");
});

// GET /profile/admin
router.get("/admin", adminLoggedIn, (req, res) => {
  res.render("profile/admin")
})

module.exports = router;
