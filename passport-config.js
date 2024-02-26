LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function intialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);
    if (user.admin_email == null) {
      console.log("no user with that email");
      return done(null, false, { message: "no user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.admin_password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, id);
  });
}

module.exports = intialize;
