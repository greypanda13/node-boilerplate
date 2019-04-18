module.exports = (req, res, next) => {
  if (req.user && req.user.admin) {
    // someone is logged in and is ADMIN. this is expected.
    // allow them to proceed.
    next();
  } else {
    req.flash("error", "You must be an ADMIN to view this page!")
    res.redirect("/profile");
  }
}
