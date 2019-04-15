// require needed modules
let express = require("express");

// declare an express router
let router = express.Router();

// reference the models
let db = require("../models");

// declare routes
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Reached the route POST to /auth/login");
});

router.get("/signup", (req, res) => {
  res.render("auth/signup")
});

router.post("/signup", (req, res) => {
  console.log(req.body);
  if(req.body.password !== req.body.password2) {
    console.log("pw doesn't match bro");
    req.flash("error", "Passwords do not match");
    res.redirect("auth/signup");
  } else {
    db.user.findOrCreate({
      where: { email: req.body.email},
      defaults: req.body
    })
    .spread((user, wasCreated) => {
      req.flash("success", "You successfully created a ");
      res.redirect("/");
    })
    .catch((err) => {
      console.log("err in POST /auth/audn", err);
    });
    // req.flash("success", "Account successfully created");
    // res.redirect("/");
  }
});

// export router object so routes usable elsewhere
module.exports = router;
