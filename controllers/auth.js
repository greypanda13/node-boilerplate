// require needed modules
let express = require("express");

// declare an express router
let router = express.Router();

// reference the models
let db = require("../models");

// reference to passport so we can use the authenitacate functions
let passport = require("../config/passportConfig");

// declare routes
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  successFlash: "Login was successful",
  failureRedirect: "/auth/login",
  failureFlash: "Login unsuccessful"
}));

router.get("/signup", (req, res) => {
  res.render("auth/signup")
});

router.post("/signup", (req, res, next) => { //next arg for auto-login inside spread operator
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
      // auto-log-in at signup if credentials are ok.
      if (wasCreated) {
        passport.authenticate("local", {
          successRedirect: "/profile",
          successFlash: "Login was successful",
          failureRedirect: "/auth/login",
          failureFlash: "Login unsuccessful"
        })(req, res, next)
      } else {
        req.flash("error", "Account already exists. Please log in.");
        res.redirect("/auth/login")
      }
    })
    .catch((err) => {
      // print all error info to terminal (not okay for user eyes)
      console.log("err in POST /auth/signup") //, err);

      // Generic error (all cases)
      req.flash("error", "Server error");

      // validation-specific (okay to show to user)
      console.log('errors len', err.errors.length)
      if (err && err.errors) {
        console.log('hello')
        err.errors.forEach((e) => {
          console.log(e.type)
          if (e.type == "Validation error") {
            req.flash("error", "Validation issue - " + e.message);
          }
        })
      }

      res.redirect("/auth/signup");
    });

  }
});

// GET logout
router.get("/logout", (req, res) => {
  req.logout(); // delete the session data for logged in user
  req.flash("success", "goodbye you are logged out");
  res.redirect("/");
});

// export router object so routes usable elsewhere
module.exports = router;
