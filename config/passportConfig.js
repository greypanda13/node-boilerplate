// require passport and any passport strategies you wish to use.
let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;


// reference to models
let db = require("../models")

// provide serialization and deserialization functions for passport to use
// this allows passport to store the user by the id alone (serialize the user)
// and look up the full information about a user from the id (deserialize the user)

passport.serializeUser((user, callback) => {
  // callback (errorMessage - null if none, userData - the id only in this case)
  callback(null, user.id)
})

passport.deserializeUser((id, callback) => {
  db.user.findByPk(id)
  .then(user => {
    callback(null, user);
  })
  .catch(callback);
});

// set up LocalStrategy.
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
}, (email, password, callback) => {
  db.user.findOne({
    where: { email: email }
})
.then(foundUser => {
  if (!foundUser || !foundUser.validPassword(password)) {
    callback(null,null)

  } else {
    callback(null, foundUser)
  }
})
.catch(callback)
}));

module.exports = passport
