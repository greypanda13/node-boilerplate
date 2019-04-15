// require needed modules
let express = require("express");

// declare an express router
let router = express.Router();

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
    req.flash("success", "Account successfully created");
    res.redirect("/");
  }
});

// export router object so routes usable elsewhere
module.exports = router;
