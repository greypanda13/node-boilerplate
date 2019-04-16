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
      if (wasCreated) {
        req.flash("success", "Your request was successful");
        res.redirect("/");
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
  res.send("logout stub")
})

// export router object so routes usable elsewhere
module.exports = router;
